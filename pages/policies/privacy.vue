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
import { Vue, Component } from 'vue-property-decorator';

import PolicyTemplate from '~/components/PolicyTemplate.vue'

import privacyPolicy from '@/assets/json/privacyPolicy.json'

@Component ({
  layout: 'host_default',
  components: {
    PolicyTemplate
  }
})
export default class Service extends Vue {
  privacyPolicy: object = privacyPolicy
}
</script>