// export default ({ $axios, store, redirect, $auth }: any) => {
//   $axios.setBaseURL(process.env.USER_DATA_API_BASE_URL);
// }

import axios from 'axios'

export default function({ $axios }: any) {
  $axios.onRequest((config: any) => {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem(
      'auth._token.local'
    )
    return config
  })
}