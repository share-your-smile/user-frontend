<template>
  <div>
    <h1>Post Image</h1>
    <h2>you are {{ participantsName }}</h2>
  </div>
</template>

<script lang='ts'>
// 画像投稿ページ
import Component from "vue-class-component";
import { Vue, Watch } from "vue-property-decorator";

@Component({
  layout: 'participants_default',
  middleware: 'participants-authenticated'
})
export default class PostImage extends Vue{
  // ミドルウェアでリダイレクトする
  participantsName: string = '';

  created () {
    this.participantsName = this.$store.getters['participants/getLoginUser'];
  }
};
</script>