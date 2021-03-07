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

    <!-- <v-row
      justify="center"
      v-for="index in procedures"
      :key="index.title"
    >
      <v-col
        cols=12
        md=6
        lg=6
        xl=6
        class="centering"
      >
        <div class="title_size">{{index.title}}</div>
      </v-col>
      <v-col
        cols=12
        md=6
        lg=6
        xl=6
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
    </v-row> -->

    <v-row>
      <v-col
        v-for="procedure in procedures"
        :key="procedure.title"
        col=12
        md=4
        lg=4
        xl=4
      >
        <v-card>
          <v-card-title>{{procedure.title}}</v-card-title>
          <v-card-text
            v-html="procedure.text"
          />
          <div style="padding:30px 0px">
            <v-img
              :src="procedure.src"
            />
          </div>
        </v-card>
      </v-col>
    </v-row>

    <v-row>
      <div style="margin: 0 0 0 auto">
        <a class="text-caption" href="http://www.freepik.com">Designed by pikisuperstar,pch.vector / Freepik</a>
      </div>
    </v-row>
  </v-container>
</template>

<script lang='ts'>
import { Vue, Component } from "vue-property-decorator";

import SubTitle from '~/components/SubTitle.vue';

@Component({})
export default class HowToUse extends Vue {
  procedures: any = [
    {
      title: "QRコードを共有" as string,
      text: "QRコードをダウンロードして招待状に載せたり、イベント会場に貼り出しましょう。" as string,
      src: '/howToUse/share.jpg' as string
    },
    {
      title: "写真を投稿" as string,
      text: "出席者の皆さんに、その場で撮った写真や思い出の写真などを投稿してもらいましょう。" as string,
      src: '/howToUse/post.png' as string
    },
    {
      title: "写真が共有されます" as string,
      text: "投稿された写真が順次表示されます！みんなが楽しめる素敵な会を演出しましょう！" as string,
      src: '/howToUse/show.png' as string
    }
  ];
  title: any = {
    howTo: '使い方' as string
  };

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
</style>