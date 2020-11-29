import { shallowMount, mount } from '@vue/test-utils';
import AlertWindow from '@/components/AlertWindow.vue';

describe('alert window', () => {
  let wrapper;
  test('open window', () => {
    wrapper = shallowMount(AlertWindow, {
      propsData: {
        error_message: 'test error'
      }
    });

    wrapper.vm.show();

  })
})