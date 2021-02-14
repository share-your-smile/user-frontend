<template>
  <div>

    <contact-form />
    
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';

import ContactForm from '~/components/Contact.vue';

@Component({
  layout: 'host_default',
  components: {
    ContactForm,
  }
})
export default class Index extends Vue {

}
</script>

<style scoped>

</style>
