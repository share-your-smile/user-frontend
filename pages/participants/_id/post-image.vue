<template>
  <div>
    <h1>Post Image</h1>
  </div>
</template>

<script lang='ts'>
// 画像投稿ページ
import Component from "vue-class-component";
import { Vue, Watch } from "vue-property-decorator";

@Component
export default class PostImage extends Vue{
  created () {
    console.log(`user is [${this.$store.getters['participants/getLoginUser']}]`);
  }
};
</script>