<template>
    <v-container>
        <v-subheader>Chercher des utilisateurs</v-subheader>
        <v-row>
            <v-col cols="2">
                <v-text-field v-model="search.username" />
            </v-col>
            <v-col cols="2">
                <v-btn @click="find">Search</v-btn>
            </v-col>
        </v-row>
        <v-subheader>Résultats</v-subheader>
        <v-row>
            <v-col>
                <span v-for="res of results" class="pa-2">{{ res.username }}<v-btn @click="upAdmin(res.id)"> + </v-btn></span>
            </v-col>
        </v-row>
        <h1>Administrateurs actuels</h1>
        <v-row>
            <v-col>
                <ul>
                    <li v-for="admin of admins">{{ admin.username }}</li>
                </ul>
            </v-col>
        </v-row>
    </v-container>
</template>


<script lang="ts">
    import {Component, Prop, Vue, Watch} from "vue-property-decorator";
    import {Action, Getter} from "nuxt-class-component";
    import {ExerciseWordsConfig} from "~/core/ExerciseWordsConfig";
    import {LanguagesEnum} from "~/core/enums/languages.enum";

    @Component({
        components: {}
    })
    export default class WordsEdition extends Vue {

        @Action('findUsers') findUsers: any;
        @Action('fetchAdmins') fetchAdmins: any;
        @Action('putAdmin') putAdmin: any;

        search: any = {
            username: ''
        }

        results: [] = [];
        admins: [] = [];

        async mounted() {
            this.admins = await this.fetchAdmins();
        }

        async find() {
            this.results = await this.findUsers(this.search);
        }

        async upAdmin(id:any){
            await this.putAdmin({id});
            this.admins = await this.fetchAdmins();
        }
    }
</script>
