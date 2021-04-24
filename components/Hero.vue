<template>
  <div
    class="back"
  >
    <v-container
      style="height:100%;"
      class="center"
    >
      <div style="height:100%;width:100%">
        <v-row style="height:10%;" />
        <v-row
          justify="center"
        >
          <v-col
            cols="10"
            sm="6"
            md="6"
            lg="6"
            xl="6"
          >
            <v-img
              contain
              src="/logo/main_logo.png"
            />
          </v-col>
        </v-row>
        <v-row
          class="title-mergin"
        />
        <register-btn />
      </div>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import RegisterBtn from '~/components/RegisterBtn.vue'

@Component({
  components: {
    RegisterBtn
  }
})
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

@media screen and (max-width: 600px) {
  .back {
    height: 30vh;
  }
  .title-mergin {
    height: 10%;
  }
}
</style>