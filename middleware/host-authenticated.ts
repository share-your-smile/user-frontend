import { Context } from '@nuxt/types'

const names: string[] = [ 'host_id', 'host_name', 'host_email' ];

export default ({ redirect, store, isDev, route }: Context) => {
  const userInfo: any = document.cookie;
  const keys = userInfo.split('; ');
  const loginData = {
    id: -1,
    name: '',
    email: ''
  }

  keys.forEach( (key: string) => {
    let keyArray = key.split('=');
    switch (keyArray[0]) {
      case names[0]:
        loginData.id = Number(keyArray[1]);
        break;
      case names[1]:
        loginData.name = decodeURI(keyArray[1]);
        break;
      case names[2]:
        loginData.email = decodeURI(keyArray[1]);
        break;
      default:
        break;
    }
  })

  if (loginData.id !== -1 && loginData.name !== '' && loginData.email !== '') {
    store.commit('host/login', loginData);
    const path: string = route.fullPath;
    if (path.indexOf('top') === -1) {
      return redirect(`/host/${loginData.id}/top/`);
    }
  } else {
    const path: string = route.fullPath;
    if (path.indexOf('top') !== -1) {
      return redirect(`/host/login/`);
    }
  }
}