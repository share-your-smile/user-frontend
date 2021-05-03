<template>
  <div>

    <!-- 概要紹介 -->
    <abstract />

    <!-- 使い方紹介 -->
    <how-to-use />

    <v-container>
      <register-btn />
    </v-container>

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
import Vue from 'vue'

import Abstract from "~/components/Abstract.vue";
import HowToUse from "~/components/HowToUse.vue";
import Requirement from "~/components/Requirement.vue";
import Contact from '~/components/Contact.vue';
import RegisterBtn from '~/components/RegisterBtn.vue'

export default Vue.extend({
  layout: 'host_default',
  components: {
    Abstract,
    HowToUse,
    Requirement,
    Contact,
    RegisterBtn
  }
})
</script>
