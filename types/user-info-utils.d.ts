import { UserInfoInterface } from '~/plugins/injection/user-info-utils';

declare module 'vue/types/vue' {
  interface Vue {
    readonly $userInfoInterface: UserInfoInterface
  }
}