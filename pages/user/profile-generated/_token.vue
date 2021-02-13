<template>
    <div>
        <h1>Bienvenue sur Tradyourself !</h1>
    </div>
</template>

<script lang="ts">
    import {Action, Component, Getter} from "nuxt-property-decorator";
    import {Vue} from "vue-property-decorator";
    import socket from "~/plugins/socket.io";
    import DiscordAuth from "~/components/user/discord-auth.vue";
    import GoogleAuth from "~/components/user/google-auth.vue";
    import RegisterForm from "~/components/user/register-form.vue";

    @Component({
        components: {RegisterForm, GoogleAuth, DiscordAuth}
    })
    export default class Token extends Vue {
        // middleware: ['auth','role'],
        // meta: {
        //   roles: ['admin']
        // }

        @Action('connectGenerated') connectGenerated: any;
        $auth : any;

        async mounted() {
            const dataToken = await this.connectGenerated({token: this.token});
            await this.$auth.setToken('local', 'Bearer ' + dataToken.token);
            await this.$auth.fetchUser();
            // await this.$router.push('/user/profile');
            window.location.href = '/user/profile';
        }

        get token() {
            return this.$route.params.token;
        }

        // @Getter('loggedInUser') loggedInUser: any;
        //
        // get socialDiscord() {
        //     return this.loggedInUser.socialDiscord || null;
        // }
        //
        // get socialGoogle() {
        //     return this.loggedInUser.socialGoogle || null;
        // }

    }
</script>
