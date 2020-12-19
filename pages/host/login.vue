<template>
  <div>
    <h1>ログインページ</h1>
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
        color="primary"
        class="login-button"
        @click="check"
      >
        ログイン
      </v-btn>
    </v-form>
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
      const res: any = await this.$userInfoInterface.getUser(reqUserInfo);
      if (res.error_message) {
        switch (res.error_message) {
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
        if (res.name) {
          const userInfo: any = {
            name: res.name,
            email: res.email,
            id: res.id
          };
          this.$store.commit('host/login', userInfo);
          this.$router.push('make-post-page');
        } else {
          this.error_message = 'エラーが発生しました。リトライしてください';
          this.refs.alertWindow.show();
        }
      }
    }
  }
}
</script>