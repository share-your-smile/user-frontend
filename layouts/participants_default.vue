<template>
  <v-app>
    <v-app-bar
      :clipped-left="clipped"
      class="headerSYS"
      color="secondary"
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
import Vue from 'vue'

export default Vue.extend({
  data () {
    return {
      clipped: false as Boolean,
      fixed: false as Boolean,
      title: 'Share Your Smile' as String,
      name: '' as String,
      dispTitle: 'Share Your Smile' as String,
      changeName: '名前を変更' as String,
      pageTitle: this.$nuxt.$route.name! as String,
      isLoginPage: false as Boolean,
      isShow: false as Boolean,
      scrollY: 0 as Number
    }
  },
  watch: {
    scrollY (newValue: number, oldValue: number) {
      console.log(newValue < oldValue);
      this.$set(this, 'isShow', newValue < oldValue)
    },
    '$route' (to: any, from: any) {
      if(to.path !== from.path) {
        this.pageTitle = this.$nuxt.$route.name!;
        this.checkLoginStatus(to.path);
      }
      this.setName();
    }
  },
  mounted () {
    this.setName();
    this.checkLoginStatus(this.$nuxt.$route.name!);
    window.addEventListener('scroll', this.onScroll)
    window.addEventListener('load', () => {
      this.onScroll()
    })
  },
  methods: {
    setName() {
      this.name = this.$store.getters['participants/getLoginUser'];
      console.log(`name ${this.name}`)
      if (this.name !== '') {
        this.dispTitle = `${this.title}, ${this.name}!`;
      } else {
        this.dispTitle = this.title;
      }
    },

    onScroll () {
      this.$set(this, 'scrollY', window.pageYOffset)
      // this.scrollY = window.pageXOffset;
    },

    changeParticipantsName() {
      this.$store.commit('participants/logout');
      const hostId = this.$store.getters['participants/getHostId'];
      this.$router.push({ path: '/participants/login/', query: { id: hostId }});
    },

    checkLoginStatus(path: string) {
      if (path.indexOf('login') !== -1) {
        this.isLoginPage = true;
      } else {
        this.isLoginPage = false;
      }
    }
  }
})
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
  /* background: linear-gradient(-135deg, #E4A972, #9941D8); */
  background-size: cover;
  color: gray;
  font-family: 'MyFont';
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
