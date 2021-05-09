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
              <sub-title v-bind:title="title.register" />
            </v-row>

            <v-row
              justify="center"
            >
              <v-col
                class="text-right"
              >
                <v-btn depressed
                  color="primary"
                  rounded
                  @click="$router.push('/host/login/')"
                >
                  ログイン
                </v-btn>
                <div style="height:30px;" />
                <v-form
                  ref="form"
                  lazy-validation
                >
                  <form-user 
                    v-bind:name="name"
                    @update:name="name=$event"
                  />
                  <form-email
                    v-bind:email="email"
                    @update:email="email=$event"
                  />
                  <form-password
                    v-bind:password="password"
                    @update:password="password=$event"
                  />
                  <form-password
                    v-bind:password="confirmPassword"
                    v-bind:confirm="true"
                    v-bind:base-password="password"
                    @update:password="confirmPassword=$event"
                  />
                  <v-btn
                    v-if="!loginState"
                    depressed
                    outlined
                    rounded
                    :disabled="buttonState"
                    color="primary"
                    @click="onClickRegister"
                  >
                    登録
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
      v-bind:error_message="errorMessage"
      ref="alertWindow"
    />
    <confirm-policy
      @handle-agree="checkPass"
      ref="confirmPolicy"
    />
  </div>
</template>

<script lang='ts'>
// 新規ユーザー登録画面
// MongoDBにユーザーを登録する
import {
  defineComponent,
  ref,
  reactive,
  computed,
  useRouter
} from '@nuxtjs/composition-api'

import FormUser from '~/components/forms/name.vue'
import FormEmail from '~/components/forms/email.vue'
import FormPassword from '~/components/forms/password.vue'
import AlertWindow from '~/components/AlertWindow.vue'
import SubTitle from '~/components/SubTitle.vue'
import ConfirmPolicy from '~/components/ConfirmPolicy.vue'

export interface VForm {
  validate: () => boolean
  reset: () => void
  resetValidation: () => void
}

export interface UserInfo {
  name: String
  email: String
  password: String
}

export default defineComponent({
  layout: 'host_default',
  components: {
    FormUser,
    FormEmail,
    FormPassword,
    AlertWindow,
    SubTitle,
    ConfirmPolicy
  },

  setup (props, context) {
    const router = useRouter()
    
    const name = ref('')
    const email = ref('')
    const password = ref('')
    const confirmPassword = ref('')
    const errorMessage = ref('')
    const title = reactive({
      register: '新規登録'
    })
    const loginState = ref(false)

    // vuetify
    const form = ref<VForm>()

    // child component
    const alertWindow = ref<InstanceType<typeof AlertWindow>>()
    const confirmPolicy = ref<InstanceType<typeof ConfirmPolicy>>()

    const buttonState = computed(() => {
      if (name.value !== '' &&
        email.value !== '' &&
        password.value !== '' &&
        confirmPassword.value !== '') {
        if (form !== undefined) {
          return !form.value?.validate();
        }
      }
      return true;
    })

    // created
    name.value = process.env.NODE_ENV === 'development' ? 'test' : '';
    email.value = process.env.NODE_ENV === 'development' ? 'first_test@gmail.com' : '';
    password.value = process.env.NODE_ENV === 'development' ? '01234567' : '';
    confirmPassword.value = process.env.NODE_ENV === 'development' ? '01234567' : '';

    const registerUser = async (params) => {
      return await new Promise((resolve, reject) => {
        context.root.$axios
          .$post(`/api/v1/user`, params)
          .then((response) => {
            resolve(response);
          })
          .catch((err) => {
            reject(err);
          })
      })
    }

    const onClickRegister = () => {
      confirmPolicy.value?.show()
    }

    const checkPass = async () => {
      // validateチェックOKでtrueが帰ってくる
      if (form.value?.validate()) {
        loginState.value = true;
        // ユーザ追加要求
        const reqUserInfo: UserInfo = {
          name: name.value,
          email: email.value,
          password: password.value
        };
        try {
          // await this.$store.dispatch('host/registerUserInfo',reqUserInfo);
          // const res = this.$store.getters['host/getLoginUser'];
          await registerUser(reqUserInfo);
          await context.root.$auth.loginWith('local', { data: reqUserInfo });
          router.push({ path: `/host/id/welcome/` });
        } catch(error) {
          loginState.value = false;
          if (error.response.data.error_message) {
            switch (error.response.data.error_message) {
              case 'SAME_USER_EXIST':
                errorMessage.value = '同じメールアドレスのユーザが登録されています';
                break;
              default:
                errorMessage.value = 'エラーが発生しました。リトライしてください';
                break;
            }
            alertWindow.value?.show();
          } else {
            errorMessage.value = 'エラーが発生しました。リトライしてください';
            alertWindow.value?.show();
          }
        }
      }
    }

    return {
      name,
      email,
      password,
      confirmPassword,
      errorMessage,
      title,
      loginState,
      form,
      alertWindow,
      confirmPolicy,
      buttonState,
      onClickRegister,
      checkPass
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

.container {
  /* width: 40%;
  background-color: white; */
}
</style>