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
      <!-- <v-col
        cols=6
        class="outer"
      >
          <v-icon
            left
          >
            mdi-camera
          </v-icon>
        <v-btn
          depressed
          small
          rounded
          text
          color="accent"
          class="text-body-1"
          style="font-family:'myFont'!important"
          v-text="title.takePicture"
        >
        </v-btn>
      </v-col> -->
      <!-- <v-spacer cols=6 /> -->
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

    <!-- <canvas
      :width="canvasVal.width"
      :height="canvasVal.height"
      ref="canvas" 
    /> -->

    <canvas v-show="true" ref="canvas" />

    <v-img
      ref="debug"
      :src="imageSrcDebug"
    ></v-img>

    <!-- <v-row>
      <v-col
        style="height:400px;"  
      >
        <div
          class="image_frame outer"
          @click="startCamera"
        >
          <v-row
            justify="center"
          >
            <v-col
            >
              <div
                class="frame_icon"
              >
                <v-icon
                  left
                  x-large
                  class="frame_icon"
                  style="color:rgb(200,200,200);"
                >
                  mdi-camera
                </v-icon>
              </div>
              <div class="frame_icon"
                  style="text-align:center;">
                <span
                  style="color:rgb(200,200,200);"
                  v-text="title.takePicture"
                />
              </div>
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row> -->

    <!-- <v-container>
      <v-row>
        <v-col>
          <v-file-input
            accept="image/*"
            label="写真を選択"
            prepend-icon="mdi-image"
            @change="selectedFile"
            ref="file"
          >
            
          </v-file-input>
        </v-col>
        <v-col>
          <v-btn
            depressed
          >
            撮影する
          </v-btn>
          <v-btn
            depressed
            :disabled="isImage"
            @click="uploadFile"
          >
            画像を投稿する
          </v-btn>
        </v-col>
      </v-row>
      <v-row
        justify="center"
        align-content="center"
        style="height: 600px;"
      >
        <v-col
          outlined
          style="border: solid; height:inherit"
        justify="center"
        align-content="center"
        >
          <v-layout
            align-content-center 
            justify-center
          >
            <v-img
              ref="debugImg"
              :src="imageSrc"
              max-width="600"
            ></v-img>
          </v-layout>
        </v-col>
      </v-row>
    </v-container> -->
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

  startCamera() {
    console.log(`カメラ起動`);
  }

  getOrientation(buffer: ArrayBuffer) {
    const dv = new DataView(buffer);
    if (dv.getUint16(2) !== 65505) {
      return 0;
    }
    const littleEndian = dv.getUint8(12) === 73;
    const count = dv.getUint16(20, littleEndian);
    for (let i = 0; i < count; i++) {
      const start = 22 + i * 12;
      const tag = dv.getUint16(start, littleEndian);
      if (tag === 274) {
        const value = dv.getUint16(start + 8, littleEndian);
        return value;
      }
    }
    return 0;
  }

  arrayBufferToDataURL(arrBuf: any) {
    const blob = new Blob([arrBuf], { type: 'image/jpeg' });
    return window.URL.createObjectURL(blob);
  }

  embedImageTag(dataURL: any) {
    const img = new Image();
    img.src = dataURL;
    img.width = 200;
    document.body.appendChild(img);
    console.log(dataURL);
    return img;
  }

  createTransformedCanvas(orientation: number, img: any) {
    // const canvas = document.createElement('canvas');
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext('2d')!;
    const scaleRate = this.refs.canWrapper.clientWidth / img.width;
    const scaleHeight = scaleRate * img.height;
    if ([5,6,7,8].indexOf(orientation) > -1) {
      // canvas.width = img.height;
      // canvas.height = img.width;
      canvas.width = this.canvasVal.width;
      canvas.height = scaleHeight;
    } else {
      // canvas.width = img.width;
      // canvas.height = img.height;
      canvas.width = this.canvasVal.width;
      canvas.height = scaleHeight;
    }
    switch (orientation) {
      case 2: ctx.transform(-1, 0, 0, 1, img.width, 0); break;
      case 3: ctx.transform(-1, 0, 0, -1, img.width, img.height); break;
      case 4: ctx.transform(1, 0, 0, -1, 0, img.height); break;
      case 5: ctx.transform(0, 1, 1, 0, 0, 0); break;
      case 6: ctx.transform(0, 1, -1, 0, img.height, 0); break;
      case 7: ctx.transform(0, -1, -1, 0, img.height, img.width); break;
      case 8: ctx.transform(0, -1, 1, 0, 0, img.width); break;
      default: break;
    }

    
    // // ctx.scale(scaleRate, scaleRate);

    // canvas.width = this.canvasVal.width;
    // canvas.height = scaleHeight;
    // this.canvasVal.height = scaleHeight;

    // console.log(this.refs.canWrapper.clientWidth);
    // ctx.scale(1, 1);
    ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, this.refs.canWrapper.clientWidth, scaleHeight);
    // ctx.drawImage(img, 0, 0);
    return canvas;
  }

  getExif(img: any) {
    console.log(img);
    // EXIF.getData(img, () => {
    //   console.log(img.exifdata);
    //   const orientation = img.exifdata.Orientation;
    //   console.log(`orientation ${orientation}`);
    //   console.log(img);
    //   const canvas = this.createTransformedCanvas(orientation, img);
    //   window.URL.revokeObjectURL(img.src);
    //   this.imageSrc = canvas.toDataURL('image/jpeg');
    // })
  }

  loadedFileOri() {
    console.log(this.reader.result);

    // const orientation = this.getOrientation(this.reader.result);
    const img = new Image();
    img.src = this.arrayBufferToDataURL(this.reader.result);
    img.addEventListener('load', async () => {
      this.getExif(img);
    })
    

    // if (orientation === 0 || orientation === 1) {
    //   const data = this.arrayBufferToDataURL(this.reader.result);
    //   const img = this.embedImageTag(data);
    //   img.addEventListener('load', () => {
    //     window.URL.revokeObjectURL(data);
    //   })
    // } else {

      // const img = new Image();
      // img.src = this.arrayBufferToDataURL(this.reader.result);
      // img.addEventListener('load', async () => {
      //   const canvas = this.createTransformedCanvas(orientation, img);
      //   window.URL.revokeObjectURL(img.src);
      //   this.imageSrc = canvas.toDataURL('image/jpeg');
      //   // console.log(canvas.toDataURL('image/jpeg'));
      //   // this.embedImageTag(canvas.toDataURL('image/jpeg'));
      // })
    // }
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

    // if (file !== undefined && file !== null) {
    //   this.reader = new FileReader();
    //   this.reader.addEventListener('load', this.loadedFileOri);
    //   this.reader.readAsArrayBuffer(file);
    // }
  }

  imageSrcDebug: any = '';

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
    // store current data to an image
    // const myImageData: any = new Image();
    // myImageData.src = canvas.toDataURL();

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

    // if ([5,6,7,8].indexOf(orientation) > -1) {
    //   canvas.width = img.height;
    //   canvas.height = img.width;
    // } else {
    //   canvas.width = img.width;
    //   canvas.height = img.height;
    // }
    // switch (orientation) {
    //   case 2: ctx.transform(-1, 0, 0, 1, img.width, 0); break;
    //   case 3: ctx.transform(-1, 0, 0, -1, img.width, img.height); break;
    //   case 4: ctx.transform(1, 0, 0, -1, 0, img.height); break;
    //   case 5: ctx.transform(0, 1, 1, 0, 0, 0); break;
    //   case 6: ctx.transform(0, 1, -1, 0, img.height, 0); break;
    //   case 7: ctx.transform(0, -1, -1, 0, img.height, img.width); break;
    //   case 8: ctx.transform(0, -1, 1, 0, 0, img.width); break;
    //   default: break;
    // }
    // ctx.drawImage(img, 0, 0);
  }

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

  canRotate(direction: string) {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext('2d')!;

    let cw = canvas.width;
    let ch = canvas.height;
    
    let rotating = true;            
    // store current data to an image
    let myImageData: any = new Image();
    myImageData.src = canvas.toDataURL();

    myImageData.onload = function () {
        // reset the canvas with new dimensions
        canvas.width = ch;
        canvas.height = cw;
        cw = canvas.width;
        ch = canvas.height;

        ctx.save();

        console.log(`${cw} ${ch}`);
        // translate and rotate
        // ctx.translate(cw / 2, ch / 2);
        if (direction === 'redo') {
          ctx.translate(cw, ch / cw);
          ctx.rotate(Math.PI / 2);
        } else if(direction === 'undo') {
          console.log('undo');
          ctx.translate(cw / ch, ch);
          ctx.rotate(3/2 * Math.PI);
        }
        // draw the previows image, now rotated
        ctx.drawImage(myImageData, 0, 0);               
        ctx.restore();

        // clear the temporary image
        myImageData = null;

        rotating = false;               
    }
  }

  async uploadFile (src: string) {
    const res = await this.$s3Connect.uploadImage('media', this.participantsName, src);
    console.log(res);
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
    console.log('get data');
    console.log(this.rotateVal.degree);

    switch(this.rotateVal.degree) {
      case   0: await this.rotateCanvas(1); break;
      case  90: await this.rotateCanvas(6); break;
      case 180: await this.rotateCanvas(3); break;
      case 270: await this.rotateCanvas(8); break;
      default: break;
    }

    const imgSrc = await this.getImageData();
    
    await this.uploadFile(imgSrc);

    // await this.refreshImages();

    console.log('refresh OK!');
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