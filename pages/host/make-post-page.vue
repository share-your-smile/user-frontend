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

  async generateQrcode () {
    const hostInfo: any = this.$store.getters['host/getLoginUser'];
    const data = {
      url: `${process.env.POST_PAGE_BASE_URL}/participants/${hostInfo.id}`
    };
    console.log(data);

    const generateURL = `${process.env.USER_DATA_API_BASE_URL}/qrcode`;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }
    const res: any = await (await fetch(generateURL, options)).json();
    this.qrcodeSVG = res.result;
    console.log(res);
  }
}
</script>