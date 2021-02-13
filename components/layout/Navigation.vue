<template>
    <v-app-bar app clipped-left dense color="#002171">
        <v-app-bar-nav-icon color="white" @click.stop="$emit('drawer')"></v-app-bar-nav-icon>
        <v-spacer />
        <v-toolbar-title class="website-title cursor-pointer" @click="$router.push('/')">
            Scratchpad
        </v-toolbar-title>
        <v-spacer />

        <span v-if="isAuthenticated">
            <router-link class="white--text" to="/user/profile"><v-icon color="white">mdi-account-circle</v-icon></router-link>
        </span>
        <span v-else>
          <router-link class="white--text" to="/user/connection"><v-icon color="white">mdi-account-circle</v-icon></router-link>
      </span>

    </v-app-bar>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import {Action, Getter} from "nuxt-class-component";
    import SpToggle from "~/components/generic/SpToggle.vue";
    import SwitchLocales from "~/components/locale/SwitchLocales.vue";

    @Component({
        components: {SpToggle}
    })
    export default class Navigation extends Vue {

        @Getter('isAuthenticated') isAuthenticated: any;
        @Getter('loggedInUser') loggedInUser: any;
        @Getter('getPreferences') getPreferences: any;
        @Getter('isAdmin') isAdmin: any;
        @Action('updatePreferences') updatePreferences: any;

        $auth!: any;
        $vuetify: any;
        light: boolean = true;

        logout() {
            this.$auth.logout();
            this.$router.push('/');
        }

        async mounted() {
            this.changeLight();
        }

        changeLight() {
            this.$vuetify.theme.dark = !this.light;
        }
    }
</script>
<style scoped>

</style>
