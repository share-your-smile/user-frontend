<template>
  <v-textarea
    outlined
    v-model="innerVal"
    label="お問い合わせ内容"
  />
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    contents: {
      type: String,
      default: ''
    }
  },
  computed: {
    innerVal: {
      get (): String {
        return this.contents
      },
      set (val: String) {
        this.updateContents(val)
      }
    }
  },
  methods: {
    updateContents (contents: String) {
      this.$emit('update:contents', contents)
    }
  }
})

</script>