<template>
  <v-col
    cols=12
    md=6
    lg=6
    xl=6
  >
    <div
      v-if="$device.isMobile"
      style="font-size:14px;"
      v-html="text"
    />
    <div
      v-else
      v-html="text"
    />
  </v-col>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    text: {
      type: String,
      default: ''
    }
  }
})
</script>