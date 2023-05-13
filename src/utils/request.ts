import router from "@/router";
import axios from "axios";
import { ElMessage } from "element-plus";
import { getCookie, removeCookie } from ".";
import { getLanguage } from "@/utils";
import { TOKEN } from "./constant";
// 全局自定义属性

import { AxiosInstance } from "axios";
declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $axios: AxiosInstance;
  }
}

const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  // withCredentials: true,
  timeout: 150000,
});

request.interceptors.request.use(
  (config) => {
    const token = getCookie(TOKEN);
    // @ts-ignore
    config.headers["appId"] = import.meta.env.CLIENT_APP_ID;

    if (config.headers && token) {
      // token前带上Bearer
      config.headers["Authorization"] = "Bearer " + token;
    }
    // @ts-ignore
    config.headers["Accept-Language"] =
      getLanguage() === "en" ? "en-US" : "zh-CN";
    return config;
  },
  (error) => {
    console.error(error);
    return Promise.reject(error);
  }
);

request.interceptors.response.use(
  (response) => {
    // 文件流不做处理
    if (response.data instanceof Blob) {
      return response;
    }

    const { status, msg } = response.data;
    if (status !== 200) {
      // message: `错误码${status}：${msg || '未知错误'}`,
      ElMessage({
        message: `${msg || "服务器错误"}`,
        type: "error",
        duration: 5 * 1000,
      });
      try {
        // 后续在token失效就跳转
        switch (status) {
          case 505001:
            removeCookie(TOKEN);
            window.location.replace(
              (import.meta.env.VITE_ENV === "production"
                ? "/#/"
                : "/education/#/") + "login"
            );
            setTimeout(() => {
              window.location.reload();
            }, 1000);
            break;

          default:
            break;
        }
        // return Promise.reject(new Error(msg || '未知错误'))
        return { data: null, status };
      } catch (error) {
        window.location.replace(
          (import.meta.env.VITE_ENV === "production"
            ? "/#/"
            : "/education/#/") + "login"
        );
      }
    } else {
      return response;
    }
  },
  (error) => {
    ElMessage({
      message: error.message,
      type: "error",
      duration: 5 * 1000,
    });
    ElMessage.error(error.message);
    return Promise.reject(error);
  }
);

export default request;
