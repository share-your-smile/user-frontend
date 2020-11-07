<template>
<div>
  <h1>this is login page</h1>
  <v-text-field v-model="userName"/>
  <v-btn @click="show">btn btn</v-btn>
  <div>{{userName}}</div>
</div>
</template>

<script lang='ts'>
// post image user's login page
// middlewareにて
// 入力したユーザ名をCookieに登録する


import Vue from 'vue';

export default Vue.extend({
  // middleware: 'redirect'
  data() {
    return {
      userName: ""
    }
  },
  methods: {
    show () {
      console.log(this.userName);
    }
  }
});
</script>