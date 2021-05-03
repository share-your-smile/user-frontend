<template>
  <v-container>
    <v-row
      justify="center"
    >
      <sub-title v-bind:title="title.thanks" />
    </v-row>

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
import Vue from 'vue'

export default Vue.extend({
  layout: 'host_default',
  data () {
    return {
      title: {
        thanks: '登録ありがとうございます！'
      }
    }
  },
  methods: {
    toMakePage () {
      this.$router.push('top/');
    }
  }
})
</script>