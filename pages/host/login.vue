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
import Vue from 'vue'

import FormEmail from '~/components/forms/email.vue';
import FormPassword from '~/components/forms/password.vue';
import AlertWindow from '~/components/AlertWindow.vue';
import SubTitle from '~/components/SubTitle.vue';

export default Vue.extend({
  layout: 'host_default',
  components: {
    FormEmail,
    FormPassword,
    AlertWindow
  },
  middleware: 'host-authenticated',
  data () {
    return {
      email: '' as String,
      password: '' as String,
      error_message: '' as String,
      title: {
        login: 'ログイン'
      },
      loginState: false as Boolean
    }
  },
  computed: {
    refs: {
      get (): any {
        // eslint-disable-next-line
        return this.$refs;
      }
    },
    buttonState: {
      get () {
        if (this.email !== '' && this.password !== '') {
          if (this.refs.form !== undefined) {
            return !this.refs.form.validate();
          }
        }
        return true;
      }
    }
  },
  created() {
    this.email = process.env.NODE_ENV === 'development' ? 'first_test@gmail.com' : '';
    this.password = process.env.NODE_ENV === 'development' ? 'password' : '';
  },
  methods: {
    async check () {
      if (this.refs.form.validate()) {
        this.loginState = true;
        const reqUserInfo: any = {
          email: this.email,
          password: this.password
        };
        try {
          await this.$auth.loginWith('local', { data: reqUserInfo });
          if (this.$store.$auth.loggedIn) {
            this.$router.push({ path: `/host/id/top/` });
          }
        } catch(error) {
          this.loginState = false;
          if (error.response) {
            if (error.response.data.error_message) {
              switch (error.response.data.error_message) {
                case 'NO_USER':
                  this.error_message = 'ユーザーが登録されていません';
                  break;
                case 'PASSWORD_UNMATCH':
                  this.error_message = 'パスワードが一致しません';
                  break;
                default:
                  this.error_message = 'エラーが発生しました。リトライしてください'
                  break;
              }
              this.refs.alertWindow.show();
            } 
          } else {
            this.error_message = 'エラーが発生しました。リトライしてください';
            this.refs.alertWindow.show();
          }
        }
      }
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