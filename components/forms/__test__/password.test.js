import { shallowMount, mount } from '@vue/test-utils';
import Password from '@/components/forms/password.vue';

describe('components forms email', () => {
  let wrapper;

  test('TC001 login', () => {
    wrapper = mount(Password, {
      propsData: {
        password: '',
        basePassword: '',
      }
    });
    const updatePass = 'anonymous';
    const input = wrapper.find('input[type="password"]');
    input.setValue(updatePass);

    // emitイベントが発火したかどうかを確認
    expect(wrapper.emitted('update:password')).toBeTruthy();
  })

  test('TC002 register', () => {
    wrapper = mount(Password, {
      propsData: {
        password: '',
        basePassword: 'anonymous',
        confirm: true
      }
    });
    const updatePass = 'anonymous';
    const input = wrapper.find('input[type="password"]');
    input.setValue(updatePass);

    // emitイベントが発火したかどうかを確認
    expect(wrapper.emitted('update:password')).toBeTruthy();
  })

  test('TC003 register no match', () => {
    wrapper = mount(Password, {
      propsData: {
        password: 'anonymous',
        basePassword: 'anonymous',
        confirm: true
      }
    });
    const updatePass = 'anonymous';
    const input = wrapper.find('input[type="password"]');
    input.setValue(updatePass);

    // emitイベントが発火したかどうかを確認
    expect(wrapper.emitted('update:password')).toBeTruthy();
  })

})