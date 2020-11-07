<template>
  <v-text-field
    v-model="innerVal"
    :rules="[rules.required, rules.email]"
    label="メールアドレス"
  ></v-text-field>
</template>

<script lang='ts'>
import { Component, Prop, Emit, Vue } from 'vue-property-decorator';

@Component
export default class FormEmail extends Vue {
  @Prop({ default: '' })
  email!: string;

  rules: Object = {
    required: (value: string) => !!value || 'Required.',
    email: (value: string) => {
      const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      return pattern.test(value) || '正しいメールアドレスを記入してください'
    },
  }

  get innerVal () {
    return this.email;
  }

  set innerVal (val) {
    this.updateEmail(val);
  }

  @Emit('update:email')
  updateEmail (email: string) {
    return email;
  }

}
</script>