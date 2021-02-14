<template>
  <div>
    <v-container>
      <v-row
        justify="center"
      >
        <sub-title
          :title="words.title"
        />
      </v-row>

      <v-row
        justify="center"
        v-for="(text, index) in words.texts"
        :key="index"
      >
        <div v-html="text"></div>
      </v-row>

      <v-row
        justify="center"
      >
        <v-avatar
          size="170"

        >
          <v-img src="/self.JPG" />
        </v-avatar>
      </v-row>

    </v-container>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';

import SubTitle from '~/components/SubTitle.vue';

@Component({
  layout: 'host_default',
  components: {
    SubTitle,
  }
})
export default class SelfIntroduction extends Vue {
  words: any = {
    title: 'Share Your Smileについて',
    texts: [
      'はじめまして。Share Your Smile作者の<a href="https://twitter.com/thoughtbleachi1" target="_blank">yason</a>です。',
      'このアプリは、実際に僕が自分の結婚式で使ったものがベースになっています。',
      '素敵な式を演出できたので皆さんにも使っていただきたいなと思い、作成しました！',
      'あなたの忘れられない思い出の一助になれれば幸いです！😊'
    ]
  }
}
</script>

<style scoped>

</style>