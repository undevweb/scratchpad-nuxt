<template>
    <form>
        <v-row>
            <v-col>
                <v-alert v-if="errorUsernameAlreadyExist" type="error"> Ce nom d'utilisateur est déjà utilisé</v-alert>
                <v-alert v-if="errorFieldEmpty" type="error">L'un des champs est vide</v-alert>
                <v-text-field v-model="user.username" label="Login" @change="errorUsernameAlreadyExist=false" />
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-text-field v-model="user.email" label="Email" />
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-text-field
                    v-model="user.password"
                    label="Password"
                    type="password"
                    @keypress.enter="userRegister"
                />
            </v-col>
        </v-row>
        <v-row>
            <v-col class="text-center">
                <v-btn @click="userRegister" color="primary" rounded dense>Valider</v-btn>
            </v-col>
        </v-row>
    </form>
</template>

<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";
    import {Getter} from "nuxt-class-component";

    @Component({
        components: {}
    })
    export default class RegisterForm extends Vue {

        @Getter('isAuthenticated') isAuthenticated: any;
        @Getter('getPreferences') getPreferences: any;

        user = {
            username: '',
            password: '',
            email: ''
        };
        errorUsernameAlreadyExist: boolean = false;
        errorFieldEmpty: boolean = false;
        $auth: any;
        $axios: any;

        mounted() {
            if (this.isAuthenticated) {

            }
        }

        async userRegister() {
            const {data} = await this.$axios.post('/local/register', this.user);

            if (!data.success && data.error === 'USERNAME_ALREADY_EXIST') {
                this.errorUsernameAlreadyExist = true;
            }

            if (!data.success && data.error === 'FIELD_EMPTY') {
                this.errorFieldEmpty = true;
            }

            if (data.success) {
                this.$emit('created');
            }
        }

    }
</script>
