<template>
  <div>

    <!-- 概要紹介 -->
    <abstract />

    <!-- 使い方紹介 -->
    <how-to-use />

    <requirement />
    
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';

import Abstract from "~/components/Abstract.vue";
import HowToUse from "~/components/HowToUse.vue";
import Requirement from "~/components/Requirement.vue";

@Component({
  layout: 'host_default',
  components: {
    Abstract,
    HowToUse
  }
})
export default class Index extends Vue {

}
</script>

<style scoped>

</style>
