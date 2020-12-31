import createPersistedState from 'vuex-persistedstate'
import * as Cookies from 'js-cookie'
import cookie from 'cookie'
 
export default ({ store, req, isDev }) => {
  // if (process.client) {
    // window.onNuxtReady((nuxt) => {
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
              const userInfoCookie = {
                id: 0,
                name: '',
                email: ''
              };
              if (process.client) {
                for (let i=0; i < key.length; i++) {
                  const result = Cookies.getJSON(key[i]);
                  switch(i) {
                    case 0:
                      userInfoCookie.id = result;
                      break;
                    case 1:
                      userInfoCookie.name = result;
                      break;
                    case 2:
                      userInfoCookie.email = result;
                      break;
                    default: break;
                  }
                }
                store.commit('host/login', userInfoCookie);
              }
            },
            setItem: (key, value) => {
              if(typeof value === 'string') {
                const jsonValue = JSON.parse(value);
                // console.log(jsonValue);
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
    // });
  // }
}