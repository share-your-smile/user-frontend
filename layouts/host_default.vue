<template>
  <v-app >
    <v-app-bar
      :clipped-left="clipped"
      class="headerSYS"
      color="primary"
      fixed
      app
    >
      <v-toolbar-title @click="goToTop" class="titleStyle" v-text="title" />
      <v-spacer />
      <v-menu
        offset-y
      >
        <template v-slot:activator="{ on }">
          <v-btn
            icon
            v-on="on"
          >
            <v-icon
            >mdi-account</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="item in account_item"
            :key="item.title"
            link
          >
            <v-list-item-title @click="changeLoginStatus">{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-main
      class="base"
    >
      <hero
        v-if="showHero"
      />

      <v-container>
        <nuxt 
        />
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

import Hero from "~/components/Hero.vue";

@Component({ components: {}})
export default class Default extends Vue {
  clipped: boolean = false;
  drawer: boolean = false;
  fixed: boolean = false;
  items: any[] = [
    {
      icon: 'mdi-apps',
      title: 'Welcome',
      to: '/'
    },
    {
      icon: 'mdi-chart-bubble',
      title: 'Inspire',
      to: '/inspire'
    }
  ];
  miniVariant: boolean = false;
  right: boolean = true;
  rightDrawer: boolean = false;
  title: string = 'Share Your Smile';
  account_item: any[] = [];
  tmp_account_item: any[] = [
    {
      title: 'ログイン' as string,
    },
    {
      title: '設定' as string,
    }
  ];
  pageTitle: string = this.$nuxt.$route.name!;
  showHero: boolean = false;
  

  @Watch('$route')
  pageTransition(to: any, from: any) {
    if(to.path !== from.path) {
      this.pageTitle = this.$nuxt.$route.name!;
      // this.account_item[2].title = this.pageTitle;
      this.loginState();
    }
    this.changeHero();
  }

  mounted() {
    this.loginState();
    this.changeHero();
  }

  changeHero() {
    if (this.$nuxt.$route.name === 'index') {
      this.showHero = true;
    } else {
      this.showHero = false;
    }
  }

  loginState() {
    const hostInfo: any = this.$store.getters['host/getLoginUser'];
    this.tmp_account_item = [
      {
        title: ''
      },
      {
        title: '設定'
      }
    ];
    if ( hostInfo.name !== '' ) {
      this.tmp_account_item[0].title = 'ログアウト';
      const loginUser = {
        title: hostInfo.name
      };
      this.tmp_account_item.unshift(loginUser);
    } else {
      this.tmp_account_item[0].title = 'ログイン';
    }
    this.account_item = this.tmp_account_item;

  }

  changeLoginStatus() {
    if (this.account_item[0].title = 'ログアウト') {
      this.$store.commit('host/logout');
      this.$router.push('/host/login');
    } else {
      this.$router.push('/host/login');
    }
  }

  goToTop() {
    this.$router.push('/');
  }
}
</script>

<style scoped>
.titleStyle {
  font-family: 'myFont',Quicksand,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
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
  /* background: linear-gradient(-135deg, #E4A972, #9941D8); */
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
}
</style>
