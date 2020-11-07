<template>
  <div>
    <h1>新規登録ページ</h1>
    <v-btn depressed
      color="primary"
      outlined
      @click="$router.push('login')"
    >
      ログイン
    </v-btn>
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
        v-bind:password="confirm_password"
        v-bind:confirm="true"
        v-bind:base-password="password"
        @update:password="confirm_password=$event"
      />
      <v-btn depressed
        outlined
        rounded
        :disabled="buttonState"
        color="primary"
        @click="checkPass"
      >
        登録
      </v-btn>
      <v-btn depressed
        outlined
        rounded
        color="warning"
        @click="resetValidate"
      >
        validate reset
      </v-btn>
    </v-form>
    <alert-window
      v-bind:error_message="error_message"
      ref="alertWindow"
    />
  </div>
</template>

<script lang='ts'>
// 新規ユーザー登録画面
// MongoDBにユーザーを登録する
// import Vue from 'vue';
import Component from "vue-class-component";
import { Vue, Watch } from "vue-property-decorator";

import FormUser from '~/components/forms/name.vue';
import FormEmail from '~/components/forms/email.vue';
import FormPassword from '~/components/forms/password.vue';
import AlertWindow from '~/components/AlertWindow.vue';

@Component({
  components: {
    FormUser,
    FormEmail,
    FormPassword,
    AlertWindow
  }
})
export default class HostRegister extends Vue {
  name: string = 'test';
  email: string = 'test@gmail.com';
  password: string = '01234567';
  confirm_password: string = '01234567';
  error_message: string = 'apepe no pe';
  // buttonState: boolean = true;

  get refs(): any {
    // eslint-disable-next-line
    return this.$refs;
  }

  get buttonState () {
    if (this.name !== '' &&
        this.email !== '' &&
        this.password !== '' &&
        this.confirm_password !== '') {
      if (this.refs.form !== undefined) {
        return !this.refs.form.validate();
      }
    }
    return true;
  }

  async checkPass () {
    // validateチェックOKでtrueが帰ってくる
    if (this.refs.form.validate()) {
      // ユーザ追加要求
      const reqUserInfo: any = {
        name: this.name,
        email: this.email,
        password: this.password
      };
      const res: any = await this.$userInfoInterface.registerUser(reqUserInfo);
      if (res.error_message) {
        switch (res.error_message) {
          case 'SAME_USER_EXIST':
            this.error_message = '同じメールアドレスのユーザが登録されています';
            break;
          default:
            this.error_message = 'エラーが発生しました。リトライしてください';
            break;
        }
        // this.dialog = true;
        this.refs.alertWindow.show();
      } else {
        if (res.id) {
          const userInfo: any = {
            name: this.name,
            email: this.email,
            id: res.id
          };
          this.$store.commit('host/login', userInfo);
          this.$router.push('welcome');
        } else {
          this.error_message = 'エラーが発生しました。リトライしてください';
          this.refs.alertWindow.show();
        }
      }
    }
  }

  resetValidate () {
    console.log(this.name);
    console.log(this.email);
    console.log(this.password);
    
    this.refs.form.resetValidation();
  }
}
</script>