<template>
    <v-btn class="button white--text" color="#6E85D3" v-on:click="signIn()">
        <v-icon small color="white" left>mdi-discord</v-icon> Sign in with discord
    </v-btn>
</template>

<script lang="ts">
    import socket from '@/plugins/socket.io.js';
    import {Action, Component, Getter, Vue} from 'nuxt-property-decorator';

    @Component({
        components: {}
    })
    export default class DiscordAuth extends Vue {

        $auth: any;
        popup: any;
        @Action("registerDiscord") registerDiscord: any;
        @Action("connectDiscord") connectDiscord: any;
        @Getter("isAuthenticated") isAuthenticated : any;

        created() {
            socket.on('discord', async (data: any) => {
                let dataToken = null;
                if(!this.isAuthenticated){
                    dataToken = await this.registerDiscord({socialToken: data.socialToken});
                }else{
                    dataToken = await this.connectDiscord({socialToken: data.socialToken});
                }

                this.popup.close();
                await this.$auth.setToken('local', 'Bearer ' + dataToken.token);
                await this.$auth.fetchUser();
                // await this.$router.push('/user/profile');
                window.location.href = '/user/profile';
            });
        }

        async signIn() {
            const url = `${process.env.API_URL}auth/discord?`;//socketId=${socket.id}`;
            this.popup = window.open(url, '',
                `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=yes, copyhistory=no`
            );
        }

    }
</script>
