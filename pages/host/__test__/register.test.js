import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Register from '@/pages/host/register.vue'

const localVue = createLocalVue();

localVue.use(Vuex);

const Err = [ 'SAME_USER_EXIST', 'ANY' ];
const ErrMsg = [ 
  '同じメールアドレスのユーザが登録されています',
  'エラーが発生しました。リトライしてください'
];

describe('host register page', () => {
  // let wrapper: Wrapper<Vue>;
  let wrapper;
  let mutations;
  let store;
  let userInfoInterface;
  let alertWindow;
  let router

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

    userInfoInterface = { registerUser: jest.fn() };
    alertWindow = { show: jest.fn() };
    router = { push: jest.fn() };
  });

  test('TC001 success case', async () => {

    const userInfo = {
      id: 5
    };

    wrapper = shallowMount(Register, {
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

    wrapper.vm.email = 'test2@email.com';
    wrapper.vm.name = 'test';
    wrapper.vm.password = '01234567';
    wrapper.vm.confirm_password = '01234567';

    wrapper.vm.$userInfoInterface = userInfoInterface;
    wrapper.vm.$userInfoInterface.registerUser.mockReturnValueOnce(userInfo);

    await wrapper.vm.checkPass();

    expect(mutations.login).toHaveBeenCalled();
  });

  test('TC002', async () => {
    const wrongRes = {
      wrong: 'wrong'
    };

    wrapper = shallowMount(Register);

    wrapper.vm.$refs.form.validate = jest.fn();
    wrapper.vm.$refs.form.validate.mockReturnValueOnce(true);

    wrapper.vm.$userInfoInterface = userInfoInterface;
    wrapper.vm.$userInfoInterface.registerUser.mockReturnValueOnce(wrongRes);

    wrapper.vm.$refs.alertWindow = alertWindow;

    await wrapper.vm.checkPass();

    expect(wrapper.vm.error_message).toEqual(ErrMsg[1]);
  });

  test('TC003', () => {
    wrapper = shallowMount(Register);

    wrapper.vm.$refs.form.resetValidation = jest.fn();
    wrapper.vm.$refs.form.resetValidation.mockReturnValueOnce(true);

    wrapper.vm.resetValidate();
  })

  test(`TC004 error messages`, async () => {
  
    // const err = {
    //   error_message: Err[i]
    // };

    wrapper = shallowMount(Register, {
      mocks: {
        $router: router,
      },
      store,
      localVue
    });

    wrapper.vm.$refs.form.validate = jest.fn();
    wrapper.vm.$refs.form.validate.mockReturnValueOnce(false);

    // wrapper.vm.$userInfoInterface = userInfoInterface;
    // wrapper.vm.$userInfoInterface.registerUser.mockReturnValueOnce(err);

    wrapper.vm.$refs.alertWindow = alertWindow;

    // wrapper.vm.check;
    // await wrapper.find('#test-button').trigger('click');
    await wrapper.vm.checkPass();

    expect(mutations.login).not.toHaveBeenCalled();
  })

  for (let i = 0; i < Err.length; i++) {
    test(`TC00${i+3} error messages`, async () => {
  
      const err = {
        error_message: Err[i]
      };
  
      wrapper = shallowMount(Register);
  
      wrapper.vm.$refs.form.validate = jest.fn();
      wrapper.vm.$refs.form.validate.mockReturnValueOnce(true);
  
      wrapper.vm.$userInfoInterface = userInfoInterface;
      wrapper.vm.$userInfoInterface.registerUser.mockReturnValueOnce(err);
  
      wrapper.vm.$refs.alertWindow = alertWindow;
  
      // wrapper.vm.check;
      // await wrapper.find('#test-button').trigger('click');
      await wrapper.vm.checkPass();
  
      expect(wrapper.vm.error_message).toEqual(ErrMsg[i]);
    })
  }

})