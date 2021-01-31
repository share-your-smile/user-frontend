<template>
  <v-container>
      <div style="text-align:right"
        v-text="title.participants"
      />

    <v-row
      justify="center"
    >
      <sub-title v-bind:title="title.postImage" />
    </v-row>

    <v-row
      justify="center"
    >
      <v-col
        cols=3
        class="outer"
      >
        <v-file-input
          label="写真を選択"
          prepend-icon="mdi-camera"
          @change="selectedFile"
          hide-input
          ref="file"
          color="primary"
        />
      </v-col>
      <v-col
        cols=3
      >
        <v-btn
          :disabled="!editState"
          depressed
          @click="rotate('anti')"
          rounded
        >
          <v-icon>mdi-undo</v-icon>
        </v-btn>
      </v-col>
      <v-col
        cols=3
      >
        <v-btn
          :disabled="!editState"
          depressed
          @click="rotate('')"
          rounded
        >
          <v-icon>mdi-redo</v-icon>
        </v-btn>
      </v-col>
      <v-col
        cols=3
      >
        <v-btn
          :disabled="!editState"
          depressed
          @click="uploadImage"
          rounded
          color="primary"
        >
          <v-icon>mdi-cloud-upload</v-icon>
        </v-btn>
      </v-col>
    </v-row>

    <v-row
      style="width: 100%;height: 100px"
    ></v-row>

    <!-- 撮影・選択された画像を表示する -->
    <v-row>
      <v-col
        class="canvas_wrapper"
        :style="{width: imgFrame.width, height: frameHeight}"
        ref="canWrapper"
      >
        <v-layout
          align-content-center 
          justify-center
        >
          <v-img
            class="sample_box2_3"
            ref="thumbnail"
            :src="imageSrc"
            :max-width="imgFrame.width"
            :style="{ transform: rotateDegree, 'transform-origin': rotateVal.position}"
          ></v-img>
        </v-layout>
      </v-col>
    </v-row>

    <canvas v-show="false" ref="canvas" />

    <v-img
      v-show="false"
      ref="debug"
      :src="imageSrcDebug"
    ></v-img>

  </v-container>
</template>

<script lang='ts'>
// 画像投稿ページ
import Component from "vue-class-component";
import { Vue, Watch } from "vue-property-decorator";

import SubTitle from '~/components/SubTitle.vue';

@Component({
  layout: 'participants_default',
  middleware: 'participants-authenticated'
})
export default class PostImage extends Vue{
  // ミドルウェアでリダイレクトする
  participantsName: string = '';
  fr: any = '';
  imageSrc: string = '';
  // isImage: boolean = false;
  title: any = {
    postImage: '写真を投稿しよう！',
    takePicture: '撮影する',
    fileInput: '画像を選択',
    participants: ''
  }
  reader: any = '';
  canvasVal: any = {
    width: 100,
    height: 100
  };
  orientation: number = 0;
  rotateVal: any = {
    degree: 0,
    position: 'center'
  };
  imgFrame: any = {
    width: '100%',
    height: '100%'
  }
  editState: boolean = false;
  mainImage: any = '';
  befUploadImage: any = '';

  get refs(): any {
    // eslint-disable-next-line
    return this.$refs;
  }

  get isImage () {
    return (this.imageSrc === '') ? true : false;
  }

  get frameHeight() {
    return `${this.imgFrame.height}px`;
  }

  get rotateDegree() {
    return `rotate(${this.rotateVal.degree}deg)`;
  }

  created () {
    this.participantsName = this.$store.getters['participants/getLoginUser'];
    this.setName();
  }

  mounted() {
    this.canvasVal.width = this.refs.canWrapper.clientWidth;
    this.canvasVal.height = this.refs.canWrapper.clientHeight;
    console.log(this.refs.canWrapper.clientWidth);
    console.log(this.refs.canWrapper.clientHeight);
    this.imgFrame.height = this.refs.canWrapper.clientWidth;
  }

  setName() {
    this.title.participants = this.$store.getters['participants/getLoginUser'];
  }

  arrayBufferToDataURL(arrBuf: any) {
    const blob = new Blob([arrBuf], { type: 'image/jpeg' });
    return window.URL.createObjectURL(blob);
  }

  // maxを1000pxとして、サイズを補正する
  setCanvas(img: any) {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext('2d')!;
    const maxSize = 1000;
    if (img.width <= 1000 && img.height <= 1000) {
      canvas.width = img.width;
      canvas.height = img.height;
    } else if (img.width >= img.height) {
      canvas.width = maxSize;
      canvas.height = (maxSize * img.height) / img.width;
    } else {
      canvas.width = (maxSize * img.width) / img.height;
      canvas.height = maxSize;
    }
    
    ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);

