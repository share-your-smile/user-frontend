<template>
  <v-app>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-toolbar-title class="titleStyle" v-text="dispTitle" />
      <v-spacer />
      <v-menu>
        <template v-slot:activator="{ on }">
          <v-btn
            :disabled="isLoginPage"
            v-on="on"
            @click="changeParticipantsName"
          >
            {{ changeName }}
          </v-btn>
        </template>
      </v-menu>
    </v-app-bar>
    <v-main>
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
  changeName: string = '名前を変更する';
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
    this.$router.push('login');
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
    font-family: Quicksand,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
    font-weight: lighter;
    font-size: 2rem;
  }
</style>
