import AWS from 'aws-sdk';

export class S3Connect {
  private readonly baseUrl: string | undefined;
  constructor() {
    if (process.env.POST_PAGE_BASE_URL !== undefined) {
      this.baseUrl = process.env.POST_PAGE_BASE_URL;
    }
  }

  getTestString () : string {
    const retString:string = 'test string';
    return retString;
  }

  async getImage (userId: string, fileName: string, isResizedBucket: boolean = false) {
    let prefix: string;
    if (isResizedBucket === true) {
      prefix = `resized-${userId}`;
    } else {
      prefix = userId
    }
    const url: string = `${this.baseUrl}/api/${prefix}/image/${fileName}`;
    return await fetch(url)
      .then((res: any) => {
        if (!res.ok) {
          return res.json();
        }
        return res.blob();
      })
  }

  // 画像データの一覧を取得する
  async getImagesList(userId: string, isResizedBucket: boolean = false) {
    let prefix: string;
    if (isResizedBucket === true) {
      prefix = `resized-${userId}`;
    } else {
      prefix = userId
    }
    const url: string = `${this.baseUrl}/api/${prefix}/list`;
    return await(await fetch(url)).json();
  }

  // アップロード先BUCKETは固定
  async uploadImage(userId: string, poster: string, fileBase64: string) {
    const url: string = `${this.baseUrl}/api/${userId}/image`;

    // const bl = new Blob([fileBuffer], {'type': 'image/png'});
    // console.log(bl);
    // console.log(typeof bl);
    // const params = {
    //   method: 'POST',
    //   header: {
    //     'Content-Type': 'image/png'
    //   },
    //   body: bl
    // };

    const data = {
      image: fileBase64,
      poster: poster
    };
    const params = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }
    return await(await fetch(url, params)).json();
  }
}

export default (_:any, inject: any) => {
  inject('s3Connect', new S3Connect());
}