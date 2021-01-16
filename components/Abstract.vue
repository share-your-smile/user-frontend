<template>
  <v-container>
    <v-row
      justify="center"
    >
      <sub-title
        v-bind:title="words.title"
      />
    </v-row>
    <v-row
      style="height:80px"
    />
    <v-row>
      <v-col
        cols=12
        md=6
        lg=6
        xl=6
      >
        <div
          v-html="words.description1"
        />
        <div
          v-html="words.description"
        />
      </v-col>
      <v-col
        cols=12
        md=6
        lg=6
        xl=6
      >
        <v-img
          src="/568004_s.jpg"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

import SubTitle from "~/components/SubTitle.vue";

@Component({})
export default class Abstract extends Vue {
  words: any = {
    title: "Share Your Smileとは",
    description1: "ブラウザだけでできるリアルタイムスライドショーアプリです。QRコードを配布するだけで撮った写真をその場でスライドショーに！<br>結婚式やイベントにご活用ください！",
    description: "PCとネット環境があれば、どこでも使用可能！<br>みんなが撮った写真をその場で共有して盛り上がろう。<br>参加者の手持ち無沙汰な時間を削減できます！",
  }
  
}
</script>

<style scoped>

</style>