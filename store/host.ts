import { getterTree, mutationTree, actionTree } from 'nuxt-typed-vuex'

export const state = () => ({
  name: '' as string,
  email: '' as string,
  id: '' as string
})

export type RootState = ReturnType<typeof state>

export const mutations = mutationTree(state, {
  login(state, userInfo) {
    state.name = userInfo.name;
    state.email = userInfo.email;
    state.id = userInfo.id;
  },
  logout(state) {
    state.name = '';
    state.email = '';
    state.id = '';
  }
})

export const getters = getterTree(state, {
  getLoginUser(state) {
    const userInfo = {
      name: state.name,
      email: state.email,
      id: state.id
    }
    return userInfo;
  }
})