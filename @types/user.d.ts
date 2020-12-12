// declare module "userInterface" {
//   import Vue, { ComponentOptions } from "vue";

//   export interface userInfo {
//     name?: string;
//     email?: string;
//     password?: string;
//     id?: number;
//     result?: string;
//     error_message?: string;
//   }

//   const userInfoComponent: ComponentOptions<Vue>;

//   export default userInfoComponent;
// }

export interface userInfo {
  name?: string;
  email?: string;
  password?: string;
  id?: number;
  result?: string;
  error_message?: string;
}

