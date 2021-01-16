<template>
  <v-container>
    <v-row
      justify="center"
    >
      <sub-title
        v-bind:title="words.title"
      />
    </v-row>
      <v-col
        v-for="text in words.texts"
        :key="text"
      >
        <div v-text="text" />
      </v-col>
    <v-row>
      
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

import SubTitle from "~/components/SubTitle.vue";

@Component({})
export default class Requirement extends Vue {
  words: any = {
    title: "必要なもの",
    texts: [
      "写真共有用モニタorプロジェクター",
      "スライド表示用PC",
      "ネットワーク環境（スライド表示用PCをネットワークに接続するために必要です）",
    ]
  }
}
</script>

<style scoped>

</style>