<template>
  <div>
    <h1>ホスト用ページ</h1>
    <h2>下記のQRコードを参加者に配布してください</h2>
    <v-btn depressed
      outlined
      rounded
      color="primary"
      @click="generateQrcode"
    >
      Generate QRcode
    </v-btn>
    <div style="background-color:white;">
      <div style="width: 300px;" v-html="qrcodeSVG"></div>  
    </div>
    <a id="download" download="sample.png" :href="blobURL">ダウンロード</a>
    <a :href="participantsURL">参加者ページ</a>
  </div>
</template>

<script lang='ts'>
// 参加者画像投稿用ページへのアクセス先生成ページ
// Vuexでhostのidを取得し、
import Component from "vue-class-component";
import { Vue, Watch, Mixins } from "vue-property-decorator";

@Component({
  middleware: 'host-authenticated'
})
export default class MainPostPage extends Vue {
  qrcodeSVG = '' as string;
  qrcodePng = '' as string;
  blobURL = '' as string;
  participantsURL = '' as string;

  created () {
    this.download();
    const hostInfo: any = this.$store.getters['host/getLoginUser'];
    this.participantsURL = `${location.origin}/participants/${hostInfo.id}`;
  }

  getPostUrl () {
    const hostInfo: any = this.$store.getters['host/getLoginUser'];
    // return `${process.env.POST_PAGE_BASE_URL}/participants/${hostInfo.id}`;
    return `${location.origin}/participants/${hostInfo.id}`;
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
}
</script>