<template>
  <div>
    <h1>Post Image</h1>
    <v-container>
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
    </v-container>
  </div>
</template>

<script lang='ts'>
// 画像投稿ページ
import Component from "vue-class-component";
import { Vue, Watch } from "vue-property-decorator";

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

  get isImage () {
    return (this.imageSrc === '') ? true : false;
  }

  created () {
    this.participantsName = this.$store.getters['participants/getLoginUser'];
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