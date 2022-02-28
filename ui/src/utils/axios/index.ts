import axios from "axios";

// const header = {
//   "Access-Control-Allow-Origin": "*",
// };

export const $axios = axios.create({
  baseURL: "http://localhost:8000",
  timeout: 1000,
  // headers: header,
});
