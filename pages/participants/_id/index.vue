<template>
  <div>
    <h1>participants page</h1>
  </div>
</template>

<script lang='ts'>
import Component from "vue-class-component";
import { Vue, Watch } from "vue-property-decorator";

@Component
export default class Participants extends Vue {
  created() {
    console.log(this.$route.params.id);
  }
}
</script>