import { getterTree, mutationTree, actionTree } from 'nuxt-typed-vuex';
import axios from 'axios';

export const state = () => ({
  list: [] as any[]
});

export type RootState = ReturnType<typeof state>

export const mutations = mutationTree(state, {
  updateList(state, list) {
    state.list = list;
  }
});

export const getters = getterTree(state, {
  getList(state) {
    return state.list;
  }
});

export const actions = actionTree({
  state, getters, mutations }, {
    async getImagesList(context, folder) {
      let payloadData: any = '';

      await new Promise((resolve, reject) => {
        axios.get(`${process.env.POST_PAGE_BASE_URL}/api/${folder}/list`)
        .then((res) => {
          payloadData = res.data;
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        })
        .finally(() => {
          context.commit('updateList', payloadData);
        })
      })
    }
});