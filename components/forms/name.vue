<template>
  <v-text-field
    v-model="innerVal"
    :rules="[rules.required]"
    label="お名前"
  ></v-text-field>
</template>

<script lang='ts'>
import { Component, Prop, Emit, Vue } from 'vue-property-decorator';

@Component
export default class HostUser extends Vue{
  @Prop({ default: '' })
  name!: string;
  
  rules: Object = {
    required: (value: string) => !!value || 'Required.'
  }

  get innerVal () {
    return this.name;
  }

  set innerVal (val) {
    this.updateName(val);
  }

  @Emit('update:name')
  updateName (name: string) {
    return name;
  }

}
</script>