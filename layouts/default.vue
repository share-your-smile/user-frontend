<template>
  <v-app>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-toolbar-title class="titleStyle" v-text="title" />
      <v-spacer />
      <v-menu>
        <template v-slot:activator="{ on }">
          <v-btn
            icon
            v-on="on"
          >
            <v-icon>mdi-account</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="item in account_item" :key="item.title">
            <v-list-item-title @click="changeLoginStatus">{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
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
  account_item: any[] = [
    {
      title: 'ログイン' as string,
    },
    {
      title: '設定' as string,
    },
    {
      title: this.$nuxt.$route.name!
    }
  ];
  pageTitle: string = this.$nuxt.$route.name!;

  @Watch('$route')
  pageTransition(to: any, from: any) {
    if(to.path !== from.path) {
      this.pageTitle = this.$nuxt.$route.name!;
      this.account_item[2].title = this.pageTitle;
      this.loginState();
    }
  }

  mounted() {
    this.loginState();
  }

  loginState() {
    // const hostInfo: any = this.$store.getters['host/getLoginUser'];
    // console.log('hostInfo');
    // console.log(hostInfo);
    // console.log(this.pageTitle);
    // if ( hostInfo.name !== '' ) {
    //   this.account_item[0].title = 'ログアウト';
    // } else {
    //   this.account_item[0].title = 'ログイン';
    // }

    const page: string = this.$nuxt.$route.name!;

    console.log(page);

    if (page.indexOf('login') === -1 && page.indexOf('register') === -1) {
      this.account_item[0].title = 'ログアウト';
    } else {
      this.account_item[0].title = 'ログイン';
    }
  }

  changeLoginStatus() {
    if (this.account_item[0].title = 'ログアウト') {
      this.$store.commit('host/logout');
      this.$router.push('/host/login');
    } else {
      this.$router.push('/host/login');
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
