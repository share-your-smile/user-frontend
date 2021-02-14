<template>
  <div>
    <!-- slide show -->
    <section v-if="isSlideShow" class="slides">

      <!-- <v-btn
        @click="debugAdd()"
        depressed
      >デバッグ</v-btn> -->

      <div class="slides_phrase">Share your smile!!</div>

      <section
        v-for="(image, index, key) in images"
        class="slide"
        v-bind:class="{'is-active' : image.active }"
        :key="key"
      >
        <div
          v-if="!image.finishShow"
          class="slide__content"
        >
          <figure
            class="slide__figure"
          >
            <div
              class="slide__img"
              v-bind:style="{ 'background-image': image.url, 'background-size': 'contain', 'background-repeat': 'no-repeat' }"
            />
            <!-- <img class="slide__img" :src="image.url"> -->
          </figure>
          <header
            class="slide__header"
          >
            <h2
              class="slide__title"
            >
              <span
                class="title-line"
              ><span>
                {{ image.name.last }}
                </span>
              </span>
              <!-- <span
                class="title-line"
              >
                <span>
                  {{ image.name.first }}
                </span>
              </span> -->
            </h2>
          </header>
        </div>
      </section>
    </section>

    <new-post @startSlideShow="startSlideShow" ref="refNewPost"></new-post>

  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import { Vue, Watch, Mixins } from "vue-property-decorator";
import NewPost from '~/components/NewPost.vue';


// スライドショー実行画面
@Component({})
export default class SlideMain extends Vue {
  showNum: number = -1; // 現在表示されている画像の番号
  isSlideShow: boolean = true; // スライドショー表示状態
  totalPostNum: number = 0; // 総画像枚数
  showNumber: number = 10; // ランダムに表示させる写真の枚数

  slideLoop: any = null; // スライド切り替えループ
  newPostLoop: any = null; // jsonチェックループ

  images: any[] = []; // 全画像データ

  image: any = { // 1枚の画像データ
    url: '',
    name: {
      last: '',
      first: ''
    },
    post_no: 0,
    active: false,
    finishShow: false
  };
  newPost: any = { // 新規投稿画像データ
    url: '',
    name: {
      last: '',
      first: ''
    }
  };
  listLen: number = 0;
  lowerNumber: number = 0;

  mounted () {
    this.startSlideShow()
  };

  beforeDestroy () {
    if (this.slideLoop != null) {
      console.log('slide loop')
      clearInterval(this.slideLoop)
    }
    if (this.newPostLoop != null) {
      console.log('new post loop')
      clearInterval(this.newPostLoop)
    }
  };

  get refs(): any {
    // eslint-disable-next-line
    return this.$refs;
  }

  async startSlideShow () {
    this.changeSlide();
    await this.getImageJson();
    this.isSlideShow = true;
    // change slide loop
    this.slideLoop = setInterval(function (this: SlideMain) { this.changeSlide() }.bind(this), 6000);
    // check new post loop
    this.newPostLoop = setInterval(function (this: SlideMain) { this.getImageJson() }.bind(this), 10000);
  };

  changeSlide () {
    if (this.images.length > 1) {
      // debug
      // this.nextSlide()
      var dispIndex = -1;
      var nowDispArryNum = 0;
      var nextDispArryNum = 0;

      // ①ランダム表示枚数の中で乱数を発生させる
      // ②現在の登録数
      if (this.images.length < this.showNumber) { // showNumber以下の登録数
        do {
          dispIndex = Math.floor(Math.random() * (this.images.length)) + 1;
        } while (dispIndex === -1 || dispIndex === this.showNum);
        console.log(dispIndex);
      } else {
        do {
          let random = Math.floor(Math.random() * (this.showNumber));
          // console.log(`random ${random}`);
          dispIndex = this.images.length - random;
          console.log(`dispIndex ${dispIndex}`);
        } while (dispIndex === -1 || dispIndex === this.showNum);
      }

      for (let arryNum = 0; arryNum < this.images.length; arryNum++) {
        if (this.images[arryNum].post_no + 1 - this.lowerNumber === dispIndex) { // 新しく表示するものをtrueに
          // console.log('next disp : ' + arryNum)
          nextDispArryNum = arryNum
        } else if (this.images[arryNum].post_no + 1 - this.lowerNumber === this.showNum) { // これまで表示されていたものはfalseに
          // console.log('hide disp : ' + arryNum)
          nowDispArryNum = arryNum
        }
      }
      this.images[nowDispArryNum].active = false;
      this.images[nextDispArryNum].active = true;
      this.showNum = dispIndex;
      // console.log(this.images[dispIndex].islongwidth)
      this.changeAction()
    } else if (this.images.length === 1) {
      this.images[0].active = true;
    }
  };

