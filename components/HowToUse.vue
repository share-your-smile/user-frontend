<template>
  <v-container>
    <v-row
      justify="center"
    >
      <sub-title
        v-bind:title="title.howTo"
      />
    </v-row>
    <v-spacer></v-spacer>

    <v-row
      justify="center"
    >
      <v-col
        cols="12"
        md="4"
        lg="4"
        xl="4"
        v-for="index in procedure"
        :key="index"
      >
        <v-card
          height="250px"
        >
          <v-card-title
            
          >
            {{index}}
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";

import SubTitle from '~/components/SubTitle.vue';

@Component({})
export default class HowToUse extends Vue {
  procedure: string[] = [
    "QRコードを参加者に配布",
    "スライドショーを開始",
    "投稿した写真が表示されます！"
  ];
  title: any = {
    howTo: 'How to Use'
  };
}
</script>

<style scoped>

</style>