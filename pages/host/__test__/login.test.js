import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Login from '@/pages/host/login.vue';

const localVue = createLocalVue();

localVue.use(Vuex);

const Err = [ 'NO_USER', 'PASSWORD_UNMATCH', 'NO_CASE' ];
const ErrMsg = [ 
  'ユーザーが登録されていません',
  'パスワードが一致しません',
  'エラーが発生しました。リトライしてください'
];

describe('host login page', () => {
  // let wrapper: Wrapper<Vue>;
  let wrapper;
  let mutations;
  let store;

  beforeEach(() => {
    mutations = {
      'login': jest.fn(),
    }
    store = new Vuex.Store({
      modules: {
        host: {
          namespaced: true,
          state: {},
          mutations
        }
      }
    })
  })

  test('TC001', () => {
    wrapper = shallowMount(Login);
    expect(wrapper.vm).toBeTruthy();
  });

  test(`TC002 get light user info`, async () => {
    const userInfoInterface = {
      getUser: jest.fn()
    }

    const alertWindow = {
      show: jest.fn()
    }

    const router = { push: jest.fn() };

    const userInfo = {
      name: 'test',
      email: 'test@email.com',
      id: 5
    };

    wrapper = shallowMount(Login, {
      mocks: {
        $router: router,
      },
      store,
      localVue
    });

    const form = {
      validate: jest.fn()
    };

    wrapper.vm.$refs.form = form;
    wrapper.vm.$refs.form.validate.mockReturnValue(true);

    wrapper.vm.password = '';

    wrapper.vm.email = 'test2@email.com';
    wrapper.vm.name = 'test';

    wrapper.vm.$userInfoInterface = userInfoInterface;
    wrapper.vm.$userInfoInterface.getUser.mockReturnValueOnce(userInfo);

    await wrapper.vm.check();

    wrapper.vm.name = 'test2';

    expect(mutations.login).toHaveBeenCalled();
  })

  test('TC003 wrong response', async () => {
    const userInfoInterface = {
      getUser: jest.fn()
    }

    const alertWindow = {
      show: jest.fn()
    }

    const wrongRes = {
      wrong: 'wrong'
    };

    wrapper = shallowMount(Login);

    wrapper.vm.$refs.form.validate = jest.fn();
    wrapper.vm.$refs.form.validate.mockReturnValueOnce(true);

    wrapper.vm.$userInfoInterface = userInfoInterface;
    wrapper.vm.$userInfoInterface.getUser.mockReturnValueOnce(wrongRes);

    wrapper.vm.$refs.alertWindow = alertWindow;

    await wrapper.vm.check();

    expect(wrapper.vm.error_message).toEqual('エラーが発生しました。リトライしてください');
  })

  for (let i = 0; i < Err.length; i++) {
    test(`TC00${i+2} error messages`, async () => {
      const userInfoInterface = {
        getUser: jest.fn()
      }
  
      const alertWindow = {
        show: jest.fn()
      }
  
      const err = {
        error_message: Err[i]
      };
  
      wrapper = shallowMount(Login);
  
      wrapper.vm.$refs.form.validate = jest.fn();
      wrapper.vm.$refs.form.validate.mockReturnValueOnce(true);
  
      wrapper.vm.$userInfoInterface = userInfoInterface;
      wrapper.vm.$userInfoInterface.getUser.mockReturnValueOnce(err);
  
      wrapper.vm.$refs.alertWindow = alertWindow;
  
      // wrapper.vm.check;
      // await wrapper.find('#test-button').trigger('click');
      await wrapper.vm.check();
  
      expect(wrapper.vm.error_message).toEqual(ErrMsg[i]);
    })
  }

})