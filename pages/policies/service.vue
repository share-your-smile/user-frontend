<template>
  <div>
    <template v-for="(article, index) in servicePolicy">
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
import servicePolicy from '@/assets/json/servicePolicy.json'

export default Vue.extend({
  layout: 'host_default',
  components: {
    PolicyTemplate
  },
  data () {
    return {
      servicePolicy: servicePolicy as Object
    }
  }
})
</script>