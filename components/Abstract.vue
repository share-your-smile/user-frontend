<template>
  <v-container>
    <v-row
      justify="center"
    >
      <sub-title
        v-bind:title="words.title"
      />
    </v-row>
    <v-row>
      <v-col>
        
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
    description: "PCとネット環境があれば、どこでも使用可能！<br>みんなが撮った写真をその場で共有して",
  }
  
}
</script>

<style scoped>

</style>