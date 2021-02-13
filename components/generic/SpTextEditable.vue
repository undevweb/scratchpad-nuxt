<template>
    <span class="text-editable">
        <span v-if="!isEditing" @dblclick="edit(true)">{{ prefix }}{{value}}</span>
        <v-btn v-if="!isEditing && value===''" @click="edit(true)">Editer</v-btn>
        <v-text-field
            v-if="isEditing"
            ref="textField"
            :value="value"
            v-bind="$attrs"
            v-on="$listeners"
            dense
            @input="$emit('input',$event)"
            @keypress.enter="update"
            @blur="updateBlur"
            prefix
        />
    </span>
</template>

<script lang="ts">
    import {Component} from "nuxt-property-decorator";
    import {Prop, Vue} from "vue-property-decorator";

    @Component({})
    export default class SpTextEditable extends Vue {
        @Prop() value:any;
        @Prop() label:any;
        @Prop({default:""}) prefix:any;

        isEditing: boolean = false;
        $refs : any;

        /**
         * Indique au composant parent la nouvelle valeur
         */
        update(e:any) {
            e.preventDefault();
            this.isEditing = false;
            this.$emit('save');
        }

        updateBlur() {
            this.isEditing = false;
            this.$emit('save');
        }

        /**
         * Rend le texte éditable
         * @param isEditing
         */
        edit(isEditing = true) {
            this.isEditing = isEditing;
            this.$nextTick(() => {
                this.$refs.textField.focus();
            });
        }

    }
</script>

<style scoped>

</style>
