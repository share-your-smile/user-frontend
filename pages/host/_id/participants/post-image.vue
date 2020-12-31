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

    <v-row>
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
      <v-spacer cols=6 />
      <v-col
        cols=6
        class="outer"
      >
        <v-file-input
          accept="image/*"
          label="写真を選択"
          prepend-icon="mdi-image"
          @change="selectedFile"
          ref="file"
          color="primary"
        />
      </v-col>
    </v-row>

    <!-- 撮影・選択された画像を表示する -->
    <v-row>
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
    </v-row>

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

  get isImage () {
    return (this.imageSrc === '') ? true : false;
  }

  created () {
    this.participantsName = this.$store.getters['participants/getLoginUser'];
    this.setName();
  }

  setName() {
    this.title.participants = this.$store.getters['participants/getLoginUser'];
  }

  startCamera() {
    console.log(`カメラ起動`);
  }

  async selectedFile(file: any) {
    console.log(file);
    if (file !== undefined && file !== null) {
      if (file.name.lastIndexOf('.') <= 0) return
      this.fr = new FileReader();
      // これでheicだろうがなんだろうがbase64データになる
      // this.fr.readAsArrayBuffer(file);
      this.fr.readAsDataURL(file);
      this.fr.addEventListener('load', this.loadedFile);
    }
  }

  async loadedFile () {
    // console.log(this.fr.result);
    // this.imageSrc = this.fr.result;

    this.imageSrc = this.fr.result;
    
  }

  async uploadFile () {
    const res = await this.$s3Connect.uploadImage('media', this.participantsName, this.fr.result);
    console.log(res);
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
</style>