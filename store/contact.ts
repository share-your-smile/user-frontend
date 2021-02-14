import { getterTree, mutationTree, actionTree } from 'nuxt-typed-vuex';

export const state = () => ({
  from: '' as string,
  name: '' as string,
  contents: '' as string,
})

export const getters = getterTree(state, {
  getFrom(state) {
    return state.from;
  },
  getName(state) {
    return state.name;
  },
  getCotents(state) {
    return state.contents;
  }
});

export const mutations = mutationTree(state, {
  setFrom(state, from) {
    state.from = from;
  },
  setName(state, name) {
    state.name = name;
  },
  setContents(state, contents) {
    state.contents = contents;
  },
  reset(state) {
    state.from = '';
    state.name = '';
    state.contents = '';
  },
});

export const actions = actionTree({state, getters, mutations }, {
  async sendMessage(context) {

    const params = {
      from: context.state.from,
      name: context.state.name,
      contents: context.state.contents,
    }

    return await new Promise((resolve, reject) => {
      this.$axios
        .$post('/api/v1/contact/mail', params)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        })
    })
  },
  setFrom(context, from) {
    context.commit('setFrom', from);
  },
  setName(context, name) {
    context.commit('setName', name);
  },
  setContents(context, contents) {
    context.commit('setContents', contents);
  },
  reset(context) {
    context.commit('reset');
  },
});