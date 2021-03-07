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
import { Vue, Component } from 'vue-property-decorator';

import PolicyTemplate from '~/components/PolicyTemplate.vue'

import servicePolicy from '@/assets/json/servicePolicy.json'

@Component ({
  layout: 'host_default',
  components: {
    PolicyTemplate
  }
})
export default class Service extends Vue {
  servicePolicy: object = servicePolicy

  mounted () {
    console.log('call?')
    console.log(this.servicePolicy)
  }
}
</script>