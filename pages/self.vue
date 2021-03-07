<template>
  <div>
    <v-container>

      <v-row style="height: 40px;"/>

      <v-row
        justify="center"
      >
        <v-img max-width="400" src="/logo/main_logo.png"/>
      </v-row>

      <v-row
        justify="center"
      >
        <sub-title
          :title="words.title"
        />
      </v-row>

      <v-row
        justify="center"
        v-for="(greeting, index) in words.greetings"
        :key="index"
      >
        <div v-html="greeting"></div>
        <div style="height: 24px;width:100%" />
      </v-row>

      <v-row
        justify="center"
      >
        <sub-title
          :title="words.administrator"
        />
      </v-row>

      <v-row justify="center">
        <v-avatar size="170">
          <v-img src="/self.JPG" />
        </v-avatar>
      </v-row>

      <v-row style="height:40px;" />

      <v-row justify="center">
        <div class="text-h6" style="font-family: 'myFont'!important" v-html="words.introductions.name"></div>
      </v-row>

      <v-row justify="center">
        <div v-html="words.introductions.job"></div>
      </v-row>
      <v-row justify="center">
        <div v-html="words.introductions.detail"></div>
      </v-row>
      <v-row justify="center">
        <div v-html="words.introductions.tech"></div>
      </v-row>
      <v-row justify="center">
        <div v-html="words.introductions.lisence"></div>
      </v-row>
      <v-row>
        <v-spacer />
        <v-col cols=4>
          <v-row justify="center">
            <v-btn depressed icon style="background-color: rgba(0,0,0,0)" href="https://twitter.com/thoughtbleachi1" target="_blank">
              <v-icon color="primary">mdi-twitter</v-icon>
            </v-btn>
            <v-btn depressed icon style="background-color: rgba(0,0,0,0)" href="https://github.com/yason0319" target="_blank">
              <v-icon color="primary">mdi-github</v-icon>
            </v-btn>
          </v-row>
        </v-col>
        <v-spacer />
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
    title: 'このアプリについて',
    greetings: [
      'はじめまして。Share Your Smileを運営している<a href="https://twitter.com/thoughtbleachi1" target="_blank">yason</a>です。',
      '突然ですが、皆さんが結婚式を行うにあたって重視することは何でしょうか？',
      '僕が重視したのは、「<strong>参加者を飽きさせないこと</strong>」でした。',
      '意外と結婚式の空き時間って多くないですか？',
      'この空き時間でやることがなくなってしまうという経験があり、',
      '自分がやるときはそういう時間を極力なくし、参加者に楽しんでいただきたい！',
      'そういう思いで演出グッズを調べてみました。',
      'でもあまりピンと来るものがなく、あっても価格がちょっと…😥',
      'よし、ならばいっそのこと作ってしまおう！',
      'そんな経緯でこのアプリの雛形を作成し、結婚式で実際に使ってみました。',
      'これがなかなかに好評で、無事に式を成功させることができました！',
      'そしてせっかくなら、同じ悩みを抱える方に使っていただきたい！',
      'そう思いたち、この「Share Your Smile」を作りました。',
      '是非ご活用いただき、忘れられない思い出の一助になれれば幸いです！😊'
    ],
    administrator: '運営者について',
    introductions: {
      name: 'Izuru Nomura',
      job: 'webエンジニア',
      detail: '主にフロントエンドの開発をしています。',
      tech: 'Vue.js / node.js / C++',
      lisence: '保有資格: AWS SAA'
    }
  }
}
</script>

<style scoped>

</style>