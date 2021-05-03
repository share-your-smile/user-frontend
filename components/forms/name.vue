<template>
  <v-text-field
    outlined
    v-model="innerVal"
    :rules="[rules.required]"
    label="お名前"
  ></v-text-field>
</template>

<script lang='ts'>
import Vue from 'vue'

type BaseRules = {
  required: any
}

export default Vue.extend({
  props: {
    name: {
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
        required: (value: string) => !!value || '入力してください'
      } as BaseRules
    }
  },
  computed: {
    innerVal: {
      get () {
        return this.name;
      },
      set (val: String) {
        this.updateName(val)
      }
    },
    rules: {
      get (): BaseRules {
        if (this.isRuled) {
        return this.baseRules
      } else {
        return {
          required: (value: string) => !!value,
        }
      }
      }
    }
  },
  methods: {
    updateName (name: String) {
      this.$emit('update:name', name)
    }
  }
})
// import { Component, Prop, Emit, Vue } from 'vue-property-decorator';

// @Component
// export default class HostUser extends Vue{
//   @Prop({ default: '' })
//   name!: string;

//   @Prop({ default: true })
//   isRuled!: boolean
  
//   baseRules: Object = {
//     required: (value: string) => !!value || '入力してください'
//   }

//   get rules (): object {
//     if (this.isRuled) {
//       return this.baseRules
//     } else {
//       return {
//         required: (value: string) => !!value,
//       }
//     }
//   }

//   get innerVal () {
//     return this.name;
//   }

//   set innerVal (val) {
//     return this.name;
//   }

//   @Emit('update:name')
//   updateName (name: string) {
//     return name;
//   }

// }
</script>