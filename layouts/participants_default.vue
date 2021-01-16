<template>
  <v-app>
    <v-app-bar
      :clipped-left="clipped"
      class="headerSYS"
      fixed
      app
    >
      <v-toolbar-title class="titleStyle" v-text="title" />
      <v-spacer />
      <v-menu>
        <template v-slot:activator="{ on }">
          <v-btn
            :disabled="isLoginPage"
            rounded
            small
            v-on="on"
            @click="changeParticipantsName"
            v-text="changeName"
          />
        </template>
      </v-menu>
    </v-app-bar>
    <v-main
      class="base"
    >
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';

@Component({ components: {}})
export default class Default extends Vue {
  clipped: boolean = false;
  fixed: boolean = false
  title: string = 'Share Your Smile';
  name: string = '';
  dispTitle: string = 'Share Your Smile';
  changeName: string = '名前を変更';
  pageTitle: string = this.$nuxt.$route.name!;
  isLoginPage: boolean = false;

  @Watch('$route')
  pageTransition(to: any, from: any) {
    if(to.path !== from.path) {
      this.pageTitle = this.$nuxt.$route.name!;
      this.checkLoginStatus(to.path);
    }
    this.setName();
  }

  mounted() {
    this.setName();
    this.checkLoginStatus(this.$nuxt.$route.name!);
  }

  setName() {
    this.name = this.$store.getters['participants/getLoginUser'];
    console.log(`name ${this.name}`)
    if (this.name !== '') {
      this.dispTitle = `${this.title}, ${this.name}!`;
    } else {
      this.dispTitle = this.title;
    }
  }

  changeParticipantsName() {
    this.$store.commit('participants/logout');
    this.$router.push('login/');
  }

  checkLoginStatus(path: string) {
    if (path.indexOf('login') !== -1) {
      this.isLoginPage = true;
    } else {
      this.isLoginPage = false;
    }
  }
}
</script>

<style scoped>
.titleStyle {
  font-family: 'myFont', Quicksand,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
  font-weight: bold;
  /* font-size: 2rem; */
}

body {
  background-color: black;
  /* background-image : url("Snow.jpg"); */
  background: linear-gradient(-135deg, #E4A972, #9941D8);
  background-size: cover;
  color: white;
  height: 100vh;
  width: 100%;
  /* font-family: 'Noto Sans Japanese', sans-serif; */
  font-family: 'MyFont';
}

.headerSYS {
  background-color: black;
  /* background-image : url("Snow.jpg"); */
  background: linear-gradient(-135deg, #E4A972, #9941D8);
  background-size: cover;
  color: lightgray;
  font-family: 'myFont';
  /* text-shadow:
    1px 0 0 black,
    0 1px 0 black,
    -1px 0 0 black,
    0 -1px 0 black */
}

.base {
  font-family:'myFont';
  background-color: rgb(241, 241, 241);
  /* padding: 0px!important; */
}
</style>
