<template>
  <div
    class="login_top"
  >
    <v-container
      class="container"
    >
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
            <v-btn depressed
              outlined
              rounded
              :disabled="buttonState"
              color="secondary"
              class="login-button"
              @click="check"
            >
              ログイン
            </v-btn>
          </v-form>
        </v-col>
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
import Component from "vue-class-component";
import { Vue, Watch } from "vue-property-decorator";

import FormEmail from '~/components/forms/email.vue';
import FormPassword from '~/components/forms/password.vue';
import AlertWindow from '~/components/AlertWindow.vue';
import SubTitle from '~/components/SubTitle.vue';

@Component({
  components: {
    FormEmail,
    FormPassword,
    AlertWindow
  },
  middleware: 'host-authenticated'
})
export default class HostLogin extends Vue {
  email: string = 'first_test@gmail.com';
  password: string = 'password';
  error_message: string = '';
  title: any = {
    login: 'ログイン'
  }

  get refs(): any {
    // eslint-disable-next-line
    return this.$refs;
  }

  get buttonState () {
    if (this.email !== '' && this.password !== '') {
      if (this.refs.form !== undefined) {
        return !this.refs.form.validate();
      }
    }
    return true;
  }

  async check () {
    if (this.refs.form.validate()) {
      const reqUserInfo: any = {
        email: this.email,
        password: this.password
      };
      try {
        await this.$store.dispatch('host/getUserInfo',reqUserInfo);
        const res = this.$store.getters['host/getLoginUser'];
        if (res.name) {
          this.$router.push(`${res.id}/top`);
        }
      } catch(error) {
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
        } else {
          this.error_message = 'エラーが発生しました。リトライしてください';
          this.refs.alertWindow.show();
        }
      }
    }
  }
}
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
  width: 40%;
  background-color: white;
}
</style>