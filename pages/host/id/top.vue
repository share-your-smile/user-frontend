<template>
  <div class="host_top_top">

    <v-container>

      <v-row
        justify="center"
      >
        <sub-title
          v-bind:title="title.slideShow"
        />
      </v-row>

      <v-row
        justify="center"
      >
        <v-btn
          depressed
          rounded
          x-large
          outlined
          color="primary"
          class="text-h5"
          style="font-family:'myFont'!important"
          @click="goToSlideShow"
        >
          スライドショーを開始する！
        </v-btn>
      </v-row>

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
            >このQRコードを参加者に配布してください</v-card-title>
            <div class="outer">
              <div
                class="outer qrcode-area"
                v-if="qrcodeSVG === ''"
              >
                <v-progress-circular
                  indeterminate
                  color="primary"
                />
              </div>
              <div
                v-else
                class="qrcode-area"
                v-html="qrcodeSVG"
              />
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
            outlined
            color="primary"
            class="text-h5"
            style="font-family:'myFont'!important"
            id="download" download="sample.png" :href="blobURL"
          >
            QRコードをダウンロード
          </v-btn>
        </v-col>
      </v-row>

      <!-- <a :href="participantsURL">参加者ページ</a> -->
    </v-container>
    
    <how-to-use />

  </div>
</template>

<script lang='ts'>
import Vue from 'vue'
import HowToUse from "~/components/HowToUse.vue"

export default Vue.extend({
  layout: 'host_default',
  middleware: 'host-authenticated',
  data () {
    return {
      qrcodePng: '' as string,
      blobURL: '' as string,
      title: {
        qrcode: 'QR code',
        slideShow: 'Start SlideShow!'
      }
    }
  },
  computed: {
    qrcodeSVG: {
      get () {
        return this.$store.getters['qrcode/svg']
      }
    },
    participantsURL: {
      get () {
        return this.$store.getters['qrcode/url']
      }
    }
  },
  created () {
    this.download()
    this.generateQrcode()
  },
  methods: {
    getPostUrl () {
      return `${location.origin}/participants/login/`;
    },

    generateOptions(type: string) {
      return {
        type: type,
        url: this.getPostUrl()
      };
    },

    async requestQrcode (options: any) {
      const generateURL = `${process.env.USER_DATA_API_BASE_URL}/qrcode`;
      if (options.type === 'svg') {
        await this.$store.dispatch('qrcode/fetchSvg', options);
      } else {
        await this.$store.dispatch('qrcode/fetchPng', options);
      }
    },

    async generateQrcode () {
      await this.requestQrcode(this.generateOptions('svg'));
    },

    async download () {
      try {
        await this.requestQrcode(this.generateOptions('base64'));
        const png = this.$store.getters['qrcode/png'];
        this.qrcodePng = `<img src="${png}">`;
        
        const test: string[] = png.split(',');
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
      } catch(err) {
        console.log(err);
      }
    },

    goToSlideShow() {
      // スライドショーは全部同じパスにする？
      this.$router.push(`../slide-show/start/`);
    }
  }
})
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

.qrcode-area {
  width: 300px;
  height: 300px;
}
</style>