  async getImageJson () {
    try {
      await this.$store.dispatch('imagesList/getImagesList', 'resized');
      const list = this.$store.getters['imagesList/getList'];
      await this.setImages(list);
      this.listLen = list.length;
    } catch {
      
    }
  };

  debugAdd() {
    const debugList: any = [
      "resized-media/20201206015942_testuser.png",
      "resized-media/20201206111259_testuser.png",
      "resized-media/20201206115533_testuser.png",
      "resized-media/20201206173714_testuser.jpeg",
      "resized-media/20201206195957_testuser.png",
      "resized-media/20201206215113_testuser.jpeg",
      "resized-media/20201206220016_testuser.jpeg",
      "resized-media/20201214120702_test.jpeg",
      "resized-media/20201214122545_test.jpeg",
      "resized-media/20201218180741_gorigori-kun.jpeg",
      "resized-media/20201218180752_gorigori-kun.jpeg",
      "resized-media/20210102145533_test.png",
      "resized-media/20210102154326_test.png",
      "resized-media/20210102161238_test.png",
      "resized-media/20210102162125_なは.png",
      "media/20210102161238_test.png",
      "media/20210102162125_なは.png",
    ];
    this.setImages(debugList);
  }

  async setImages (data: string[]) {
    // imagesに既に値が格納されているか？
    if (this.listLen === 0) { // initialize images
      const results = [];
      this.lowerNumber = (data.length > this.showNumber) ? (data.length - this.showNumber) : 0;
      console.log(`lower number ${this.lowerNumber}`);
      for (let i = this.lowerNumber; i < data.length; i++) {
        results.push(this.setImageInfo(data[i], i));
      }
      await Promise.all(results);
      console.log('loading finish');

      // set the first image
      let firstShowNum = 0
      if (this.showNumber > this.images.length) {
        firstShowNum = 0;
      } else {
        firstShowNum = this.images.length - this.showNumber - 1;
      }
      // 最初に表示するスライドを設定 + 表示枚数以上だった場合、古いものはすべて表示終了に倒す
      for (let arryNum = 0; arryNum < this.images.length; arryNum++) {
        if (this.images[arryNum].post_no === firstShowNum) {
          this.images[arryNum].active = true;
          this.showNum = firstShowNum;
        } else if (this.images[arryNum].post_no <= firstShowNum) {
          this.images[arryNum].finishShow = true;
        }
      }
    } else { // update images
      console.log(`list length ${this.listLen}: data length ${data.length}`);
      if (this.listLen < data.length) {
        this.addImages(data);
      }
    }
  };

