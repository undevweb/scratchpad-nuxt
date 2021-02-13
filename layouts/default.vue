<template>
    <div id="app">
        <!--<v-app :style="{background: $vuetify.theme.themes[theme].background}">-->
        <v-app id="inspire">
            <v-navigation-drawer v-model="drawer" app clipped>
                <navigation-left v-if="isAuthenticated" @drawer="drawer = !drawer" />
            </v-navigation-drawer>

            <navigation @drawer="drawer = !drawer" />
            <v-main>
                <v-system-bar v-if="isAlertRelease" height="30" color="warning" class="text-center pa-2">
                    <v-spacer />
                    <v-icon>mdi-alert</v-icon>
                    {{ msgRelease }}
                    <v-spacer />
                </v-system-bar>
                <div
                    class="
        pl-xs-0 pl-xs-0
        pl-sm-0 pl-sm-0
        pl-md-0 pl-md-0
        pl-lg-5 pl-lg-5
        pl-xl-5 pl-xl-5
        "
                >
                    <nuxt />
                </div>
            </v-main>

            <v-footer app color="dark" class="white--text text-center">
                <v-row>
                    <v-col class="pa-0 font-italic">
                        Made with love
                        <v-icon color="red">mdi-cards-heart</v-icon> |
                        Follow us on
                        <a href="" target="_blank" class="white--text">
                            <v-icon color="#48A9E0">mdi-twitter</v-icon>
                            <span class="text-decoration-underline">@scratchpad</span>
                        </a>
                        <a href="" target="_blank" class="white--text">
                            <v-icon color="#4098F5">mdi-facebook</v-icon>
                            <span class="text-decoration-underline">@scratchpad</span>
                        </a>
                        <a href="" target="_blank" class="white--text">
                            <v-icon color="#6E85D3">mdi-discord</v-icon>
                            <span class="text-decoration-underline">Join the discord</span>
                        </a>
                    </v-col>
                </v-row>
            </v-footer>
        </v-app>
    </div>
</template>

<script lang="ts">
    import SpToggle from "../components/generic/SpToggle.vue";
    import {Vue} from "vue-property-decorator";
    import Component from "vue-class-component";
    import NavigationLeft from "~/components/layout/navigation-left.vue";
    import Navigation from "~/components/layout/Navigation.vue";
    import {Getter} from "nuxt-class-component";

    @Component
    ({
        components: {
            Navigation,
            NavigationLeft,
            SpToggle

        }
    })
    export default class Default extends Vue {
        @Getter('isAuthenticated') isAuthenticated: any;
        drawer: boolean = false;

        head() {
            return {
                bodyAttrs: {
                    class: this.scrollbarTheme
                }
            }
        }

        get isAlertRelease() {
            return process.env.WEBSITE_IS_ALERT_RELEASE === 'true';
        }

        get msgRelease() {
            return process.env.WEBSITE_IS_ALERT_RELEASE_MSG;
        }

        get scrollbarTheme() {
            return this.$vuetify.theme.dark ? 'theme--dark' : 'theme--light';
        }

        get theme() {
            return (this.$vuetify.theme.dark) ? 'dark' : 'light'
        }

    }
</script>
<style>
    html {
        overflow-y: auto !important;
    }
</style>
