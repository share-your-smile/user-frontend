import { S3Connect } from '~/plugins/injection/s3-connect';

declare module 'vue/types/vue' {
  interface Vue {
    readonly $s3Connect: S3Connect
  }
}