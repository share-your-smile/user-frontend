<template>
  <v-container>
      <!-- <div style="text-align:right"
        v-text="`${title.participants} さん`"
      /> -->

    <v-row
      justify="center"
    >
      <div
        class="marker"
      >
        <h2
          class="moji"
          v-text="title.postImage"
        />
      </div>
    </v-row>

    

    <!-- <v-row>
      <v-btn @click="debug" style="z-index:800;"> debug button </v-btn>
    </v-row> -->

    <!-- <v-expand-x-transition> -->
    <v-dialog
      v-model="isShow"
      persistent
      transition="scroll-x-transition"
      max-width="500px"
    >
      <v-card
      >
        <div style="height:40px;" />
        <v-card-text
          style="font-family:'myFont!important"
          class="text-h3 text-center"
        >Nice Smile!</v-card-text>
        <!-- <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            text
            style="font-family:'myFont!important"
            @click="isShow = false"
          >
            Next Smile
          </v-btn>
        </v-card-actions> -->
      </v-card>
    </v-dialog>
    <!-- </v-expand-x-transition> -->

    <v-row
      justify="center"
    >
      <v-col
        cols=12
        class="outer"
        style="z-index:800;"
      >
        <v-file-input
          label="select smile"
          prepend-icon="mdi-camera"
          @change="selectedFile"
          ref="file"
          color="primary"
        />
      </v-col>
    </v-row>

    <!-- <v-row
      style="width: 100%;height: 100px"
    ></v-row> -->
    
    

    <!-- 撮影・選択された画像を表示する -->
    <div
      class="canvas_wrapper sample_box2_3"
      :style="{width: imgFrame.width, height: frameHeight}"
      style="position: relative;"
      ref="canWrapper"
    >
      <div class="operation-icon-container">     
        <v-btn
          :disabled="!editState"
          @click="rotate('anti')"
          fab
          small
          color="primary"
        >
          <v-icon dark>mdi-undo</v-icon>
        </v-btn>

        <v-btn
          :disabled="!editState"
          @click="rotate('')"
          fab
          small
          color="primary"
        >
          <v-icon>mdi-redo</v-icon>
        </v-btn>

        <v-btn
          :disabled="!editState"
          @click="uploadImage"
          color="primary"
          fab
          small
        >
          <v-icon>mdi-cloud-upload</v-icon>
        </v-btn>
      </div>

      <!-- <div> -->
        <div
          class="img-frame"
        >
          <v-img
            class=""
            ref="thumbnail"
            :src="imageSrc"
            :width="canvasVal.width"
            :height="canvasVal.width"
            contain
            :style="{ transform: rotateDegree, 'transform-origin': rotateVal.position}"
          >
            <template v-if="posting">
              <v-row
                class="fill-height ma-0"
                align="center"
                justify="center"
              >
                <v-progress-circular
                  color="primary"
                  indeterminate
                ></v-progress-circular>
              </v-row>
            </template>
          </v-img>
        </div>
      <!-- </div> -->
    </div>

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
import Vue from 'vue'

import SubTitle from '~/components/SubTitle.vue';

