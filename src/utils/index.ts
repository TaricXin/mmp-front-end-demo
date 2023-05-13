import { onBeforeMount, ref } from "vue";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn";
import { LANGUAGE } from "@/utils/constant";
/**
 * @param key cookie的键
 * @param value cookie的值
 * @param expires cookie的过期时间（天数），不传则关闭会话后失效，传参为负数则清除该cookie
 * @param path cookie生效路径范围，默认"/"全局生效
 */
export function setCookie(
  key: string,
  value: string | number,
  expires: number = 1,
  path: string = "/"
) {
  let cookie = `${key}=${value};path=${path}`;
  if (expires !== 0) {
    const date = new Date();
    date.setDate(date.getDate() + expires);
    cookie += `;expires=${date.toUTCString()}`;
  }
  document.cookie = cookie;
}

/**
 * @param key cookie的键
 * @returns cookie的值
 */
export function getCookie(key: string) {
  const reg = new RegExp("(^| )" + key + "=([^;]+)");
  const match = document.cookie.match(reg);
  return match ? match[2] : "";
}

export function removeCookie(key: string) {
  // 根据刷新报错定位到此，原因是因为删除cookie
  setCookie(key, "", -1);
}

/**
 * @param ms 睡眠时间（毫秒）
 * @returns Promise<unknown>
 */
export function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("wake up");
    }, ms);
  });
}
export const getType = (v?: any): string =>
  Object.prototype.toString.call(v).slice(8, -1).toLowerCase();

export const isAllTrue = <T = boolean>(
  arr: T[],
  fn = (p: T): boolean => Boolean(p)
) => arr.every(fn);

export function isMobile() {
  const WIDTH = 992;
  const isMobile = ref(false);
  onBeforeMount(() => {
    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
  });
  onBeforeMount(() => {
    window.removeEventListener("resize", checkIsMobile);
  });
  function checkIsMobile() {
    const rect = document.body.getBoundingClientRect();
    isMobile.value = rect.width < WIDTH;
  }
  return isMobile;
}
// 把驼峰转换成横杠连接
export const toLine = (value: string) => {
  return value.replace(/(A-Z)g/, "-$1").toLocaleLowerCase();
};

// 验证密码的规则
// @ts-ignore
export const checkPassword = function (rule, value, callback) {
  // 密码正则表达式
  const regEmail = /[\u4E00-\u9FA5]|[\uFE30-\uFFA0]|\s/;
  if (!regEmail.test(value)) {
    // True 合法的邮箱
    return callback();
  }
  callback(new Error("请输入6~18位数字或英文组合"));
};

/**
 * 语言设置
 */
export function setLanguage(lang: any) {
  localStorage.setItem(LANGUAGE, lang);
  // 时间国际化
  if (lang === "en") {
    dayjs.locale(lang);
  } else {
    dayjs.locale("zh-cn");
  }
}
export function getLanguage() {
  return localStorage.getItem(LANGUAGE);
}

// 时间格式国际化
export function localTimeFormat(time: any) {
  const locale = localStorage.getItem(LANGUAGE) || "cn";
  return dayjs(time).format(
    locale === "cn" ? "YYYY/MM/DD HH:mm" : "dddd D MMMM YYYY HH:mm"
  );
}

/**
 * 判断终端以及浏览器
 * userAgent string User-Agent信息
 */
interface UADataInter {
  terminal: string;
  browser: string;
  terminalType: TerminalTypeInter;
}
interface TerminalTypeInter {
  trident?: boolean;
  presto?: boolean;
  webKit?: boolean;
  gecko?: boolean;
  mobile?: boolean;
  ios?: boolean;
  android?: boolean;
  iPhone?: boolean;
  iPad?: boolean;
  webApp?: boolean;
  weixin?: boolean;
}

export const readUserAgent = () => {
  const ua = window.navigator.userAgent.toLowerCase();
  let data: UADataInter = {
    terminal: "",
    browser: "",
    terminalType: {},
  };
  data.terminalType = {
    trident: ua.indexOf("Trident") > -1, // IE内核
    presto: ua.indexOf("Presto") > -1, // opera内核
    webKit: ua.indexOf("AppleWebKit") > -1, // 苹果、谷歌内核
    gecko: ua.indexOf("Gecko") > -1 && ua.indexOf("KHTML") === -1, // 火狐内核
    mobile: !!ua.match(/AppleWebKit.*Mobile.*/), // 是否为移动终端
    ios: !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
    android: ua.indexOf("Android") > -1 || ua.indexOf("Adr") > -1, // android终端
    iPhone: ua.indexOf("iPhone") > -1, // 是否为iPhone或者QQHD浏览器
    iPad: ua.indexOf("iPad") > -1, // 是否iPad
    webApp: ua.indexOf("Safari") === -1, // 是否web应该程序，没有头部与底部
    weixin: /MicroMessenger/i.test(ua), // 是否微信
  };

  // 判断品牌
  if (
    data.terminalType.ios ||
    data.terminalType.iPhone ||
    data.terminalType.iPad
  ) {
    data.terminal = "苹果";
  } else if (data.terminalType.android) {
    data.terminal = "安卓";
  } else {
    data.terminal = "PC";
  }

  // 判断浏览器
  if (/msie/i.test(ua) && !/opera/.test(ua)) {
    data.browser = "IE";
  } else if (/firefox/i.test(ua)) {
    data.browser = "Firefox";
  } else if (/chrome/i.test(ua) && /webkit/i.test(ua) && /mozilla/i.test(ua)) {
    data.browser = "Chrome";
  } else if (/opera/i.test(ua)) {
    data.browser = "Opera";
  } else if (/iPad/i.test(ua)) {
    data.browser = "iPad";
  } else if (
    /webkit/i.test(ua) &&
    !(/chrome/i.test(ua) && /webkit/i.test(ua) && /mozilla/i.test(ua))
  ) {
    data.browser = "Safari";
  } else {
    data.browser = "未知";
  }
  return data;
};

/**
 * @param url 解析 URL 参数为 对象
 * @returns queryParams 参数对象格式
 * @returns domainPath  ? 切割符之前的 url 信息
 */
export function parseURLParams(url: string) {
  const queryParamsData = {
    queryParams: {} as any,
    domainPath: "",
  };
  // 判断是否有参数
  if (url.indexOf("?") < 0) return queryParamsData;
  // 分离域名和参数
  let domainAndParams = url.split("?");
  // 参数切分
  queryParamsData.domainPath = domainAndParams[0];
  let queryStr = domainAndParams[1];
  let queryItems = queryStr.split("&");
  // 循环参数，把参数转为键值对
  let queryParams = queryParamsData.queryParams;
  queryItems.forEach((item) => {
    if (item !== "" && item !== undefined) {
      let paramKV = item.split("=");
      // @ts-ignore
      queryParams[paramKV[0]] = paramKV[1];
    }
  });
  // 返回参数键值对
  return queryParamsData;
}

/**
 * @param object 是否空对象
 * @returns boolean
 */
export const isEmptyObj = (obj: object) => {
  return JSON.stringify(obj) === "{}";
};
