<template>
  <v-text-field
    outlined
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

  @Prop({ default: true })
  isRuled!: boolean
  
  baseRules: Object = {
    required: (value: string) => !!value || '入力してください'
  }

  get rules (): object {
    if (this.isRuled) {
      return this.baseRules
    } else {
      return {
        required: (value: string) => !!value,
      }
    }
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