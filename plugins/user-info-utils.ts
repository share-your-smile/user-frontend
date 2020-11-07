export class UserInfoInterface {
  private readonly baseUrl: string | undefined;
  constructor() {
    if (process.env.USER_DATA_API_BASE_URL !== undefined) {
      this.baseUrl = process.env.USER_DATA_API_BASE_URL;
    }
  }

  async getUser (data: any) {
    const getUserUrl = this.baseUrl + '/user-info/one';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }
    return await (await fetch(getUserUrl, options)).json();
  }

  async getAllUsers () {

  }

  async registerUser (data: any) {
    const registerUserUrl = this.baseUrl + '/user-info';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }
    return await (await fetch(registerUserUrl, options)).json();
    // return await (await fetch(baseUrl)).json();
  }
}

export default (_: any, inject: any) => {
  inject('userInfoInterface', new UserInfoInterface());
}

// const getUser = async (data) => {
//   const getUserUrl = baseUrl + '/user-info/one';
//   const options = {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(data)
//   }
//   return await (await fetch(getUserUrl, options)).json();
// }

// const getAllUsers = async () => {

// }

// const registerUser = async (data) => {
//   console.log(data);
//   const registerUserUrl = baseUrl + '/user-info';
//   const options = {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(data)
//   }
//   return await (await fetch(registerUserUrl, options)).json();
//   // return await (await fetch(baseUrl)).json();
// }

// export default ({}, inject) => {
//   inject('getUser', getUser);
//   inject('getAllUsers', getAllUsers);
//   inject('registerUser', registerUser);
// }