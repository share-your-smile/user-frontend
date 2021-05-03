<template>
  <v-col
    cols=12
    md=6
    lg=6
    xl=6
  >
    <v-img
      v-if="$device.isMobile"
      class="waku02 rotate01"
      :src="img"
    />
    <v-img
      v-else
      class="waku02 rotate01"
      width="500"
      height="300"
      :src="img"
    />
  </v-col>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    img: {
      type: String,
      default: ''
    }
  }
})
</script>

<style scoped>
.waku02 {
  position:relative; /* positionの基準とするためrelativeを与えます。 */
  border-radius: 10px;
}
.waku02:before {
  content: ''; /* このプロパティが無いと擬似要素は機能しません、お決まりの呪文です。 */
  display: block; /* ブロック要素にします。 */
  position: absolute; /* absoluteで上に乗っけます。 */
  top: 0; /* 縦横の値を入れるのは基本です。入れないとだめ！っと思っておくほうが今後の為いいです。 */
  left: 0;
  width: 100%;
  height: 100%;
  box-shadow: inset 0 0 0px 8px rgba(255,255,255,0.6);
  border-radius: 10px;
}
.waku02.rotate01 {
  -moz-transform:rotate(-3deg);
  -webkit-transform:rotate(-3deg);
  -ms-transform:rotate(-3deg);
  transform:rotate(-3deg);
}
.waku03.rotate02 {
  -moz-transform:rotate(1deg);
  -webkit-transform:rotate(1deg);
  -ms-transform:rotate(1deg);
  transform:rotate(1deg);
}
</style>