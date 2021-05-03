<template>
  <div>
    <template v-for="(article, index) in privacyPolicy">
      <policy-template
        :key="index"
        v-bind:article="article"
      />
    </template>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import PolicyTemplate from '~/components/PolicyTemplate.vue'
import privacyPolicy from '@/assets/json/privacyPolicy.json'

export default Vue.extend({
  layout: 'host_default',
  components: {
    PolicyTemplate
  },
  data () {
    return {
      privacyPolicy: privacyPolicy as Object
    }
  }
})
</script>