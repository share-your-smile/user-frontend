export default ({ $axios, store, redirect, $auth }: any) => {
  $axios.setBaseURL(process.env.USER_DATA_API_BASE_URL);
}