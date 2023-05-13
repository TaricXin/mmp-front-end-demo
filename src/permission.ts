import router from "./router";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { appTitle } from "./appConfig";
import { getCookie, removeCookie } from "./utils";
import { userStore } from "./stores/user";
import { ElMessage } from "element-plus";
import { TOKEN } from "@/utils/constant";

NProgress.configure({ showSpinner: false });

const whitelist: string[] = [
  "/passport/login",
  "/passport/repassword",
  "/passport/register",
  "/404",
  "/dashboard",
];

router.beforeEach(async (to, from, next) => {
  NProgress.start();
  // 设置页面标题
  document.title = `${to.meta.title}-${appTitle}`;

  // 路径命中白名单，放行通过
  if (whitelist.includes(replacePathParams(to.path, to.params))) next();
  else {
    // 判断是否有token
    const token = getCookie(TOKEN);
    const user = userStore();

    if (!token) {
      next("/login");
    } else if (!user.token) {
      try {
        await user.getUserInfo(token);
        next();
      } catch (_) {
        ElMessage.error("token失效，请重新登录");
        // 根据刷新报错定位到此
        removeCookie(TOKEN); // 清除cookie
        next("/login");
      }
    } else {
      next();
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});

function replacePathParams(path: string, params: any): string {
  let rs = path;
  if (!params) {
    return rs;
  }
  for (const iterator of Object.keys(params)) {
    if (rs.indexOf(params[iterator]) > -1) {
      rs = rs.replace(params[iterator], `:${iterator}`);
    }
  }
  return rs;
}
