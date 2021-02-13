<template>
    <div>
        <v-list v-if="isAdmin" dense>
            <v-subheader>Admin</v-subheader>
            <v-list-item v-for="(link,i) of links" :key="i + '-link'" link dense >
                <v-list-item-action>
                    <v-icon small>{{ link.icon }}</v-icon>
                </v-list-item-action>
                <v-list-item-content @click="$emit('drawer')">
                        <router-link :to="{ path: link.path}" >{{ link.label }}</router-link>
                </v-list-item-content>
            </v-list-item>

        </v-list>
    </div>
</template>


<script lang="ts">

    import {Component, Vue} from "vue-property-decorator";
    import {Getter} from "nuxt-class-component";

    @Component({
        components: {},
    })
    export default class NavigationLeft extends Vue {
        @Getter('isAdmin') isAdmin: any;
        links: any[] = [
            {path: '/admin/users', label: 'Liste des admins', icon:'mdi-face-profile'},
            {path: '/admin/users-generate', label: 'Générer des utilisateurs', icon:'mdi-account-star'},
        ]
    }
</script>
