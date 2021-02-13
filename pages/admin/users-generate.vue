<template>
    <v-container>
        <v-row>
            <v-col>
                <v-subheader>Utilisateurs générés</v-subheader>
                <v-list v-if="usersGenerated" dense>
                    <v-list-item v-for="user of usersGenerated" :key="user.id">
                        <v-list-item-title>{{ user.username }} |
                            <a :href="`/user/profile-generated/${ user.socialGenerated.generatedId }`" target="_blank">lien : </a>
                            {{ url }}/user/profile-generated/{{  user.socialGenerated.generatedId  }}
                        </v-list-item-title>
                    </v-list-item>
                </v-list>

            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-subheader>Générer des utilisateurs</v-subheader>
                <v-text-field v-model="modelUser.username" label="Username"/>
                <v-btn @click="generate">Générer</v-btn>
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
    export default class UsersGenerate extends Vue {

        @Action('generateUsers') generateUsers: any;
        @Action('getGeneratedUser') getGeneratedUser: any;

        usersGenerated: any[] = [];

        modelUser : {username:string} = {username:"Account Generated"}

        get url(){
            return process.env.BASE_URL
        }

        async mounted() {
            this.usersGenerated = await this.getGeneratedUser();
        }

        async generate() {
            await this.generateUsers({user : this.modelUser});
            this.usersGenerated = await this.getGeneratedUser();
        }

    }
</script>
