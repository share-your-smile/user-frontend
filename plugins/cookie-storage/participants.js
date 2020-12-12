import createPersistedState from 'vuex-persistedstate';
import * as Cookies from 'js-cookie';
import cookie from 'cookie';

export default ({store, req, isDev}) => {
  // In case of HMR, mutation occurs before nuxReady, so previously saved state
  // gets replaced with original state received from server. So, we've to skip HMR.
  // Also nuxtReady event fires for HMR as well, which results multiple registration of
  // vuex-persistedstate plugin

  if (process.client) {
    window.onNuxtReady((nuxt) => {
      createPersistedState({
        key: [
          'participants_name',
        ],
        paths: [
          "participants"
        ],
        storage: {
          getItem: (key) => {
            const result = process.client ? Cookies.getJSON(key) : cookie.parse(req.headers.cookie || '')[key];
            if (typeof result === 'object') {
              const userInfoCookie = result['host'];
              store.commit('participants/login', userInfoCookie);
            }
          },
          setItem: (key, value) => {
            if(typeof value === 'string') {
              const jsonValue = JSON.parse(value);
              console.log(jsonValue);
              if (typeof jsonValue === 'object') {
                const participantsName = jsonValue['participants']['name'];
                Cookies.set(key[0], participantsName, { expires: 365, secure: !isDev });
              }
            }
            
            return;
          },
          removeItem: (key) => {
            return Cookies.remove(key)
          }
        }
      })(store); // vuex plugins can be connected to store, even after creation
    });
  }
};