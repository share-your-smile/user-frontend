import { getterTree, mutationTree, actionTree } from 'nuxt-typed-vuex'

export const state = () => ({
  name: '' as string
})

export type RootState = ReturnType<typeof state>

export const mutations = mutationTree(state, {
  login(state, registName) {
    state.name = registName;
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