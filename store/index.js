import VuexORM from "@vuex-orm/core";
import { RolesEnum } from "@/core/enums/roles.enum";
import User from "~/models/User";

const database = new VuexORM.Database();

database.register(User, {});

const plugin = VuexORM.install(database);


export const state = () => ({
    localeOrigin: localStorage.getItem('localeOrigin') || 'fr_FR',
    localeObjective: localStorage.getItem('localeObjective') || 'en_EN'
})

export default {
    plugins: [ plugin ],
    state : () => ({
        localeOrigin: localStorage.getItem('localeOrigin') || 'fr_FR',
        localeObjective: localStorage.getItem('localeObjective') || 'en_EN'
    }),
    getters: {
        localeOrigin(state) {
            return state.localeOrigin;
        },
        localeObjective(state) {
            return state.localeObjective;
        },
        isAuthenticated(state) {
            return state.auth.loggedIn
        },
        loggedInUser(state) {
            return state.auth.user
        },
        isAdmin(state) {
            return state.auth.user && state.auth.user.roles && state.auth.user.roles.includes(RolesEnum.ADMIN);
        },
        isVIP(state) {
            return state.auth.user && state.auth.user.roles && state.auth.user.roles.includes(RolesEnum.VIP);
        },
        getPreferences(state) {
            if(state.auth.user && state.auth.user.preferences){
                return state.auth.user.preferences;
            }
            return {};
        }
    },
    mutations:{

        setLocalOrigin(state, locale) {
            if (state.localeObjective === locale) {
                mutations.switchLocales(state);
                return;
            }
            state.localeOrigin = locale;
            localStorage.setItem('localeOrigin', state.localeOrigin);
        },
        setLocalObjective(state, locale) {
            if (state.localeOrigin === locale) {
                mutations.switchLocales(state);
                return;
            }
            state.localeObjective = locale;
            localStorage.setItem('localeObjective', state.localeObjective);
        },
        switchLocales(state) {
            const localeTmp = state.localeOrigin;
            state.localeOrigin = state.localeObjective;
            state.localeObjective = localeTmp;
            localStorage.setItem('localeOrigin', state.localeOrigin);
            localStorage.setItem('localeObjective', state.localeObjective);
        },
        setPreferences(state,query){
            state.auth.user.preferences = query.preferences;
        }
    },
    actions:{
        async updatePreferences({ commit }, query) {
            const { data } = await this.$axios.put(`/users/update-preferences`, query.preferences);
            commit('setPreferences',query);
            return data;
        },
        async registerDiscord({ commit }, query) {
            const { data } = await this.$axios.post(`/discord/register`, {socialToken : query.socialToken});
            return data;
        },
        async connectDiscord({ commit }, query) {
            const { data } = await this.$axios.post(`/discord/connect`, {socialToken : query.socialToken});
            return data;
        },
        async registerGoogle({ commit }, query) {
            const { data } = await this.$axios.post(`/google/register`, {socialToken : query.socialToken});
            return data;
        },
        async connectGoogle({ commit }, query) {
            const { data } = await this.$axios.post(`/google/connect`, {socialToken : query.socialToken});
            return data;
        },
        async fetchAdmins({ commit }, query) {
            const { data } = await this.$axios.get(`/admin`);
            return data;
        },
        async putAdmin({ commit }, query) {
            const { data } = await this.$axios.put(`/admin/${query.id}`);
            return data;
        },
        async findUsers({ commit }, query) {
            const { data } = await this.$axios.post(`/users/find?username=${query.username}`);
            return data;
        },
        async getGeneratedUser({ commit }, query) {
            const { data } = await this.$axios.get(`/social-generated`);
            return data;
        },
        async generateUsers({ commit }, query) {
            const { data } = await this.$axios.post(`/social-generated`,{user:query.user});
            return data;
        },
        async connectGenerated({ commit }, query) {
            const { data } = await this.$axios.post(`/auth/generated`, {token : query.token});
            return data;
        },
    }
};
