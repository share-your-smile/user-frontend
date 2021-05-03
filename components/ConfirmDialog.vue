<template>
  <v-dialog
      v-model="dialog"
      persistent
      max-width="290"
    >
    <v-card>
      <v-card-title class="headline">
      </v-card-title>
      <v-card-text
        class="text--primary"
        style="text-align:center"
      ><h3>{{ confirmMessage }}</h3></v-card-text>
      <v-card-actions>
        <v-spacer />
        <v-btn
          color="primary"
          text
          @click="onClickCancel"
        >
          キャンセル
        </v-btn>
        <v-btn
          color="primary"
          text
          @click="onClickOK"
        >
          OK
        </v-btn>
      </v-card-actions>
      <!-- <v-card-actions>
        <v-spacer />
        
      </v-card-actions> -->
    </v-card>
  </v-dialog>
</template>

<script lang='ts'>
import Vue from 'vue'

export default Vue.extend({
  props: {
    confirmMessage: {
      type: String,
      default: '',
      required: true
    }
  },
  data () {
    return {
      dialog: false as Boolean
    }
  },
  methods: {
    show() {
      this.dialog = true;
    },
    onClickOK() {
      this.dialog = false;
      this.$emit('onClickOK');
    },
    onClickCancel() {
      this.dialog = false
    }
  }
})

// import { Component, Prop, Emit, Vue } from 'vue-property-decorator';

// @Component
// export default class AlertWindow extends Vue {
//   @Prop({ default: '' })
//   confirmMessage!: string;

//   dialog: boolean = false;

//   show() {
//     this.dialog = true;
//   }

//   onClickOK() {
//     this.dialog = false;
//     this.$emit('onClickOK');
//   }

//   onClickCancel() {
//     this.dialog = false
//   }
// }
</script>