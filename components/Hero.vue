<template>
  <div
    class="back"
  >
    <v-container
      style="height:100%;"
      class="center"
    >
      <!-- <v-row
        justify="center"
      >
        <div
          class="descri"
          v-html="description"
        ></div>
      </v-row> -->
      <div style="height:100%">
      <v-row
        justify="center"
        style="height:40%"
      >
        <v-col
          cols=6
          class="center"
        >
        <v-img
          src="/logo/main_logo.png"
        />
        </v-col>
      </v-row>
      <v-row
        class="title-mergin"
      />
      <v-row
        justify="center"
        style="height:20%"
      >
        <v-col
          class="center"
        >
          <v-btn
            x-large
            depressed
            color="primary"
            rounded
            v-text="btn_dscr"
            @click="goRegister"
          />
        </v-col>
      </v-row>
      </div>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';

@Component({})
export default class Hero extends Vue {
  description: string = "ブラウザだけでできるリアルタイムスライドショーアプリです。<br>QRコードを配布するだけで撮った写真をその場でスライドショーに！<br>結婚式やイベントにご活用ください！"
  btn_dscr: string = "シェアする！";

  goRegister() {
    this.$router.push('/host/register/');
  }
}
</script>

<style scoped>
.back {
  background: url('/top_sepia.JPG');
  background-size: cover;
  background-position: center center;
  width: 100%;
  max-height: 800px;
  height: 70vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.back:before{
  content: '';
  background: inherit;
  -webkit-filter: blur(5px);
  -moz-filter: blur(5px);
  -o-filter: blur(5px);
  -ms-filter: blur(5px);
  filter: blur(5px);
  position: absolute;
  top: -5px;
  left: -5px;
  right: -5px;
  bottom: -5px;
  z-index: -1;
}
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.descri {
  color: white;
  text-align: center;
  font-family: "Roboto", sans-serif;
  text-shadow:
    /* 1px 0 0 black,
    0 1px 0 black, */
    -1px 0 0 black,
    0 -1px 0 black;
  width: 80%;
  font-weight: bold;
  font-size: 22px;
}

.title-mergin {
  height: 40%;
}
</style>