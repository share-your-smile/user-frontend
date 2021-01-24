import { Context } from '@nuxt/types'

const names: string[] = [ 'host_id', 'host_name', 'host_email' ];

export default ({ redirect, store, isDev, route }: Context) => {
  if (store.$auth.loggedIn) {
    const path: string = route.fullPath;
    if (path.indexOf('top') === -1) {
      return redirect(`/host/id/top/`);
    }
  } else {
    const path: string = route.fullPath;
    if (path.indexOf('top') !== -1) {
      return redirect(`/host/login/`);
    }
  }
}