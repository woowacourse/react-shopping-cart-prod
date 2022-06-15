import axios from "axios";

import { BASE_URL } from "@/constants";
import { getCookie } from "@/utils/auth";

const appClient = axios.create({
  baseURL: BASE_URL,
  timeout: 3000,
  responseType: "json",
});

appClient.interceptors.request.use(
  (config) => {
    const accessToken = getCookie("accessToken");
    // 여기서 token이 필요한 로직들에 관련한 error처리를 할 수 있을 듯
    config.headers.Authorization = `Bearer ${accessToken}`;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default appClient;
