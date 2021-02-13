<template>
    <v-btn class="white--text" color="#E34133" v-on:click="signIn()" tile>
        <v-icon small color="white" left>mdi-google</v-icon> Sign in with google
    </v-btn>
</template>

<script lang="ts">
    import socket from '@/plugins/socket.io.js';

    import {Component, Vue} from "vue-property-decorator";
    import {Action, Getter} from "nuxt-property-decorator";

    @Component({
        components: {}
    })
    export default class ConnectionForm extends Vue {

      $auth: any;
      popup: any;
      @Action("registerGoogle") registerGoogle: any;
      @Action("connectGoogle") connectGoogle: any;
      @Getter("isAuthenticated") isAuthenticated : any;

      created() {
        socket.on('google', async (data: any) => {
          let dataToken = null;
          if(!this.isAuthenticated){
            dataToken = await this.registerGoogle({socialToken: data.socialToken});
          }else{
            dataToken = await this.connectGoogle({socialToken: data.socialToken});
          }

          this.popup.close();
          await this.$auth.setToken('local', 'Bearer ' + dataToken.token);
          await this.$auth.fetchUser();
          // await this.$router.push('/user/profile');
          window.location.href = '/user/profile';
        });
      }

      async signIn() {
        const url = `${process.env.API_URL}auth/google?`;//socketId=${socket.id}`;
        this.popup = window.open(url, '',
            `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=yes, copyhistory=no`
        );
      }
    }
</script>
