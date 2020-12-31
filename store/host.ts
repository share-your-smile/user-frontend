import { getterTree, mutationTree, actionTree } from 'nuxt-typed-vuex';
import axios from 'axios';

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

export const actions = actionTree({
  state, getters, mutations}, {
    // 登録済みユーザーの情報を取得する
    async getUserInfo(context, data) {
      let payloadData: any = '';

      await new Promise((resolve, reject) => {
        axios.post(`${process.env.USER_DATA_API_BASE_URL}/user-info/one`,data)
        .then((res) => {
          payloadData = res.data;
          resolve(res);
        })
        .catch((error) => {
          payloadData = error;
          reject(error);
        })
        .finally(() => {
          context.commit('login', payloadData);
        })
      })
    },

    async registerUserInfo(context, data) {
      let payloadData: any = '';

      await new Promise((resolve, reject) => {
        axios.post(`${process.env.USER_DATA_API_BASE_URL}/user-info`,data)
        .then((res) => {
          payloadData = res.data;
          resolve(res);
        })
        .catch((error) => {
          payloadData = error;
          reject(error);
        })
        .finally(() => {
          context.commit('login', payloadData);
        })
      })
    }
})