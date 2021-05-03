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
import Vue from 'vue'

export default Vue.extend({
  data () {
    return {
      words: {
        title: "必要なもの" as String,
        texts: [
          "写真共有用モニタorプロジェクター" as String,
          "スライド表示用PC" as String,
          "ネットワーク環境（スライド表示用PCをネットワークに接続するために必要です）" as String,
        ]
      }
    }
  }
})
</script>

<style scoped>

</style>