    // キャンバスへの描画が終わったタイミングで、ボタンを触れるようにする
    this.editState = true;
  }

  loadedFile () {
    console.log(this.fr.result);
    // this.imageSrc = this.fr.result;

    this.mainImage = new Image();
    this.mainImage.src = this.arrayBufferToDataURL(this.fr.result);
    this.mainImage.addEventListener('load', () => {
      // widthが長いか、heightが長いかで、frameのheightの算出値が変わる
      console.log(`height ${this.mainImage.height}: width ${this.mainImage.width}`);
      if (this.mainImage.height >= this.mainImage.width) {
        this.imgFrame.height = (this.mainImage.height * this.canvasVal.width) / this.mainImage.width;
      } else {
        this.imgFrame.height = (this.mainImage.width * this.canvasVal.width) / this.mainImage.height;
      }
      console.log(this.imgFrame.height);
      this.imageSrc = this.mainImage.src;
      this.setCanvas(this.mainImage);
    })
    
  }

  async selectedFile(file: any) {
    console.log(file);

    if (file !== undefined && file !== null) {
      if (file.name.lastIndexOf('.') <= 0) return
      this.fr = new FileReader();
      // this.fr.readAsDataURL(file);
      this.fr.readAsArrayBuffer(file);
      this.fr.addEventListener('load', this.loadedFile);
    }
  }

  imageSrcDebug: any = '';

  rotate(direction: string) {
    if (direction === 'anti') {
      switch(this.rotateVal.degree) {
        case   0: this.rotateVal.degree = 270; break;
        case  90: this.rotateVal.degree =   0; break;
        case 180: this.rotateVal.degree =  90; break;
        case 270: this.rotateVal.degree = 180; break;
      }
    } else {
      switch(this.rotateVal.degree) {
        case   0: this.rotateVal.degree =  90; break;
        case  90: this.rotateVal.degree = 180; break;
        case 180: this.rotateVal.degree = 270; break;
        case 270: this.rotateVal.degree =   0; break;
      }
    }
  }

  async getImageData() {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext('2d')!;

    this.befUploadImage = await this.load(canvas.toDataURL());
    
    this.imageSrcDebug = this.befUploadImage.src;
    return this.befUploadImage.src;
  }

  load(url: any) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        resolve(img);
      };
      img.onerror = (e) => reject(e);
      img.src = url;
    });
  }


  async rotateCanvas(orientation: number) {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext('2d')!;

    let cw = canvas.width;
    let ch = canvas.height;
    
    let rotating = true;

    const myImageData: any = await this.load(canvas.toDataURL());

    // reset the canvas with new dimensions
    if ([5,6,7,8].indexOf(orientation) > -1) {
      canvas.width = myImageData.height;
      canvas.height = myImageData.width;
    } else {
      canvas.width = myImageData.width;
      canvas.height = myImageData.height;
    }
    switch (orientation) {
      case 2: ctx.transform(-1, 0, 0, 1, myImageData.width, 0); break;
      case 3: ctx.transform(-1, 0, 0, -1, myImageData.width, myImageData.height); break;
      case 4: ctx.transform(1, 0, 0, -1, 0, myImageData.height); break;
      case 5: ctx.transform(0, 1, 1, 0, 0, 0); break;
      case 6: ctx.transform(0, 1, -1, 0, myImageData.height, 0); break;
      case 7: ctx.transform(0, -1, -1, 0, myImageData.height, myImageData.width); break;
      case 8: ctx.transform(0, -1, 1, 0, 0, myImageData.width); break;
      default: break;
    }
    ctx.drawImage(myImageData, 0, 0);            
    ctx.restore();

    // clear the temporary image
    // myImageData = null;
    rotating = false;
  }

  async uploadFile (src: string) {
    // const res = await this.$s3Connect.uploadImage('media', this.participantsName, src);
    const params = {
      userId: 'media',
      poster: this.participantsName,
      image: src,
    };
    await this.$store.dispatch('imagesList/uploadImage', params);
  }

  refreshImages() {
    window.URL.revokeObjectURL(this.mainImage.src);
    window.URL.revokeObjectURL(this.befUploadImage.src);
  }

  // 画像のアップロード
  // ①現在の向きに合わせてcanvasをrotationする
  // ②canvas画像からbase64データを取得
  // ③base64データをアップロードする
  async uploadImage() {

    switch(this.rotateVal.degree) {
      case   0: await this.rotateCanvas(1); break;
      case  90: await this.rotateCanvas(6); break;
      case 180: await this.rotateCanvas(3); break;
      case 270: await this.rotateCanvas(8); break;
      default: break;
    }

    const imgSrc = await this.getImageData();
    
    try {
      await this.uploadFile(imgSrc);
      console.log('refresh OK!');
    } catch(err) {

    }

    // await this.refreshImages();

  }
};
</script>

<style scoped>
.outer {
  display: flex;
  justify-content: center;
  align-items: center;
}

.image_frame {
  width: inherit;
  height: inherit;
  border: solid;
  border-color: rgb(200,200,200);
  border-style: dashed;
}

.frame_icon {
  width: inherit;
  height: inherit;
  margin: 0px auto;
}

.canvas_wrapper {
  width: 100%;
  /* min-height: 300px;
  height: auto!important;
  height: 300px; */
  /* max-height: 100vh; */
}

.sample_box2_3 {
    padding: 1em 1.5em;
    margin: 2em 0;
    background-color: #ffc6c6;/*背景色*/
    box-shadow: 0 0 0 8px #ffc6c6;/*背景色外側*/
    border: 2px dashed #ffffff;/*線*/
    color: #000000;/*文字色*/
}
</style>