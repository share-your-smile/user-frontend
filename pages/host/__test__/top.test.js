import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import MakePostPage from '@/pages/host/_id/top.vue';

const localVue = createLocalVue();

localVue.use(Vuex);

describe('make post page', () => {
  let wrapper;

  let store;
  let mutations;
  let getters;

  beforeEach(() => {
    getters = {
      'getLoginUser': jest.fn()
    };
    store = new Vuex.Store({
      modules: {
        host: {
          namespaced: true,
          state: {},
          getters
        }
      }
    });
  });

  test('TC001', () => {

  })
})