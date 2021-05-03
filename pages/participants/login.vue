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
import Vue from 'vue'

import FormUser from '~/components/forms/name.vue';
import AlertWindow from '~/components/AlertWindow.vue';
import SubTitle from '~/components/SubTitle.vue';

export default Vue.extend({
  components: {
    FormUser,
    AlertWindow
  },
  layout: 'participants_default',
  middleware: 'participants-authenticated',
  data () {
    return {
      name: 'test' as String,
      disableButton: false as Boolean,
      title: {
        naming: 'あなたの名前は？'
      }
    }
  },
  computed: {
    buttonState: {
      get () {
        return this.name === '' ? true : false;
      }
    }
  },
  created() {
    const query = this.$route.fullPath.split('?')[1];
    const hostId = query.split('=')[1];
    this.$store.dispatch('participants/setHostId', hostId);
  },
  methods: {
    register () {
      this.$store.commit('participants/login', this.name);
      this.$router.push({ path: `/participants/post-image/`});
    }
  }
})
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