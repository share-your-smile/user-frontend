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

  const path: string = route.fullPath;
  const paths: string[] = path.split('/');
  const prefixPath = `/${paths[1]}/${paths[2]}/${paths[3]}`;
  
  if (participantsName !== '') {
    // ログインできていれば、投稿ページに飛ばす
    store.commit('participants/login', participantsName);
    if (path.indexOf('post-image') === -1) {
      return redirect(`${prefixPath}/post-image`);
    }
  } else {
    // ログインできていなければ、ログインページに飛ばす
    if (path.indexOf('login') === -1) {
      return redirect(`${prefixPath}/login`);
    }
  }
}