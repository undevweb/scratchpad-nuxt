<template>
    <span class="toggle">
        <span @click="turn" class="pa-2 grey--text darken-2--text" style="cursor: pointer">
            <v-icon :small="small">{{ value ? iconSelected.on : iconSelected.off }}</v-icon> {{ value ? label.on : label.off }}
        </span>
    </span>
</template>

<script lang="ts">
    import Vue from "vue";
    import {mdiToggleSwitch, mdiToggleSwitchOff} from "@mdi/js/commonjs/mdi";
    import Component from "vue-class-component";
    import {Prop} from "vue-property-decorator";

    @Component({})
    export default class SpToggle extends Vue {
        @Prop() value !: any;
        @Prop({type: Object, default: {on: '', off: ''}}) label!: string;
        @Prop({type: String, default: "toggle"}) icon!: string;
        @Prop({type: Boolean, default: false}) small!: boolean;
        @Prop({type: Object, default:null}) iconCustom!: any;

        icons: any = {
            toggle: {on: mdiToggleSwitch, off: mdiToggleSwitchOff},
            checkbox: {on: "check_box", off: "check_box_outline_blank"},
            radio: {on: "radio_button_checked", off: "radio_button_unchecked"},
            visibility: {on: "visibility", off: "visibility_off"},
        }

        turn() {
            this.$emit('input', !this.value)
        }

        get iconSelected() {
            if(this.iconCustom !== null){
                return this.iconCustom;
            }
            return this.icons[this.icon];
        }
    }

</script>

<style scoped>

</style>
