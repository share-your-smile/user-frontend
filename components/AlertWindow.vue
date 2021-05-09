<template>
  <v-dialog
      v-model="dialog"
      persistent
      max-width="290"
    >
    <v-card>
      <v-card-title class="headline">
        エラー!!
      </v-card-title>
      <v-card-text>{{ error_message }}</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          text
          @click="dialog = false"
        >
          閉じる
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang='ts'>
import Vue from 'vue'

import {
  defineComponent,
  ref
} from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    error_message: {
      type: String,
      default: ''
    }
  },

  setup (props, context) {
    const dialog = ref(false)

    const show = () => {
      dialog.value = true
    }

    return {
      dialog,
      show
    }
  }
})

// import { Component, Prop, Emit, Vue } from 'vue-property-decorator';

// @Component
// export default class AlertWindow extends Vue {
//   @Prop({ default: '' })
//   error_message!: string;

//   dialog: boolean = false;

//   show() {
//     this.dialog = true;
//   }
// }
</script>