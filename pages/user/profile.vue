<template>
    <div class="pt-3">
        <h1>
            <span v-if="isVIP"> Compte généré</span>
            {{ loggedInUser.username }}
        </h1>
        <v-row>
            <v-col cols="5">
                <v-card>
                    <v-card-title>Informations personnelles</v-card-title>
                    <v-card-text @click="logout">
                        <v-btn small color="warning">Se déconnecter</v-btn>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="5">
                <v-row class="pt-2">
                    <v-card>
                        <v-card-title>Réseaux sociaux liés</v-card-title>

                        <v-list dense>

                            <v-list-item>
                                <v-list-item-icon>
                                    <v-icon color="#6E85D3">mdi-discord</v-icon>
                                </v-list-item-icon>

                                <v-list-item-avatar v-if="socialDiscord" height="24">
                                    <v-img :src="socialDiscord.avatar" max-height="24" max-width="24" contain />
                                </v-list-item-avatar>
                                <v-list-item-content v-if="socialDiscord">
                                    <v-list-item-title v-text="socialDiscord.username" />
                                </v-list-item-content>

                                <v-list-item-content v-if="!socialDiscord">
                                    <v-list-item-title>
                                        <discord-auth />
                                    </v-list-item-title>
                                </v-list-item-content>

                            </v-list-item>

                            <v-list-item>
                                <v-list-item-icon>
                                    <v-icon color="#E34133">mdi-google</v-icon>
                                </v-list-item-icon>

                                <v-list-item-avatar v-if="socialGoogle" height="24">
                                    <v-img :src="socialGoogle.avatar" max-height="24" max-width="24" contain />
                                </v-list-item-avatar>
                                <v-list-item-content v-if="socialGoogle">
                                    <v-list-item-title v-text="socialGoogle.username" />
                                </v-list-item-content>

                                <v-list-item-content v-if="!socialGoogle">
                                    <v-list-item-title>
                                        <google-auth />
                                    </v-list-item-title>
                                </v-list-item-content>

                            </v-list-item>


                        </v-list>
                    </v-card>
                </v-row>
                <v-row>
                    <v-card v-if="isDiscordActive">
                        <v-card-title>Mes serveurs discord</v-card-title>
                        <v-data-table
                            :headers="headersDiscordGuild"
                            :items="myDiscordGuilds"
                            :items-per-page="5"
                            class="elevation-1"
                        >
                            <template v-slot:top>
                                <v-btn @click="loadDiscordServers">Charger mes serveurs</v-btn>
                            </template>
                        </v-data-table>
                    </v-card>
                </v-row>
            </v-col>
        </v-row>
    </div>
</template>

<script lang="ts">
    import {Component, Getter} from "nuxt-property-decorator";
    import {Vue} from "vue-property-decorator";
    import DiscordAuth from "~/components/user/discord-auth.vue";
    import GoogleAuth from "~/components/user/google-auth.vue";
    import {Action} from "nuxt-class-component";
    import DiscordGuild from "~/models/DiscordGuild";

    @Component({
        middleware: ['auth'],
        components: {GoogleAuth, DiscordAuth}
    })
    export default class Profile extends Vue {

        // meta: {
        //   roles: ['admin']
        // }
        @Getter('isVIP') isVIP: any;
        @Getter('loggedInUser') loggedInUser: any;
        @Action('discord-guild/fetchMyGuilds') fetchMyGuilds: any;
        @Action('discord-guild/syncMyDiscordGuilds') syncMyDiscordGuilds: any;

        $auth: any;
        $router: any;
        headersDiscordGuild: any = [
            {
                text: 'Nom',
                value: 'name'
            }
        ];

        mounted() {
            if (this.isDiscordActive) {
                this.fetchMyGuilds();
            }
        }

        get socialDiscord() {
            return this.loggedInUser.socialDiscord || null;
        }

        get socialGoogle() {
            return this.loggedInUser.socialGoogle || null;
        }

        get isDiscordActive() {
            return process.env.DISCORD_ACTIVE === 'true';
        }

        get myDiscordGuilds() {
            return DiscordGuild.findAllRecursive();
        }

        logout() {
            this.$auth.logout();
            this.$router.push('/');
        }

        async loadDiscordServers() {
            await this.syncMyDiscordGuilds();

        }

    }
</script>
