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
                  @click="$router.push('login')"
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
                    v-bind:password="confirm_password"
                    v-bind:confirm="true"
                    v-bind:base-password="password"
                    @update:password="confirm_password=$event"
                  />
                  <v-btn
                    v-if="!loginState"
                    depressed
                    outlined
                    rounded
                    :disabled="buttonState"
                    color="primary"
                    @click="checkPass"
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
      v-bind:error_message="error_message"
      ref="alertWindow"
    />
  </div>
</template>

<script lang='ts'>
// 新規ユーザー登録画面
// MongoDBにユーザーを登録する
import { ComponentOptions } from 'vue';
import Component from "vue-class-component";
import { Vue, Watch } from "vue-property-decorator";

import FormUser from '~/components/forms/name.vue';
import FormEmail from '~/components/forms/email.vue';
import FormPassword from '~/components/forms/password.vue';
import AlertWindow from '~/components/AlertWindow.vue';
import SubTitle from '~/components/SubTitle.vue';

@Component({
  layout: 'host_default',
  components: {
    FormUser,
    FormEmail,
    FormPassword,
    AlertWindow
  }
})
export default class HostRegister extends Vue {
  // name: string = 'test';
  // email: string = 'test@gmail.com';
  // password: string = '01234567';
  // confirm_password: string = '01234567';
  name: string = '';
  email: string = '';
  password: string = '';
  confirm_password: string = '';
  error_message: string = '';
  // buttonState: boolean = true;
  title: any = {
    register: '新規登録'
  };
  loginState: boolean = false;

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
      this.loginState = true;
      // ユーザ追加要求
      const reqUserInfo: any = {
        name: this.name,
        email: this.email,
        password: this.password
      };
      try {
        await this.$store.dispatch('host/registerUserInfo',reqUserInfo);
        const res = this.$store.getters['host/getLoginUser'];
        
        if (res.id) {
          this.$router.push(`${res.id}/welcome`);
        }
      } catch(error) {
        this.loginState = false;
        if (error.response.data.error_message) {
          switch (error.response.data.error_message) {
            case 'SAME_USER_EXIST':
              this.error_message = '同じメールアドレスのユーザが登録されています';
              break;
            default:
              this.error_message = 'エラーが発生しました。リトライしてください';
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

  resetValidate () {
    console.log(this.name);
    console.log(this.email);
    console.log(this.password);
    
    this.refs.form.resetValidation();
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
  /* width: 40%;
  background-color: white; */
}
</style>