<template>
  <v-container>
    <v-row>
      <v-spacer cols=1 />
      <v-col
        cols=10
        class="colcol"
      >

        <v-row
          justify="center"
        >
          <sub-title v-bind:title="title.naming" />
        </v-row>

        <v-row
          justify="center"
        >
          <v-col
            class="text-right"
          >
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
          </v-col>
        </v-row>
      </v-col>

      <v-spacer cols=1 />
    </v-row>

  </v-container>
</template>

<script lang='ts'>
// 参加者ログインページ
// ログイン後は画像投稿ページにリダイレクトする
import Component from "vue-class-component";
import { Vue, Watch } from "vue-property-decorator";

import FormUser from '~/components/forms/name.vue';
import AlertWindow from '~/components/AlertWindow.vue';
import SubTitle from '~/components/SubTitle.vue';

@Component({
  components: {
    FormUser,
    AlertWindow
  },
  layout: 'participants_default',
  middleware: 'participants-authenticated'
})
export default class ParticipantsLogin extends Vue {
  name: string = 'test';
  disableButton: boolean = false;
  title: any = {
    naming: 'あなたの名前は？'
  }

  get buttonState () {
    console.log('computed');
    return this.name === '' ? true : false;
  }
  
  register () {
    console.log(this.$route.fullPath);
    const query = this.$route.fullPath.split('?')[1];
    const queryValue = query.split('=')[1];
    const registerName = this.name;
    this.$store.commit('participants/login', registerName);
    this.$router.push({ path: 'post-image/', query: { id: queryValue} });
  }
  
};
</script>

<style scoped>
.login_top {
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  height: 85vh;
}

.colcol {
  /* width: 40%; */
  /* background-color: white; */
}
</style>