<template>
  <div
    class="marker"
  >
    <h2
      class="moji"
      v-text="title"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({})
export default class SubTitle extends Vue {
  @Prop({ default: '' })
  title!: string;
}
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