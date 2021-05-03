<template>
  <v-app>
    <v-app-bar
      class="headerSYS"
      color="secondary"
      fixed
      app
    >
      <v-toolbar-title @click="goToTop" class="titleStyle" v-text="title" />
      <v-spacer />
      <!-- <v-menu
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
      </v-menu> -->
    </v-app-bar>
    <v-main
      class="base"
    >
      <v-container>
        <v-row
          style="height:20px;"
        />
        <v-row
          justify="center"
        >
          <sub-title
            v-bind:title="errorMessage"
          />
        </v-row>
        <v-row>
          <v-col
            style="text-align:right"
          >
            <!-- <NuxtLink v-if="$auth.loggedIn" to="/">
              トップページへ戻る
            </NuxtLink>
            <NuxtLink v-else to="/host/id/pariticipants/login/">
              トップページへ戻る
            </NuxtLink> -->
            <NuxtLink to="/">
              トップページへ戻る
            </NuxtLink>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    error: {
      default: null
    }
  },
  data () {
    return {
      pageNotFound: 'ページが見つかりません' as String,
      otherError: 'エラーが発生しました' as String,
      title: 'Share Your Smile' as String
    }
  },
  computed: {
    errorMessage: {
      get (): String {
        let msg = '';
        switch (this.error.statusCode) {
          case 404: msg = this.pageNotFound; break;
          default: msg = this.otherError; break;
        }
        return msg;
      }
    }
  },
  methods: {
    goToTop() {
      this.$router.push('/');
    }
  }
})
</script>

<style scoped>
h1 {
  font-size: 20px;
}

.headerSYS {
  background-color: black;
  background-size: cover;
  color: lightgray!important;
  font-family: 'myFont';
}

.titleStyle {
  font-family: 'myFont',Quicksand,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
  font-weight: bold;
}

.base {
  font-family:'myFont';
  background-color: rgb(241, 241, 241);
}
</style>
