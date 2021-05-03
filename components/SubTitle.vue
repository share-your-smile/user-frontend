<template>
  <div>
    <div v-if="!$device.isMobileOrTablet" style="height:80px;width:100%"/>
    <div
      class="marker"
    >
      <h2
        class="moji"
        v-text="title"
      />
    </div>
    <div style="height:40px;width:100%"/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    title: {
      type: String,
      default: ''
    }
  }
})
</script>

<style>
.marker {
  background: linear-gradient(to top, rgba(255,191,0,0.7) 0% 50%, rgba(0,0,0,0) 50% 100%);
  transform: rotate(-1deg);
}

.moji {
  transform: rotate(1deg);
}
</style>