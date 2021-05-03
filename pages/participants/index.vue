<template>
  <div>
    <h1>participants page</h1>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue'

export default Vue.extend({
  layout: 'participants_default',
  middleware: 'participants-authenticated'
})
</script>