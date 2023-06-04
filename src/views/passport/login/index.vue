<template>
  <div class="form_box">
    <h3>登录您的账户</h3>
    <el-form :model="form" :rules="rules" ref="RedactForm">
      <el-form-item prop="name">
        <el-input
          v-model.trim="form.name"
          :prefix-icon="User"
          class="form-input"
          :placeholder="$t('login.iemail')"
          @keyup.enter.native="toPasswdFocus"
        />
      </el-form-item>
      <el-form-item prop="passwd">
        <el-input
          v-model.trim="form.passwd"
          :prefix-icon="Lock"
          show-password
          class="form-input"
          :placeholder="$t('login.ipasswd')"
          @keyup.enter.native="onSubmit"
          ref="password"
        />
      </el-form-item>
      <el-checkbox v-model="form.checked1" label="记住用户" />
      <el-form-item>
        <el-button type="primary" @click="onSubmit" class="sub_but">{{
          $t("login.login")
        }}</el-button>
      </el-form-item>
      <p class="actions">
        <router-link :to="{ name: 'Register' }" class="routting">
          立即注册
        </router-link>
        <router-link :to="{ name: 'Repassword' }" class="routting">
          忘记密码？
        </router-link>
        <router-link :to="{ name: 'Dashboard' }" class="routting">
          返回首页
        </router-link>
      </p>
      <p class="separator"><span>第三方登录</span></p>
      <div class="roads">
        <img src="@/assets/passport/wechat_logo.png" alt="" />
        <img src="@/assets/passport/qq_logo.png" alt="" />
      </div>
    </el-form>
  </div>
</template>
<script setup lang="ts">
import {
  reactive,
  getCurrentInstance,
  ComponentInternalInstance,
  ref,
} from "vue";
import { useRouter, useRoute } from "vue-router";
import { User, Lock } from "@element-plus/icons-vue";
import { setLanguage, getLanguage, parseURLParams, getCookie } from "@/utils";
import { handleRedirect } from "@/hooks/useLogin";
// 导入 pinia 实例
import { userStore } from "@/stores/user";
import Logo from "@/assets/common/logo.png";
import { TabsPaneContext } from "element-plus";
// 国际化
const langValue = ref(getLanguage() || "cn");
setLanguage(langValue.value);
// this实例
const { proxy } = getCurrentInstance() as ComponentInternalInstance;
// 实例化容器
const mainStore = userStore();
// 实例化路由
const router = useRouter();
const route = useRoute();
// 表单元素
const RedactForm = ref<any>();
// 表单
const form = reactive({
  name: "",
  passwd: "",
  checked1: false,
});

const activeName = ref("first");

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event);
};

// 表单验证
const rules = reactive({
  name: [
    { required: true, message: proxy?.$t("login.pemail"), trigger: "blur" },
    { validator: checkEmail, trigger: "blur" },
  ],
  passwd: [
    { required: true, message: proxy?.$t("login.pepasswd"), trigger: "blur" },
    { validator: checkPassword, trigger: "blur" },
  ],
});
//  密码输入框
const password = ref();
// 验证密码的规则
function checkPassword(rule: any, value: any, callback: any) {
  // 密码正则表达式
  const regEmail = /[\u4E00-\u9FA5]|[\uFE30-\uFFA0]|\s/;
  if (!regEmail.test(value)) {
    // True 合法的邮箱
    return callback();
  }
  callback(new Error(proxy?.$t("myPasswd.index.limitPassword")));
}
// 验证邮箱的规则
function checkEmail(rule: any, value: any, callback: any) {
  // 邮箱正则表达式
  const regEmail =
    /^[- | a-z0-9A-Z . _]+@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\.)+[a-z]{2,}$/;
  if (regEmail.test(value) || value === "admin") {
    // True 合法的邮箱
    return callback();
  }
  callback(new Error(proxy?.$t("myEmail.index.ifEamil")));
}

//图片地址

// 账号输入框焦点转密码输入框
function toPasswdFocus() {
  password.value.focus();
}
/**
 * @name: onSubmit
 * @msg: 登录
 * @return {*}
 */
function onSubmit() {
  router.push({ path: "/dashboard" });
  RedactForm.value.validate((valid: any) => {
    // 判断校验结果
    if (valid) {
      mainStore.login(form.name, form.passwd).then(async (res) => {
        // 判断登录成功
        if (res) {
          // 跳转
          // 有重定向参数 redirectUrl, 修改覆盖 token 值并跳转
          if (route.query?.redirectUrl) {
            return handleRedirect(route.query.redirectUrl as string, () =>
              router.push({ path: "/" })
            );
          }

          router.push({ path: "/" });
        }
      });
    }
  });
}
//切换国际化

const switchLanguage = () => {
  setLanguage(langValue.value);
  window.location.reload();
};
</script>
<style scoped lang="scss">
@import "../form.scss";
</style>
