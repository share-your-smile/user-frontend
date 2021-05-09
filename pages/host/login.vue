<template>
  <div
    class="login_top"
  >
    <v-container>
      <v-row>
        <v-col
          cols=0
          md=2
          lg=3
          xl=4  
        />
        <v-col>
          <v-container>
            <v-row
              justify="center"
            >

              <sub-title v-bind:title="title.login" />
            </v-row>

            <v-row
              justify="center"
            >
              <v-col
                class="text-right"
              >
                <v-form
                  ref="form"
                  lazy-validation
                >
                  <form-email
                    v-bind:email="email"
                    @update:email="email=$event"
                  />
                  <form-password
                    v-bind:password="password"
                    @update:password="password=$event"
                  />
                  <v-btn
                    v-if="!loginState"
                    depressed
                    outlined
                    rounded
                    :disabled="buttonState"
                    color="primary"
                    class="login-button"
                    @click="check"
                  >
                    <span>ログイン</span>
                  </v-btn>
                  <v-progress-circular
                    v-else
                    indeterminate
                    color="primary"
                  />
                </v-form>
              </v-col>
            </v-row>
          </v-container>
        </v-col>
        <v-col
          cols=0
          md=2
          lg=3
          xl=4
        />
      </v-row>
    </v-container>
    <alert-window
      v-bind:error_message="error_message"
      ref="alertWindow"
    />
  </div>
</template>

<script lang='ts'>
// ミドルウェアでCookie情報を確認
// 情報がなければログイン処理を行う
import {
  defineComponent,
  computed,
  useRouter,
  ref,
  reactive,
  wrapProperty,
  onMounted
} from '@nuxtjs/composition-api'

import FormEmail from '~/components/forms/email.vue';
import FormPassword from '~/components/forms/password.vue';
import AlertWindow from '~/components/AlertWindow.vue';
import SubTitle from '~/components/SubTitle.vue';

export interface VForm {
  validate: () => boolean
  reset: () => void
  resetValidation: () => void
}

export default defineComponent({
  layout: 'host_default',
  components: {
    FormEmail,
    FormPassword,
    AlertWindow,
    SubTitle
  },
  middleware: 'host-authenticated',
  setup (props, context) {
    const router = useRouter()

    const email = ref('')
    const password = ref('')
    const error_message = ref('')
    const title = reactive({
      login: 'ログイン'
    })
    const loginState = ref(false)

    // this.$refs
    const form = ref<VForm>()

    // componentのrefsを定義するときはこの書き方
    const alertWindow = ref<InstanceType<typeof AlertWindow>>()

    const buttonState = computed(() => {
      if (email.value !== '' && password.value !== '') {
        if (form !== undefined) {
          return !form.value?.validate();
        }
      }
      return true;
    })

    onMounted(() => {
      form
    })

    const check = async () => {
      if (form.value?.validate()) {
        loginState.value = true;
        const reqUserInfo = {
          email: email.value,
          password: password.value
        };
        try {
          await context.root.$auth.loginWith('local', { data: reqUserInfo });
          if (context.root.$store.$auth.loggedIn) {
            router.push({ path: `/host/id/top/` });
          }
        } catch(error) {
          loginState.value = false;
          if (error.response) {
            if (error.response.data.error_message) {
              switch (error.response.data.error_message) {
                case 'NO_USER':
                  error_message.value = 'ユーザーが登録されていません';
                  break;
                case 'PASSWORD_UNMATCH':
                  error_message.value = 'パスワードが一致しません';
                  break;
                default:
                  error_message.value = 'エラーが発生しました。リトライしてください'
                  break;
              }
              alertWindow.value?.show();
            } 
          } else {
            error_message.value = 'エラーが発生しました。リトライしてください';
            alertWindow.value?.show();
          }
        }
      }
    }

    // created
    email.value = process.env.NODE_ENV === 'development' ? 'first_test@gmail.com' : '';
    password.value = process.env.NODE_ENV === 'development' ? 'password' : '';

    return {
      email,
      password,
      error_message,
      title,
      loginState,
      form,
      alertWindow,
      buttonState,
      check
    }
  }
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
</style>