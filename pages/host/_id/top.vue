<template>
  <div class="host_top_top">
    <!-- <v-container>
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
    </v-container> -->

    <how-to-use />

    <v-container>
      <v-row
        justify="center"
      >
        <sub-title
          v-bind:title="title.qrcode"
        />
      </v-row>

      <v-row

      >
        <v-col
          cols="12"
          md="6"
          lg="6"
          xl="6"
        >
          <v-card
            justify="center"
          >
            <v-card-title
              class="justify-center"
            >QRコードを参加者に配布してください</v-card-title>
            <div class="outer">
              <div style="width: 300px; height: 300px" v-html="qrcodeSVG"></div>
            </div>
          </v-card>
        </v-col>
        <v-col
          cols="12"
          md="6"
          lg="6"
          xl="6"
          class="outer"
        >
          <v-btn depressed
            rounded
            x-large
            color="primary"
            class="text-h5"
            style="font-family:'myFont'!important"
            id="download" download="sample.png" :href="blobURL"
          >
            QRコードをダウンロード
          </v-btn>
        </v-col>
      </v-row>

      <v-row
        justify="center"
      >
        <sub-title
          v-bind:title="title.slideShow"
        />
      </v-row>

      <v-row
        style="height:60px;"
      ></v-row>

      <v-row
        justify="center"
      >
        <v-btn
          depressed
          rounded
          x-large
          color="primary"
          class="text-h5"
          style="font-family:'myFont'!important"
          @click="goToSlideShow"
        >
          スライドショーを開始する！
        </v-btn>
      </v-row>

      <a :href="participantsURL">参加者ページ</a>
    </v-container>
  </div>
</template>

<script lang='ts'>
// 参加者画像投稿用ページへのアクセス先生成ページ
// Vuexでhostのidを取得し、
import Component from "vue-class-component";
import { Vue, Watch, Mixins } from "vue-property-decorator";

import HowToUse from "~/components/HowToUse.vue";

@Component({
  middleware: 'host-authenticated'
})
export default class MainPostPage extends Vue {
  qrcodeSVG = '' as string;
  qrcodePng = '' as string;
  blobURL = '' as string;
  participantsURL = '' as string;
  title: any = {
    qrcode: 'QR code',
    slideShow: 'Start SlideShow!'
  };
  

  created () {
    this.download();
    const hostInfo: any = this.$store.getters['host/getLoginUser'];
    this.participantsURL = `${location.origin}/host/${hostInfo.id}/participants`;
    this.generateQrcode();
  }

  getPostUrl () {
    const hostInfo: any = this.$store.getters['host/getLoginUser'];
    // return `${process.env.POST_PAGE_BASE_URL}/participants/${hostInfo.id}`;
    return `${location.origin}/host/${hostInfo.id}/participants`;
  }

  generateRequestBody (type: string) {
    const data = {
      type: type,
      url: this.getPostUrl()
    };
    return JSON.stringify(data);
  }

  generateOptions(type: string) {
    return {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: this.generateRequestBody(type)
    };
  }

  async requestQrcode (options: any) {
    const generateURL = `${process.env.USER_DATA_API_BASE_URL}/qrcode`;
    return await (await fetch(generateURL, options)).json();
  }

  async generateQrcode () {
    const res: any = await this.requestQrcode(this.generateOptions('svg'));
    this.qrcodeSVG = res.result;
    console.log(res);
  }

  async download () {
    const res: any = await this.requestQrcode(this.generateOptions('base64'));
    this.qrcodePng = `<img src="${res.result}">`;
    
    const test: string[] = res.result.split(',');
    const data: string = window.atob(test[1]);

    // "image/png"
    const mimeType: string = 'image/png';

    // バイナリからBlobを作成
    for( var i=0, l=data.length, content=new Uint8Array( l ); l>i; i++ ) {
      content[i] = data.charCodeAt( i ) ;
    }

    const blobData = new Blob( [ content ], {
      type: mimeType ,
    });
    this.blobURL = window.URL.createObjectURL(blobData);
    console.log(test);
  }

  goToSlideShow() {
    const hostInfo: any = this.$store.getters['host/getLoginUser'];
    this.$router.push(`slide-show/start`);
  }
}
</script>

<style scoped>
.host_top_top {
  font-family: 'myfont'!important;
}

.container {
  width: 100%;
}

.outer{
  display: flex;
  justify-content: center;
  align-items: center;
}

.colcol {
  background-color: yellowgreen;
}
</style>