  async addImages (imageFiles: any) {
    // console.log('add images')

    // 複数枚が更新された場合を想定し、更新された画像データは一旦配列に格納する
    let unregisterdImages: any = [];
    let oldestImageNumbers: number[] = [];
    let newImages: any = [];

    // fileNamesの末尾から新しく取得された分を取得する
    for(let i = imageFiles.length; i > this.listLen; i--) {
      let unregisterdImage = {
        imageFile: imageFiles[i-1],
        num: i-1
      };
      unregisterdImages.push(unregisterdImage);
    }

    for(let i = 0; i < this.images.length; i++) {
      console.log(`[${i}]:post_no${this.images[i].post_no}`);
    }

    const threshold = imageFiles.length - this.showNumber;
    // 古い分を取得する
    for(let i = 0; i < this.images.length; i++) {
      if (this.images[i].post_no < threshold) {
        oldestImageNumbers.push(i);
        console.log(this.images[i].post_no);
      }
    }

    console.log(unregisterdImages);
    console.log(oldestImageNumbers.sort());

    // showNumber以下の場合の条件分岐を足す。

    // 新規で追加された画像と、削除予定の画像数が正しければ、次の処理にすすむ
    if (unregisterdImages.length === oldestImageNumbers.length) {
      // 古い分を削除
      for(let i = oldestImageNumbers.length; i > 0; i--) {
        this.images.splice(oldestImageNumbers[i-1], 1);
      }

      this.images.forEach((image: any) => {
        console.log(image.post_no);
      });

    }

    for(let i = 0; i < unregisterdImages.length; i++) {
      const image = await this.setImageInfo(unregisterdImages[i].imageFile, unregisterdImages[i].num);
      newImages.push(image);
    }

    console.log(newImages);

    this.refs.refNewPost.setNewImagesInfo(newImages);
    this.showNewPost();

  };

  loadDataURI(fileData: any) {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (e) => reject(e);
      fileReader.readAsDataURL(fileData);
    })
  }

  // 画像のタイトルから、名前とファイルパスを取得する
  async setImageInfo (fileName: string, no: number) {
    let names = fileName.split('/');

    if (names[1].indexOf('_') !== -1) {
      // const fileData = await this.$s3Connect.getImage(names[0], names[1]);
      const params = {
        userId: names[0],
        fileName: names[1],
        isResizedBucket: false,
      }
      const fileData = await this.$store.dispatch('imagesList/fetchImage', params);
      // const fileDataUrl = URL.createObjectURL(fileData);
      const fileDataURI = await this.loadDataURI(fileData);

      const tmpName = names[1].split('_')[1];
      const posterName = tmpName.split('.')[0];
      let image = {
        url: `url("${fileDataURI}")`,
        // url: 'assets/slideImg/' + d_image.src,
        name: {
          last: posterName,
          first: no
        },
        post_no: no,
        active: false,
        finishShow: false
      }
      this.images.push(image);
      console.log(`${no} done`);
      return image;
    }
  };

  showNewPost () { // start new post enter animation
    this.isSlideShow = false
    this.stopSlide()
  };

  changeAction () {
    document.body.classList.add('is-sliding')

    setTimeout(function () {
      document.body.classList.remove('is-sliding')
    }, 1000)
  };

  stopSlide () {
    clearInterval(this.slideLoop)
    clearInterval(this.newPostLoop)
  };
  
}
</script>

<style>
.slides-nav {
  z-index: 99;
  /* position: fixed; */
  position: absolute;
  top: 0px;
  right: 0px;
  /* width: 20%; */
  display: flex;
  align-items: center;
  height: 100%;
  color: #111;
}
@media (min-width: 54em) {
  .slides-nav {
    /* right: 2%; */
  }
}
.slides-nav__nav {
  position: relative;
  right: 0;
  display: block;
  font-size: 1em;
  transform: rotate(90deg);
  transform-origin: center;
}
.slides-nav button {
  position: relative;
  display: inline-block;
  padding: 0.35em;
  margin: 0;
  font-family: "Space Mono", monospace;
  appearance: none;
  background: transparent;
  border: 0;
  overflow-x: hidden;
  transition: color 0.5s ease;
}
.slides-nav button:after {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  height: 1px;
  width: 0;
  background: #111;
  transition: width 0.4s ease;
}
.slides-nav button:hover {
  cursor: pointer;
  color: rgba(17, 17, 17, 0.75);
  transition: color 0.5s ease;
}
.slides-nav button:hover:after {
  width: 100%;
  transition: width 0.4s ease;
}
.slides-nav button:focus {
  outline: 0;
}
.is-sliding .slides-nav {
  pointer-events: none;
}

