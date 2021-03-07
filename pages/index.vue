<template>
  <div>

    <!-- 概要紹介 -->
    <abstract />

    <!-- 使い方紹介 -->
    <how-to-use />

    <requirement />

    <contact />

    <v-row justify="center">
      <nuxt-link to="/policies/service/">利用規約</nuxt-link>
      <div>&nbsp;|&nbsp;</div>
      <nuxt-link to="/policies/privacy/">プライバシーポリシー</nuxt-link>
    </v-row>
    
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';

import Abstract from "~/components/Abstract.vue";
import HowToUse from "~/components/HowToUse.vue";
import Requirement from "~/components/Requirement.vue";
import Contact from '~/components/Contact.vue';

@Component({
  layout: 'host_default',
  components: {
    Abstract,
    HowToUse,
    Requirement,
    Contact,
  }
})
export default class Index extends Vue {

}
</script>

<style scoped>

</style>
