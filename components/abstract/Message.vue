<template>
  <v-col
    cols=12
    md=6
    lg=6
    xl=6
  >
    <div
      v-if="$device.isMobile"
      style="font-size:14px;"
      v-html="text"
    />
    <div
      v-else
      v-html="text"
    />
  </v-col>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';

@Component({})
export default class Message extends Vue{
  @Prop({default: ''})
  text!: string;
}
</script>