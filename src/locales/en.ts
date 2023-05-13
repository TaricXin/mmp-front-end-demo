import { en as mine } from "./modules/mine";
import { en as loginandrepasswd } from "./modules/loginAndrepasswd";
import { en as sidebar } from "./modules/sidebar";

const neo = {
  //我的
  ...mine,
  // 登录
  ...loginandrepasswd,
  // 菜单
  ...sidebar,
};

// 模板使用示例语法  {{$t('assessment.index.student')}}

export default neo;
