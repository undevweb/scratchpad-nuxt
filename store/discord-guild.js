import DiscordGuild from "~/models/DiscordGuild";

export const state = () => ({
    discordGuilds: [],
    prefix:"!"
})

export const getters = {
    getDiscordGuilds(state) {
        return state.discordGuilds;
    },
    getDiscordGuild: state => id => state.discordGuilds.find(s => s.id === id),
    getPrefix : state => state.prefix
}

export const mutations = {
    setDiscordGuilds(state, discordGuilds) {
        state.discordGuilds = discordGuilds;
    },
    updateDiscordGuild(state,discordServer){
        const idDiscordGuild = state.discordGuilds.findIndex(ds => ds.id.localeCompare(discordServer.id) === 0);
        state.servers[idDiscordGuild] = discordServer;
    }
}

export const actions = {

    async fetchAll({ commit }) {
        const { data } = await this.$axios.get(`discord-guilds`);
        commit('setDiscordGuilds', data);
        return data;
    },

    async fetchMyGuilds({ commit }) {
        const { data } = await this.$axios.get(`/discord/my-guilds`);
        await DiscordGuild.deleteAll();
        await DiscordGuild.insert({ data });
        return data;
    },

    async updateDiscordGuild({ commit }, query){
        const { data } = await this.$axios.put(`discord-guilds`, query.discordServer);
        commit('updateDiscordGuild',data);
        return data;
    },

    async send({ commit }, query){
        const { data } = await this.$axios.post(`bots/send`, query.directMessage);
        return data;
    },

    async syncMyDiscordGuilds({ commit }, query){
        const { data } = await this.$axios.get(`discord/sync-my-guilds`);
        return data;
    },


}