export default Vue.extend({
  layout: 'participants_default',
  middleware: 'participants-authenticated',
  data () {
    return {
      participantsName: '' as String,
      fr: '' as any,
      imageSrc: '' as String,
      // isImage: boolean = false;
      title: {
        postImage: '写真を投稿しよう！',
        takePicture: '撮影する',
        fileInput: '画像を選択',
        participants: ''
      },
      reader: '' as any,
      canvasVal: {
        width: 100,
        height: 100
      },
      orientation: 0 as Number,
      rotateVal: {
        degree: 0,
        position: 'center'
      },
      imgFrame: {
        width: '100%',
        height: '100%'
      },
      editState: false as Boolean,
      mainImage: '' as any,
      befUploadImage: '' as any,
      posting: false as Boolean,

      isShow: false as Boolean,
      imageSrcDebug: '' as any
    }
  },
  computed: {
    refs: {
      get (): any {
        // eslint-disable-next-line
        return this.$refs;
      }
    },
    isImage: {
      get  () {
        return (this.imageSrc === '') ? true : false;
      }
    },
    frameHeight: {
      get () {
        // return `${this.imgFrame.height}px`;
        const height = window.innerHeight - 250;
        return `${height}px`;
      }
    },
    rotateDegree: {
      get () {
        return `rotate(${this.rotateVal.degree}deg)`;
      }
    }
  },
  created () {
    this.participantsName = this.$store.getters['participants/getLoginUser'];
    this.setName();
  },
  mounted() {
    this.canvasVal.width = this.refs.canWrapper.clientWidth;
    this.canvasVal.height = this.refs.canWrapper.clientHeight;
    console.log(this.refs.canWrapper.clientWidth);
    console.log(this.refs.canWrapper.clientHeight);
    this.imgFrame.height = this.refs.canWrapper.clientWidth;
    window.scrollTo(0, 56);
    console.log(`inner height : ${window.innerHeight}`);
  },
  methods: {
    debug() {
      this.isShow = true;
      this.posting = true;
      setTimeout(function() {
        this.isShow = false;
        this.posting = false;
      }.bind(this), 2000);
    },
    setName() {
      this.title.participants = this.$store.getters['participants/getLoginUser'];
    },
    arrayBufferToDataURL(arrBuf: any) {
      const blob = new Blob([arrBuf], { type: 'image/jpeg' });
      return window.URL.createObjectURL(blob);
    },
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
    },
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
      
    },
    async selectedFile(file: any) {
      if (file) {
        console.log(file);

        if (file !== undefined && file !== null) {
          if (file.name.lastIndexOf('.') <= 0) return
          this.fr = new FileReader();
          // this.fr.readAsDataURL(file);
          this.fr.readAsArrayBuffer(file);
          this.fr.addEventListener('load', this.loadedFile);
        }
      } else {
        console.log('delete');
        this.deleteImageData();
      }
    },
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
    },
    async getImageData() {
      const canvas = this.refs.canvas;
      const ctx = canvas.getContext('2d')!;

      this.befUploadImage = await this.load(canvas.toDataURL());
      
      this.imageSrcDebug = this.befUploadImage.src;
      return this.befUploadImage.src;
    },
    load(url: any) {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => {
          resolve(img);
        };
        img.onerror = (e) => reject(e);
        img.src = url;
      });
    },
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
    },
    async uploadFile (src: string) {
      // const res = await this.$s3Connect.uploadImage('media', this.participantsName, src);
      const params = {
        userId: this.$store.getters['participants/getHostId'],
        poster: this.participantsName,
        image: src,
      };
      await this.$store.dispatch('imagesList/uploadImage', params);
    },
    refreshImages() {
      window.URL.revokeObjectURL(this.mainImage.src);
      window.URL.revokeObjectURL(this.befUploadImage.src);
    },
    deleteImageData() {
      // イメージの消去
      this.imageSrc = '';
      // canvas貼り付けようのURLオブジェクト削除
      window.URL.revokeObjectURL(this.mainImage.src);

      this.editState = false;
    },
    // 画像のアップロード
    // ①現在の向きに合わせてcanvasをrotationする
    // ②canvas画像からbase64データを取得
    // ③base64データをアップロードする
    async uploadImage() {

      this.posting = true;

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
        this.posting = false;
        this.deleteImageData();
        this.isShow = true;
        setTimeout(function() {
          this.isShow = false;
        }.bind(this), 2000);
      } catch(err) {

      }

    }
  }
})
</script>

<style scoped>
.outer {
  display: flex;
  justify-content: center;
  align-items: center;
}

.img-frame {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
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
  /* padding: 1em 1.5em;
  margin: 2em 0;
  background-color: #ffc6c6;
  box-shadow: 0 0 0 8px #ffc6c6;
  border: 2px dashed #ffffff;
  color: #000000; */
  border-radius: 5px;
  border: 1px solid;
  border-color: gray;
  background-color: 	#FFF9E6;
  /* box-shadow: 2px 2px 2px 2px rgba(0,0,0,0.4); */
}

.operation-icon-container {
  position: absolute;
  right: 5px;
  top: 5px;
  z-index: 600;
}

.marker {
  background: linear-gradient(to top, rgba(255,191,0,0.7) 0% 50%, rgba(0,0,0,0) 50% 100%);
  transform: rotate(-1deg);
}

.moji {
  transform: rotate(1deg);
}
</style>