<template>
    <form>
        <v-alert v-if="showLoginError" type="error" dismissible>
            Une erreur s'est produite lors de la connexion
        </v-alert>
        <v-row>
            <v-col>
                <v-text-field v-model="user.username" label="Login" @keypress.enter="userLogin" />
            </v-col>
        </v-row>
        <v-row>
            <v-col class="pt-0">
                <v-text-field
                    v-model="user.password"
                    type="password"
                    label="Password"
                    @keypress.enter="userLogin"
                />
            </v-col>
        </v-row>
        <v-row>
            <v-col class="text-center">
                <v-btn color="primary" @click="userLogin">Connexion !</v-btn>
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
    export default class ConnectionForm extends Vue {

        @Getter('isAuthenticated') isAuthenticated: any;
        @Getter('getPreferences') getPreferences: any;

        showLoginError = false;
        error = '';
        user = {
            username: '',
            password: '',
            email: ''
        };

        $auth: any;
        $axios: any;

        async userLogin() {
            // this.$axios.post('/auth/login',this.user);
            try {
                await this.$auth.loginWith('local', {
                    data: this.user,
                });

                await this.$router.push('/user/profile');

            } catch (e) {
                this.showLoginError = true;
                this.error = e.response.data.message;
            }

        }

        userRegister() {
            this.$axios.post('/auth/register', this.user);
        }

    }
</script>
