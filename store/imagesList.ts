import { getterTree, mutationTree, actionTree } from 'nuxt-typed-vuex';

export const state = () => ({
  list: [] as any[],
  image: '' as any,
});

export type RootState = ReturnType<typeof state>

export const mutations = mutationTree(state, {
  updateList(state, list) {
    state.list = list;
  },
  updateImage(state, payload) {
    state.image = payload;
  }
});

export const getters = getterTree(state, {
  getList(state) {
    return state.list;
  }
});

export const actions = actionTree({state, getters, mutations }, {
  async getImagesList(context, folder) {
    let payloadData: any = '';

    return await new Promise((resolve, reject) => {
      this.$axios
        .$get(`/api/v1/image/list/${folder}`)
        .then((res) => {
          payloadData = res;
          context.commit('updateList', payloadData);
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        })
      })
  },
  async fetchImage(context, params) {
    let prefix: string;
    if (params.isResizedBucket) {
      prefix = `resized-${params.userId}`;
    } else {
      prefix = params.userId;
    }

    return await new Promise((resolve, reject) => {
      this.$axios
        .$get(`/api/v1/image/images/${prefix}/${params.fileName}`, { responseType: 'arraybuffer' })
        .then((res) => {
          const array = new Uint8Array(res);
          const result = new Blob([array]);
          resolve(result);
        })
        .catch((err) => {
          reject(err);
        })
    })
  },
  async uploadImage(context, params) {
    const data = {
      image: params.image,
      poster: params.poster,
    }
    return await new Promise((resolve, reject) => {
      this.$axios
        .$post(`/api/v1/image/images/${params.userId}`, data)
        .then((res) => {
          console.log(res);
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        })
    })
  }
});