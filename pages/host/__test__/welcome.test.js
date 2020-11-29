import { shallowMount, createLocalVue } from '@vue/test-utils';
import Welcome from '@/pages/host/welcome.vue';

describe('welcome', () => {
  test('TC001', () => {
    let wrapper;
    const router = { push: jest.fn() };
    wrapper = shallowMount(Welcome, {
      mocks: {
        $router: router,
      }
    });

    wrapper.vm.toMakePage();
    expect(router.push).toHaveBeenCalled();
  })
})