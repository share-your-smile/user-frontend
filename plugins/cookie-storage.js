import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'
import cookie from 'cookie'
 
export default ({ store, req, isDev }) => {
  if (process.client) {
    window.onNuxtReady((nuxt) => {
      createPersistedState({
          key: [
            'host_id',
            'host_name',
            'host_email'
          ],
          paths: [
              "host"
          ],
          storage: {
            getItem: (key) => {
              console.log('getItem');
              const result = process.client ? Cookies.getJSON(key) : cookie.parse(req.headers.cookie || '')[key];
              if (typeof result === 'object') {
                const userInfoCookie = result['host'];
                store.commit('host/login', userInfoCookie);
              }
            },
            setItem: (key, value) => {
              console.log('setItem');
              if(typeof value === 'string') {
                const jsonValue = JSON.parse(value);
                if (typeof jsonValue === 'object') {
                  const hostId = jsonValue['host']['id'];
                  const hostEmail = jsonValue['host']['email'];
                  const hostName = jsonValue['host']['name'];
                  Cookies.set(key[0], hostId, { expires: 365, secure: !isDev });
                  Cookies.set(key[1], hostName, { expires: 365, secure: !isDev });
                  Cookies.set(key[2], hostEmail, { expires: 365, secure: !isDev });
                }
              }
              
              return;
            },
            removeItem: (key) => {
              return Cookies.remove(key)
            }
          }
      })(store)
    });
  }
}