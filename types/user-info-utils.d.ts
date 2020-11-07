import { UserInfoInterface } from '~/plugins/user-info-utils';

declare module 'vue/types/vue' {
  interface Vue {
    readonly $userInfoInterface: UserInfoInterface
  }
}