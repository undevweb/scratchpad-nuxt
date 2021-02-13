<template>
    <span class="select-editable">

        <span v-if="!isEditing && libelle" @dblclick="isEditing = true">{{ libelle }}</span>

        <v-select
            v-if="isEditing || !libelle"
            :value="value"
            v-bind="$attrs"
            @input="$emit('input',$event)"
            @change="update"
            @blur="updateBlur"
        />

    </span>
</template>

<script lang="ts">
    import {Component} from "nuxt-property-decorator";
    import {Prop, Vue} from "vue-property-decorator";

    @Component({})
    export default class SpSelectEditable extends Vue {
        @Prop() value: any;
        @Prop() label: any;
        isEditing: boolean = false;

        get libelle() {

            if (!this.value) return null;
            return this.value[this.$attrs['item-text']];
        }

        /**
         * Indique au composant parent la nouvelle valeur
         */
        update(e: any) {
            this.isEditing = false;
            this.$emit('input', e);
            this.$emit('save', e);
        }

        updateBlur(e:any) {
            this.isEditing = false;
            this.$emit('save',e);
        }

        /**
         * Rend le texte éditable
         * @param isEditing
         */
        edit(isEditing = true) {
            this.isEditing = isEditing;
        }

    }
</script>

<style scoped>

</style>
