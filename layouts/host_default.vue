<template>
  <v-app >
    <v-app-bar
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
            v-for="item in showItems"
            :key="item.text"
            link
            @click="item.func"
          >
            <v-list-item-title>{{ item.text }}</v-list-item-title>
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
        <confirm-dialog
          v-bind:confirmMessage="confirmMessage"
          ref="confirmDialog"
          @onClickOK="onClickOK"
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
import { mapGetters } from 'vuex';

import Hero from "~/components/Hero.vue";
import ConfirmDialog from "~/components/ConfirmDialog.vue";

@Component({
  components: {
    Hero,
    ConfirmDialog
  }
})
export default class Default extends Vue {
  clipped: boolean = false;
  drawer: boolean = false;
  fixed: boolean = false;

  title: string = 'Share Your Smile';

  confirmMessage: string = "ログアウトしますか？"

  showItems: any = [];

  settingItems: any = {
    login: {
      text: 'ログイン',
      func: this.onClickLogin
    },
    logout: {
      text: 'ログアウト',
      func: this.onClickLogout
    },
    register: {
      text: '新規登録',
      func: this.onClickRegister
    },
    loginUser: {
      text: '',
      func: this.onClickLoginUser
    },
    contact: {
      text: 'お問い合わせ',
      func: this.onClickContact
    }
  };
  pageTitle: string = this.$nuxt.$route.name!;
  showHero: boolean = false;
  
  get refs(): any {
    // eslint-disable-next-line
    return this.$refs;
  }

  @Watch('$route')
  pageTransition(to: any, from: any) {
    if(to.path !== from.path) {
      this.pageTitle = this.$nuxt.$route.name!;
      this.loginState();
    }
    this.changeHero();
  }

  mounted() {
    this.loginState();
    this.changeHero();
    console.log(this.$auth.user);
  }

  changeHero() {
    if (this.$nuxt.$route.name === 'index') {
      this.showHero = true;
    } else {
      this.showHero = false;
    }
  }

  loginState() {
    this.showItems = [];
    if ( this.$store.$auth.loggedIn ) {
      console.log(`login user : ${this.$store.$auth.user}`);
      this.settingItems.loginUser.text = this.$store.$auth.user;
      this.showItems.push(this.settingItems.loginUser);
      this.showItems.push(this.settingItems.logout);
      this.showItems.push(this.settingItems.contact);
    } else {
      this.showItems.push(this.settingItems.register);
      this.showItems.push(this.settingItems.login);
      this.showItems.push(this.settingItems.contact);
    }

  }

  goToTop() {
    this.$router.push('/');
  }

  onClickLogin() {
    this.$router.push('/host/login/');
  }

  onClickLoginUser() {
    if (this.$store.$auth.loggedIn) {
      this.$router.push({ path: `/host/id/top/` });
    }
  }

  onClickLogout() {
    this.refs.confirmDialog.show();
  }

  onClickRegister() {
    this.$router.push('/host/register/');
  }

  onClickContact() {
    console.log('contact page');
    console.log(process.env.NODE_ENV);
  }

  onClickOK() {
    this.$store.$auth.logout();
    // this.$router.push('/host/login/');
  }

}
</script>

<style scoped>
.titleStyle {
  font-family: 'myFont',Quicksand,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
  font-weight: bold;
}

body {
  background-color: black;
  background: linear-gradient(-135deg, #E4A972, #9941D8);
  background-size: cover;
  color: white;
  height: 100vh;
  width: 100%;
  font-family: 'MyFont';
}

.headerSYS {
  background-color: black;
  background-size: cover;
  color: lightgray;
  font-family: 'myFont';
}

.base {
  font-family:'myFont';
  background-color: rgb(241, 241, 241);
}
</style>
