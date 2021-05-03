<template>
  <v-text-field
    outlined
    v-model="innerVal"
    :rules="[rules.required, rules.email]"
    label="メールアドレス"
  ></v-text-field>
</template>

<script lang='ts'>
import Vue from 'vue'

type BaseRules = {
  required: any,
  email: any
}

export default Vue.extend({
  props: {
    email: {
      type: String,
      default: ''
    },
    isRuled: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      baseRules: {
        required: (value: string) => !!value || '入力してください',
        email: (value: string) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || '正しいメールアドレスを記入してください'
        },
      } as BaseRules
    }
  },
  computed: {
    innerVal: {
      get () {
        return this.email;
      },
      set (val: String) {
        this.updateEmail(val)
      }
    },
    rules: {
      get (): BaseRules {
        console.log(this.isRuled)
        if (this.isRuled) {
          console.log('rule?')
          return this.baseRules
        } else {
          return {
            required: (value: string) => !!value,
            email: (value: string) => !!value,
          }
        }
      }
    }
  },
  methods: {
    updateEmail (email: String) {
      this.$emit('update:email', email)
    }
  }
})
// import { Component, Prop, Emit, Vue } from 'vue-property-decorator';

// @Component
// export default class FormEmail extends Vue {
//   @Prop({ default: '' })
//   email!: string;
  
//   @Prop({ default: true })
//   isRuled!: boolean

//   baseRules: Object = {
//     required: (value: string) => !!value || '入力してください',
//     email: (value: string) => {
//       const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
//       return pattern.test(value) || '正しいメールアドレスを記入してください'
//     },
//   }

//   get rules (): object {
//     if (this.isRuled) {
//       return this.baseRules
//     } else {
//       return {
//         required: (value: string) => !!value,
//         email: (value: string) => !!value,
//       }
//     }
//   }

//   get innerVal () {
//     return this.email;
//   }

//   set innerVal (val) {
//     this.updateEmail(val);
//   }

//   @Emit('update:email')
//   updateEmail (email: string) {
//     return email;
//   }

// }
</script>