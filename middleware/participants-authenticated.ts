import { Context } from '@nuxt/types';

const name: string = 'participants_name';

// cookieに参加者情報があるか確認する
export default ({ redirect, store, isDev, route}: Context) => {
  const participantsInfo: any = document.cookie;
  const keys = participantsInfo.split('; ');
  let participantsName: string = '';

  keys.forEach((key: string) => {
    let keyArray = key.split('=');
    if (keyArray[0] === name) {
      participantsName = decodeURI(keyArray[1]);
    }
  });

  const fullPath: string = route.fullPath;
  const path: string[] = fullPath.split('?');
  const paths: string[] = path[0].split('/');
  const prefixPath = `/${paths[1]}/${paths[2]}/${paths[3]}`;

  const queryKey = path[1].split('=')[0];
  const queryValue = path[1].split('=')[1];

  console.log(route.fullPath);
  
  if (participantsName !== '') {
    // ログインできていれば、投稿ページに飛ばす
    store.commit('participants/login', participantsName);
    if (path[0].indexOf('post-image') === -1) {
      console.log('post image');
      return redirect(`${prefixPath}/post-image/`);
    }
  } else {
    // ログインできていなければ、ログインページに飛ばす
    if (path[0].indexOf('login') === -1) {
      console.log('login');
      return redirect({ path: `${prefixPath}/login/`, query: { id: queryValue } });
    }
  }
}