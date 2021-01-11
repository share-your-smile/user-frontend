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
      v-for="index in procedure"
      :key="index"
    >
      <v-col
        cols="12"
        md="6"
        lg="6"
        xl="6"
        class="centering"
      >
        <!-- <v-card
          height="250px"
        >
          <v-card-title
            style="text-align:center;"
          > -->
          <div class="title_size">{{index.title}}</div>
          <!-- </v-card-title>
        </v-card> -->
      </v-col>
      <v-col
        cols="12"
        md="6"
        lg="6"
        xl="6"
      >
        <v-card
          width="100%"
          class="centering"
        >
          <v-img
            class="img_frame"
            :src="index.src"
          />
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
  procedure: any = [
    {
      title: "①：QRコードを参加者に配布",
      src: '/howToUse/4223371.jpg'
    },
    {
      title: "②：イベントをスタート！",
      src: '/howToUse/20943684.jpg'
    },
    {
      title: "③：投稿した写真が表示されます！",
      src: '/howToUse/howtouse2.jpg'
    }
  ];
  title: any = {
    howTo: 'How to Use'
  };

  mounted() {

  }
}
</script>

<style scoped>
.centering {
  display: flex;
  /* justify-content: center; */
  align-items: center;
}

.title_size {
  font-size: 25px;
}

.img_frame {
  margin: 10px;
  width: calc(100% - 20px);
}
</style>