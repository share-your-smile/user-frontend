<template>
  <v-text-field
    outlined
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
import Vue from 'vue'

type BaseRules = {
  required: any,
  pass: any,
  passConfirm: any
}

export default Vue.extend({
  props: {
    password: {
      type: String,
      default: ''
    },
    basePassword: {
      type: String,
      default: ''
    },
    confirm: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      showPassword: false as Boolean,
      rules: {
        required: (value: string) => !!value || '入力してください',
        pass: (value: string) => {
          return (value && value.length ) >= 8 || '8文字以上のパスワードを設定してください';
        },
        passConfirm: (basePassword: string, password: string, confirm: boolean) => {
          if (confirm) {
            if (basePassword !== password) {
              return 'パスワードが一致しません';
            }
          }
          return true;
        }
      } as BaseRules
    }
  },
  computed: {
    innerVal: {
      get (): String {
        return this.password;
      },
      set (val: String) {
        this.updatePassword(val)
      }
    },
  },
  methods: {
    updatePassword (password: String) {
      this.$emit('update:password', password)
    }
  }
})

// import { Component, Prop, Emit, Vue } from 'vue-property-decorator';

// @Component
// export default class FormPassword extends Vue {
//   @Prop({ default: '' })
//   password!: string;

//   @Prop({ default: '' })
//   basePassword!: string;

//   @Prop({default: false})
//   confirm!: boolean

//   showPassword: boolean = false;

//   rules: Object = {
//     required: (value: string) => !!value || '入力してください',
//     pass: (value: string) => {
//       return (value && value.length ) >= 8 || '8文字以上のパスワードを設定してください';
//     },
//     passConfirm: (basePassword: string, password: string, confirm: boolean) => {
//       if (confirm) {
//         if (basePassword !== password) {
//           return 'パスワードが一致しません';
//         }
//       }
//       return true;
//     }
//   }

//   get innerVal () {
//     return this.password;
//   }

//   set innerVal (val) {
//     this.updatePassword(val);
//   }

//   @Emit('update:password')
//   updatePassword (password: string) {
//     return password;
//   }
// }
</script>