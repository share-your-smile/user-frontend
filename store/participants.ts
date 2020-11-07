import { getterTree, mutationTree, actionTree } from 'nuxt-typed-vuex'

export const state = () => ({
  name: '' as string
})

export type RootState = ReturnType<typeof state>

export const mutations = mutationTree(state, {
  login(state, name) {
    state.name = name;
  },
  logout(state) {
    state.name = '';
  }
})

export const getters = getterTree(state, {
  getLoginUser(state) {
    return state.name;
  }
})