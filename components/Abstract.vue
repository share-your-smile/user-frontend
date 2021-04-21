<template>
  <v-container>
    <v-row
      justify="center"
    >
      <sub-title
        v-bind:title="words.title"
      />
    </v-row>
    
    <template v-if="$device.isMobile">
      <template v-for="(description, index) in descriptions">
        <v-row
          :key="`message ${index}`"
          justify="center"
          align="center"
        >
          <message :text="description.text" />
        </v-row>
      </template>
      <v-row
        justify="center"
        align="center"
      >
        <sample-image :img="descriptions[0].img" />
      </v-row>
    </template>

    <template v-else>
      <template v-for="(description, index) in descriptions">
        <v-row
          :key="index"
          justify="center"
          align="center"
        >
          <!-- <v-col
            cols=12
            md=6
            lg=6
            xl=6
          >
            <div v-if="index % 2 === 0"
              v-html="description.text"
            />
            <div v-else>
              <v-img class="waku02 rotate01"
                width="500"
                height="300"
                :src="description.img"
              />
            </div>
          </v-col>
          <v-col
            cols=12
            md=6
            lg=6
            xl=6
          >
            <div v-if="index % 2 === 0">
              <v-img class="waku02 rotate01"
                width="500"
                height="300"
                :src="description.img"
              />
            </div>
            <div v-else
              v-html="description.text"
            />
          </v-col> -->
          <template v-if="index % 2 === 0">
            <message :text="description.text" />
            <sample-image :img="description.img" />
          </template>
          <template v-else>
            <sample-image :img="description.img" />
            <message :text="description.text" />
          </template>
        </v-row>
      </template>
    </template>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

import SubTitle from "~/components/SubTitle.vue";
import Message from '~/components/abstract/Message.vue';
import SampleImage from '~/components/abstract/SampleImage.vue';

@Component({
  components: {
    SubTitle,
    Message,
    SampleImage,
  }
})
export default class Abstract extends Vue {
  words: any = {
    title: "Share Your Smileとは",
  };
  
  descriptions: any = [
    {
      text: 'ブラウザだけでできる<strong>リアルタイムスライドショーアプリ</strong>です。<br>QRコードを配布するだけ！撮った写真をその場でスライドショーに！',
      img: '/abstract/1.jpg'
    },
    {
      text: '<strong>結婚式</strong>や<strong>イベント</strong>にご活用ください！',
      img: '/abstract/2.jpg',
    },
    {
      text: 'PCとネット環境があれば、どこでも使用可能！<br>みんなが撮った写真をその場で共有して盛り上がろう。',
      img: '/abstract/3.jpg',
    }
  ];
}
</script>

<style scoped>

</style>