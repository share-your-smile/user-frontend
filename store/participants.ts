import { getterTree, mutationTree, actionTree } from 'nuxt-typed-vuex'

export const state = () => ({
  name: '' as string,
  hostId: 0 as number,
})

export type RootState = ReturnType<typeof state>

export const mutations = mutationTree(state, {
  loginMutation(state, registName) {
    state.name = registName;
  },
  logout(state) {
    state.name = '';
  },
  setHostIdMutation(state, hostId) {
    state.hostId = hostId;
  },
});

export const getters = getterTree(state, {
  getLoginUser(state) {
    return state.name;
  },
  getHostId(state) {
    return state.hostId;
  }
});

export const actions = actionTree({state, mutations}, {
  setHostId(context, hostId) {
    context.commit(`setHostIdMutation`, hostId);
  },
  login(context, registName) {
    context.commit('loginMutation', registName)
  }
})