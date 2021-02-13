<template>

    <v-container class="pa-2">
        <v-row>
            <v-col>
                <h1>Bienvenue sur Scratchpad !</h1>
            </v-col>
        </v-row>
    </v-container>

</template>

<script lang="ts">
    import Vue from 'vue';
    import {Component} from "vue-property-decorator";
    import Connection from "~/pages/user/connection.vue";
    import {Getter} from "nuxt-class-component";
    import GameThemes from "~/pages/vocabulary/game-themes.vue";

    @Component({
        components: {Connection},
        // middleware: ['auth', 'role'],
        // meta: {
        //     roles: [RolesEnum.ADMIN]
        // }
    })
    export default class Index extends Vue {
        @Getter('isAuthenticated') isAuthenticated: any;
    }
</script>
