<template>
  <div>
    <h1>名前を登録してください</h1>
    <form-user 
      v-bind:name="name"
      @update:name="name=$event"
    />
    <v-btn depressed
      outlined
      rounded
      :disabled="buttonState"
      color="primary"
      @click="register"
    >
      登録
    </v-btn>
  </div>
</template>

<script lang='ts'>
// 参加者ログインページ
// ログイン後は画像投稿ページにリダイレクトする
import Component from "vue-class-component";
import { Vue, Watch } from "vue-property-decorator";

import FormUser from '~/components/forms/name.vue';
import AlertWindow from '~/components/AlertWindow.vue';

@Component({
  components: {
    FormUser,
    AlertWindow
  },
  middleware: 'participants-authenticated'
})
export default class ParticipantsLogin extends Vue {
  name: string = 'test';
  disableButton: boolean = false;

  get buttonState () {
    console.log('computed');
    return this.name === '' ? true : false;
  }
  
  register () {
    const registerName = this.name;
    this.$store.commit('participants/login', registerName);
    this.$router.push('post-image');
  }
  
};
</script>