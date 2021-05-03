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
          color="green darken-1"
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

export default Vue.extend({
  props: {
    error_message: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      dialog: false as Boolean
    }
  },
  methods: {
    show () {
      this.dialog = true
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