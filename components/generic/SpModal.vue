<template>
    <v-dialog v-model="dialog" :content-class="scrollbarTheme">
        <!--        <template v-slot:activator="{ on, attrs }">-->
        <!--            <v-btn v-if=""-->
        <!--                v-bind="attrs"-->
        <!--                v-on="on"-->
        <!--            >-->
        <!--                Click Me-->
        <!--            </v-btn>-->
        <!--        </template>-->

        <v-card>
            <v-card-title>
                <slot name="title"></slot>
            </v-card-title>

            <v-card-text>
                <slot name="text"></slot>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
                <slot name="actions"></slot>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script lang="ts">
    import {Component} from "nuxt-property-decorator";
    import {Vue} from "vue-property-decorator";

    @Component({})
    export default class SpModal extends Vue {
        dialog: boolean = false;

        get scrollbarTheme() {
            return this.$vuetify.theme.dark ? 'theme--dark' : 'theme--light';
        }

        open() {
            this.dialog = true;
        }

        close(){
            this.dialog = false;
        }
    }
</script>
