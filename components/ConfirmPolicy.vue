<template>
  <v-dialog
    v-model="confirmPoricy"
    persistent
  >
    <v-card>
      <v-card-title></v-card-title>
      <v-card-text>
        <template v-for="(article, index) in privacyPolicy">
          <policy-template
            :key="index"
            v-bind:article="article"
          />
        </template>
      </v-card-text>
    <v-card-actions>
        <v-spacer />
        <v-btn
          color="primary"
          text
          @click="onClickCancel"
        >
          同意しない
        </v-btn>
        <v-btn
          color="primary"
          text
          @click="onClickOK"
        >
          同意する
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator';

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

  confirmPoricy: boolean = false

  show () {
    this.confirmPoricy = true
  }

  onClickCancel () {
    this.confirmPoricy = false
  }

  onClickOK () {
    this.confirmPoricy = false
    console.log('ok')
    this.$emit('handle-agree')
  }
}
</script>