<template>
  <v-text-field
    v-model="innerVal"
    :rules="[
      rules.required,
      rules.pass,
      rules.passConfirm(basePassword, password, confirm)
    ]"
    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
    :type="showPassword ? 'text' : 'password'"
    @click:append="showPassword = !showPassword"
    label="パスワード"
  ></v-text-field>
</template>

<script lang='ts'>
import { Component, Prop, Emit, Vue } from 'vue-property-decorator';

@Component
export default class FormPassword extends Vue {
  @Prop({ default: '' })
  password!: string;

  @Prop({ default: '' })
  basePassword!: string;

  @Prop({default: false})
  confirm!: boolean

  showPassword: boolean = false;

  rules: Object = {
    required: (value: string) => !!value || 'Required.',
    pass: (value: string) => {
      return (value && value.length ) >= 8 || '8文字以上のパスワードを設定してください';
    },
    passConfirm: (basePassword: string, password: string, confirm: boolean) => {
      if (confirm) {
        if (basePassword !== password) return 'パスワードが一致しません';
      }
      return true;
    }
  }

  get innerVal () {
    return this.password;
  }

  set innerVal (val) {
    this.updatePassword(val);
  }

  @Emit('update:password')
  updatePassword (password: string) {
    return password;
  }
}
</script>