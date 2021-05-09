<template>
  <v-container>
    <v-row
      justify="center"
    >
      <sub-title v-bind:title="title.thanks" />
    </v-row>

    <!-- <h2>下記のリンクから参加者用投稿ページのQRコードを取得してください</h2> -->
    <v-row
      justify="center"
    >
      <v-btn
        depressed
        rounded
        x-large
        color="primary"
        class="text-h5"
        style="font-family:'myFont'!important"
        @click="toMakePage"
      >
        メインページへ
      </v-btn>
    </v-row>
  </v-container>
</template>

<script lang='ts'>
import {
  defineComponent,
  useRouter,
  ref
} from '@nuxtjs/composition-api'

export default defineComponent({
  layout: 'host_default',

  setup () {
    const router = useRouter()
    const title = ref({
      thanks: '登録ありがとうございます！'
    })

    const toMakePage = () => {
      router.push('top/')
    }

    return {
      title,
      toMakePage
    }
  }
})
</script>