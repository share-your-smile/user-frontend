import { shallowMount, mount } from '@vue/test-utils';
import Name from '@/components/forms/name.vue';

describe('components forms email', () => {
  let wrapper;

  test('TC001', () => {
    wrapper = mount(Name, {
      propsData: {
        name: ''
      }
    });
    const updateName = 'anonymous';
    const input = wrapper.find('input[type="text"]');
    input.setValue(updateName);

    // emitイベントが発火したかどうかを確認
    expect(wrapper.emitted('update:name')).toBeTruthy();
  });

})