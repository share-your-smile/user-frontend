<template>
  <div>

    <contact-form />
    
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

import ContactForm from '~/components/Contact.vue';

export default Vue.extend({
  layout: 'host_default',
  components: {
    ContactForm,
  }
})
</script>

<style scoped>

</style>
