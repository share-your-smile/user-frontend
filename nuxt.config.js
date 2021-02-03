import colors from 'vuetify/es5/util/colors'
import fs from 'fs';
import path from 'path';

import dotenv from 'dotenv';
dotenv.config();
const USER_DATA_API_BASE_URL = process.env.USER_DATA_API_BASE_URL;
const POST_PAGE_BASE_URL = process.env.POST_PAGE_BASE_URL;
const POST_BUCKET_NAME = process.env.POST_BUCKET_NAME;
const GET_BUCKET_NAME = process.env.GET_BUCKET_NAME;

export default {
  // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
  ssr: false,

  // server: {
  //   https: {
  //     key: fs.readFileSync(path.join(__dirname, './cert/localhost-key.pem')),
  //     cert: fs.readFileSync(path.join(__dirname, './cert/localhost.pem')),
  //   },
  // },

  router: {
    trailingSlash: true,
  },

  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  auth: {
    redirect: {
      login: '/login',
      logout: '/',
      callback: false,
      home: false,
    },
    strategies: {
      local: {
        endpoints: {
          login: {
            url: `/api/v1/login`,
            method: 'post',
            propertyName: 'token',
          },
          user: {
            url: `/api/v1/user`,
            method: 'get',
            propertyName: 'user',
          }
        }
      }
    }
  },

  axious: {
    baseURL: `${process.env.USER_DATA_API_BASE_URL}`
  },

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: '%s | Share Your Smile',
    title: 'Share Your Smile',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    bodyAttrs: {
      class: 'body-class'
    },
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/logo/favicon.ico' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    '@/assets/css/styles.scss'
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    // { src: '~plugins/cookie-storage/host.js', ssr: false },
    { src: '~plugins/cookie-storage/participants.js', ssr: false },
    { src: '~plugins/axios.ts', ssr: false },
    { src: '~plugins/injection/user-info-utils.ts', ssr: false },
    { src: '~plugins/injection/s3-connect.ts', ssr: false },
    { src: '~plugins/axios.ts', ssr: false },
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    'nuxt-typed-vuex',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    'vue-web-cam/nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
  ],

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    customVariables: ['~/assets/css/styles.scss'],
    theme: {
      dark: false,
      themes: {
        dark: {
          primary: colors.amber.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        },
        light: {
          primary: colors.purple.lighten1,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken1,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    transpile: [
      /typed-vuex/,
    ],
  },

  env: {
    USER_DATA_API_BASE_URL,
    POST_PAGE_BASE_URL,
    POST_BUCKET_NAME,
    GET_BUCKET_NAME
  }
}