.slides {
  position: relative;
  display: block;
  height: 100vh;
  /* height: 100%; */
  width: 100%;
  /* width: 80%; */
  background: linear-gradient(-135deg, #E4A972, #9941D8);
  transition: background 1s cubic-bezier(0.99, 1, 0.92, 1);
}
.is-sliding .slides {
  /* background: #ededed; */
  transition: background 0.3s cubic-bezier(0.99, 1, 0.92, 1);
}

.slides_newpost {
  z-index: 990;
}

.slide {
  z-index: -1;
  padding: 0;
  position: absolute;
  width: 100%;
  /* width: 80%; */
  height: 100vh;
  transition: z-index 1s ease;
}
.slide.is-active {
  z-index: 19;
  transition: z-index 1s ease;
}
.slide__content {
  position: relative;
  margin: 0 auto;
  height: 95%;
  width: 95%;
  top: 2.5%;
}
@media (min-width: 54em) {
  .slide__content {
    height: 85%;
    width: 85%;
    top: 7.5%;
  }
}
.new_slide__content {
  position: relative;
  margin: 0 auto;
  height: 95%;
  width: 95%;
  top: 2.5%;
}
@media (min-width: 54em) {
  .new_slide__content {
    height: 80%;
    width: 80%;
    top: 10%;
  }
}
.slide__header {
  z-index: 9;
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  overflow-y: hidden;
  transform: translateX(5%);
}
@media (min-width: 54em) {
  .slide__header {
    transform: translateX(-5%);
  }
}
.slide__header_new {
  text-align: right;
  transform: translate(-3%, 0);
  align-items: baseline;
  padding: 2%;
}
@media (min-width: 54em) {
  .slide__header_new {
    transform: translate(3%, -3%);
  }
}
.slide__title {
  /* font-family: Montserrat, helvetica; */
  font-size: 2.5em;
  font-weight: 700;
  color: #111;
  overflow-y: hidden;
  text-shadow: 1px 1px 0 #a0a0a0,
               -1px 1px 0 #a0a0a0,
               1px -1px 0 #aaa,
               -1px -1px 0 #aaa;
}
@media (min-width: 54em) {
  .slide__title {
    font-size: 5em;
  }
}
.slide__title .title-line {
  display: block;
  overflow-y: hidden;
}
.slide__title .title-line span {
  display: inline-block;
  transform: translate3d(0, 140%, 0);
  opacity: 0;
  transition: transform 0.4s ease, opacity 0.8s ease;
}
.slide__title .title-line span:nth-child(1) {
  transition-delay: 0.15s;
}
.slide__title .title-line span:nth-child(2) {
  transition-delay: 0.3s;
}
.is-active .slide__title .title-line span {
  transform: translate3d(0, 0%, 0);
  opacity: 1;
  transition: transform 0.6s cubic-bezier(0.77, 0, 0.175, 1), opacity 0.1s ease;
}
.is-active .slide__title .title-line:nth-of-type(2n) span {
  transition-delay: 0.2s;
}
.slide__figure {
  z-index: 7;
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 auto;
  height: 100%;
  width: 100%;
  transition: transform 0.5s cubic-bezier(0.19, 1, 0.22, 1);
}
.is-sliding .slide__figure {
  transform: scale(0.8);
  transition: transform 0.5s cubic-bezier(0.19, 1, 0.22, 1);
}
.slide__img {
  position: relative;
  display: block;
  background-size: cover;
  background-attachment: fixed;
  background-position: 50%;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  height: 0%;
  width: 100%;
  filter: grayscale(0%);
  transition: height 1s 1.4s cubic-bezier(0.19, 1, 0.22, 1), filter 0.4s 0.1s ease;
}
.is-active .slide__img {
  height: 100%;
  opacity: 1;
  transition: height 0.5s 0.3s cubic-bezier(0.77, 0, 0.175, 1), filter 0.4s 0.1s ease;
}
.is-sliding .slide__img {
  filter: grayscale(100%);
}
.slides_phrase {
  padding: 0.5%;
  position: absolute;
  color: lightgray;
  top: 0px;
  right: 0px;
  font-size: 3.7em;
}
</style>