import { parseURLParams, getCookie, isEmptyObj, removeCookie } from "@/utils";
import { TOKEN } from "@/utils/constant";
/**
 * 解析相对 url 为绝对 url
 * @param {string} url
 */
export const parseUrl2Pathname = (url: string) => {
  if (typeof document === "undefined") {
    return url;
  }

  if (!url) return "";

  const redirect = url || ".";
  const redirectAnchor = document.createElement("a");
  redirectAnchor.href = redirect;

  return redirectAnchor as HTMLAnchorElement;
};

/**
 * 处理重定向跳转
 * @tips 如果跳转为直播页面，则更新token
 */
export const handleRedirect = (url: string, callback = () => {}) => {
  let redirectUrl = url;
  const urlSplitInfo = parseURLParams(decodeURIComponent(redirectUrl));

  if (!urlSplitInfo.domainPath) return callback && callback();

  const url2ATag = parseUrl2Pathname(urlSplitInfo.domainPath);
  if (!url2ATag) return callback && callback();

  let targetUrl = urlSplitInfo.domainPath;
  let queryArr = [];

  // @ts-ignore
  if (
    /\/interaction/.test(url2ATag.pathname) &&
    /\/lived/.test(url2ATag.hash)
  ) {
    urlSplitInfo.queryParams.token = getCookie(TOKEN);

    for (const queryKey in urlSplitInfo.queryParams) {
      if (
        Object.prototype.hasOwnProperty.call(urlSplitInfo.queryParams, queryKey)
      ) {
        queryArr.push(`${queryKey}=${urlSplitInfo.queryParams[queryKey]}`);
      }
    }
  }

  targetUrl = `${targetUrl}${queryArr.length ? "?" + queryArr.join("&") : ""}`;

  return (window.location.href = targetUrl);
};

/**
 * 处理从直播跳转 login 优先清除 token
 */
export const RemoveTokenFirstFromLived = () => {
  if (!window || !window.location || !window.location.href) return;

  const parseHref = parseURLParams(window.location.href);

  if (isEmptyObj(parseHref.queryParams)) return;

  const queryArr = Object.keys(parseHref.queryParams);

  let needClearToken = false;
  if (queryArr.includes("redirectUrl")) {
    const parseRedirect = parseURLParams(
      decodeURIComponent(parseHref.queryParams.redirectUrl)
    );
    if (isEmptyObj(parseRedirect.queryParams) || !parseRedirect.domainPath)
      return;

    if (!parseRedirect.domainPath) return;

    const url2ATag = parseUrl2Pathname(parseRedirect.domainPath);
    if (!url2ATag) return;

    // @ts-ignore
    if (
      /\/interaction/.test(url2ATag.pathname) &&
      /\/lived/.test(url2ATag.hash)
    ) {
      needClearToken = true;
    }
  }

  if (needClearToken) {
    removeCookie(TOKEN);
  }
};
