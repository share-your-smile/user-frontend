<template>
  <div>
    <h1>ホスト用ページ</h1>
    <h2>下記のQRコードを参加者に配布してください</h2>
    <v-btn depressed
      outlined
      rounded
      color="primary"
      @click="resetCookie"
    >
      Reset Cookie
    </v-btn>
  </div>
</template>

<script lang='ts'>
// 参加者画像投稿用ページへのアクセス先生成ページ
// Vuexでhostのidを取得し、
import Component from "vue-class-component";
import { Vue, Watch } from "vue-property-decorator";

@Component
export default class MainPostPage extends Vue {
  resetCookie () {
    console.log('reset');
    document.cookie = "my-key=; max-age=0";
    alert(document.cookie);
  }
}
</script>