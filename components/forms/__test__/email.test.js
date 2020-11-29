import { shallowMount, mount } from '@vue/test-utils';
import Email from '@/components/forms/email.vue';

describe('components forms email', () => {
  let wrapper;

  test('TC001', () => {
    wrapper = mount(Email, {
      propsData: {
        email: ''
      }
    });
    const updateEmail = 'test2';
    const input = wrapper.find('input[type="text"]');
    input.setValue(updateEmail);

    // emitイベントが発火したかどうかを確認
    expect(wrapper.emitted('update:email')).toBeTruthy();
  });

})