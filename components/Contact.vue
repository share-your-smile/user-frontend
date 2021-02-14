<template>
  <v-container>
    <v-row
      justify="center"
    >
      <sub-title
        :title="words.title"
      />
    </v-row>

    <v-row
      justify="center"
    >
      <div>{{ words.description }}</div>
    </v-row>

    <v-row justify="center">
      <v-col class="text-right"
        cols="6"
      >
        <v-form
          ref="form"
          lazy-validation
        >
          <form-user
            :name="name"
            :isRuled="false"
            @update:name="name = $event"
          />
          <form-email
            :email="email"
            :isRuled="false"
            @update:email="email = $event"
          />

          <form-contents
            :contents="contents"
            @update:contents="contents = $event"
          />

          <v-btn
            v-if="sendingStatus === 'inputing'"
            depressed
            outlined
            rounded
            :disabled="buttonState"
            color="primary"
            @click="sendMessage"
          >
            決定
          </v-btn>
          <v-progress-circular
            v-if="sendingStatus === 'sending'"
            indeterminate
            color="primary"
          />
          <div
            v-if="sendingStatus === 'done'"
            v-html="words.thanks"
          />
          <div
            v-if="sendingStatus === 'error'"
          >
            {{ words.error }}
          </div>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';

import SubTitle from '~/components/SubTitle.vue';
import FormUser from '~/components/forms/name.vue';
import FormEmail from '~/components/forms/email.vue';
import FormContents from '~/components/forms/contents.vue';

@Component({
  components: {
    SubTitle,
    FormUser,
    FormEmail,
    FormContents,
  }
})
export default class Contact extends Vue {
  words: any = {
    title: 'お問い合わせ',
    description: '使い方についての質問や使いたい場合の相談など、<br>お気軽にお問い合わせください！',
    thanks: 'お問い合わせありがとうございました！',
    err: '送信できませんでした。もう一度送信してください。'
  };
  name: string = '';
  email: string = '';
  contents: string = '';
  isSending: boolean = false;
  sendingStatus: string = 'inputing';

  @Watch('name')
  updateName(val: string) {
    this.$store.dispatch('contact/setName', val);
  }
  @Watch('email')
  updateEmail(val: string) {
    this.$store.dispatch('contact/setFrom', val);
  }
  @Watch('contents')
  updateContents(val: string) {
    this.$store.dispatch('contact/setContents', val);
  }

  get refs(): any {
    return this.$refs;
  }

  get buttonState () {
    if (this.email !== '' && this.name !== '') {
      if (this.refs.form !== undefined) {
        return !this.refs.form.validate();
      }
    }
    return true;
  }

  async sendMessage() {
    if (this.refs.form.validate()) {
      this.sendingStatus = 'sending';
      try {
        await this.$store.dispatch('contact/sendMessage');
        console.log('OK');
        this.$store.dispatch('contact/reset');
        this.sendingStatus = 'done';
        this.name = '';
        this.email = '';
        this.contents = '';
      } catch(err) {
        console.log('NG');
        this.sendingStatus = 'error';

      }
      setTimeout(function (this: Contact) {
        this.sendingStatus = 'inputing';
      }.bind(this), 5000);
    }
  }
}
</script>