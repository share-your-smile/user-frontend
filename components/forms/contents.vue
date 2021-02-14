<template>
  <v-textarea
    outlined
    v-model="innerVal"
    label="お問い合わせ内容"
  />
</template>

<script lang="ts">
import { Component, Prop, Emit, Vue } from 'vue-property-decorator';

@Component
export default class Contents extends Vue {
  @Prop({ default: '' })
  contents!: string;

  get innerVal () {
    return this.contents;
  }

  set innerVal (val) {
    this.updateContents(val);
  }

  @Emit('update:contents')
  updateContents (contents: string) {
    return contents;
  }
}

</script>