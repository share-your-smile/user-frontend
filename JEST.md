# How to write test code using JEST in nuxt.js/vuetify

## Preparation

### `create-nuxt-app`

Please select `jest` when answer the question `Choose test framework`.

### Install

```bash
npm install @vue/test-utils

# typescript only
npm install @types/jest
```

### Setting

Jest can't recognize the vuetify's custom tag ex)`v-btn v-form` and outputs warnings about it.

So, we need to make `jest` recognize it.

1. create setup file as `./test/unit/setup.js` and write below code.

```js
import Vue from 'vue'
import Vuetify from 'vuetify'

Vue.use(Vuetify)
```

2. include above file to `jest.config.js`.

```js
module.exports = {
  /*

  */
  setupFiles: ['./test/unit/setup.js']
}
```

## How to write test code

- `sample.vue`

```html
<template>
  <div>
    <v-btn depressed>
      test
    </v-btn>
  </div>
</template>

<script>

export default {
  data () {
    return {
      greeting: 'Hello'
    }
  },
  methods: {
    sayHello () {
      console.log(this.greeting);
    }
  }
}
</script>
```

- `sample.test.js`

```js
import { mount } from '@vue/test-utils';
import Login from '@/pages/host/login.vue';

// describe 
describe('sample.vue', () => {

  test('TC001', () => {
    const wrapper = mount(Login as any);
    expect(wrapper.vm).toBeTruthy();
  })

  test('TC002', () => {
    const wrapper = mount(Login as any);
    /*
    any test
    */
  })
})
```

## exec test

```bash
npm run test
```

