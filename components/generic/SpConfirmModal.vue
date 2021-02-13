<template>
    <v-dialog v-model="dialog" width="500">
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
                <v-spacer />
                <v-btn @click="cancel">
                    Annuler
                </v-btn>
                <v-btn @click="confirm">
                    Confirmer
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script lang="ts">
    import {Component} from "nuxt-property-decorator";
    import {Vue} from "vue-property-decorator";

    @Component({})
    export default class SpConfirmModal extends Vue {
        dialog: boolean = false;

        open() {
            this.dialog = true;
        }

        cancel() {
            this.dialog = false;
        }

        confirm() {
            this.$emit('confirm');
            this.dialog = false;
        }
    }
</script>
