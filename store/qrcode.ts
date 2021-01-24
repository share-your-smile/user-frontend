import { getterTree, mutationTree, actionTree } from 'nuxt-typed-vuex';
import axios from 'axios';

export const state = () => ({
  svg: '' as string,
  png: '' as string,
  url: '' as string,
})

export type RootState = ReturnType<typeof state>

export const getters = getterTree(state, {
  svg(state) {
    return state.svg;
  },
  url(state) {
    return state.url;
  },
  png(state) {
    return state.png;
  }
})

export const mutations = mutationTree(state, {
  setQrcode(state, payload) {
    state.svg = payload.result;
    state.url = payload.url;
  },
  setQrcodePng(state, payload) {
    state.png = payload.result;
  }
})

export const actions = actionTree({state}, {
    // 登録済みユーザーの情報を取得する
    async fetchSvg(context, data) {
      return await new Promise((resolve, reject) => {
        axios.post(`${process.env.USER_DATA_API_BASE_URL}/qrcode`,data)
        .then((res) => {
          context.commit('setQrcode', res.data);
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        })
      })
    },
    async fetchPng(context, data) {
      return await new Promise((resolve, reject) => {
        axios.post(`${process.env.USER_DATA_API_BASE_URL}/qrcode`,data)
        .then((res) => {
          context.commit('setQrcodePng', res.data);
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        })
      })
    }
  }
)