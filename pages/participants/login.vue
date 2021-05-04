<template>
  <v-container>
    <v-row>
      <v-spacer cols=1 />
      <v-col
        cols=10
        class="colcol"
      >

        <v-row
          justify="center"
        >
          <sub-title v-bind:title="title.naming" />
        </v-row>

        <v-row
          justify="center"
        >
          <v-col
            class="text-right"
          >
            <form-user 
              v-bind:name="name"
              @update:name="name=$event"
            />
            <v-btn depressed
              outlined
              rounded
              :disabled="buttonState"
              color="primary"
              @click="register"
            >
              登録
            </v-btn>
          </v-col>
        </v-row>
      </v-col>

      <v-spacer cols=1 />
    </v-row>

  </v-container>
</template>

<script>
// 参加者ログインページ
// ログイン後は画像投稿ページにリダイレクトする
import { 
  defineComponent,
  computed,
  useRoute,
  useRouter,
  ref,
  reactive,
  wrapProperty
} from '@nuxtjs/composition-api'

import FormUser from '~/components/forms/name.vue';
import AlertWindow from '~/components/AlertWindow.vue';
import SubTitle from '~/components/SubTitle.vue';

export const useAccessor = wrapProperty('$accessor', false)

export default defineComponent({
  components: {
    FormUser,
    AlertWindow,
    SubTitle
  },
  layout: 'participants_default',
  middleware: 'participants-authenticated',
  setup () {
    // const store = useStore()
    const route = useRoute()
    const router = useRouter()
    const accessor = useAccessor()

    console.log(accessor.participants)

    const name = ref('test')
    const title = reactive({
      naming: 'あなたの名前は？'
    })

    const buttonState = computed(() => name.value === '' ? true : false )

    const register = () => {
      accessor.participants.login(name)
      router.push({ path: `/participants/post-image/`});
    } 

    // created
    const query = route.value.fullPath.split('?')[1]
    const hostId = query.split('=')[1]
    accessor.participants.setHostId(hostId)

    return {
      name,
      title,
      buttonState,
      register
    }
  },
})
</script>

<style scoped>
.login_top {
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  height: 85vh;
}

.colcol {
  /* width: 40%; */
  /* background-color: white; */
}
</style>