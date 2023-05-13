import { zh as mine } from "./modules/mine";
import { zh as loginandrepasswd } from "./modules/loginAndrepasswd";
import { zh as sidebar } from "./modules/sidebar";

const neo = {
  //我的
  ...mine,
  // 登录
  ...loginandrepasswd,
  // 菜单
  ...sidebar,
};

export default neo;
