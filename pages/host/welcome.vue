<template>
  <div>
    <h1>登録ありがとうございます！</h1>
    <h2>下記のリンクから参加者用投稿ページのQRコードを取得してください</h2>
    <v-btn depressed
      outlined
      rounded
      color="primary"
      @click="toMakePage"
    >
      メインページ
    </v-btn>
  </div>
</template>

<script lang='ts'>
import Component from "vue-class-component";
import { Vue, Watch } from "vue-property-decorator";

@Component
export default class Welcome extends Vue {
  toMakePage () {
    this.$router.push('make-post-page');
  }
}
</script>