<template>
  <v-container>
    <v-row
      justify="center"
    >
      <sub-title v-bind:title="title.thanks" />
    </v-row>

    <v-row style="height:100px;"></v-row>

    <!-- <h2>下記のリンクから参加者用投稿ページのQRコードを取得してください</h2> -->
    <v-row
      justify="center"
    >
      <v-btn
        depressed
        rounded
        x-large
        color="primary"
        class="text-h5"
        style="font-family:'myFont'!important"
        @click="toMakePage"
      >
        メインページへ
      </v-btn>
    </v-row>
  </v-container>
</template>

<script lang='ts'>
import Component from "vue-class-component";
import { Vue, Watch } from "vue-property-decorator";

import SubTitle from '~/components/SubTitle.vue';

@Component
export default class Welcome extends Vue {
  title: any = {
    thanks: '登録ありがとうございます！'
  };

  toMakePage () {
    this.$router.push('top');
  }
}
</script>