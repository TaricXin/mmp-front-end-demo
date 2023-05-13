<template>
  <div>
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="密码登录" name="first">
        <el-form :model="form" :rules="rules" ref="RedactForm">
          <el-form-item prop="name">
            <el-input
              v-model.trim="form.name"
              :prefix-icon="Message"
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
          <el-form-item>
            <el-button type="primary" @click="onSubmit" class="signin">{{
              $t("login.login")
            }}</el-button>
          </el-form-item>
          <p style="display: flex; justify-content: space-between">
            <router-link :to="{ name: 'Repassword' }" class="repasswd">
              {{ $t("login.repasswd") }}?
            </router-link>
            <router-link :to="{ name: 'Register' }" class="register">
              学生注册
            </router-link>
          </p>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="短信登录" name="second">
        <el-form :model="form" :rules="rules" ref="RedactForm">
          <el-form-item prop="name">
            <el-input
              v-model.trim="form.name"
              :prefix-icon="Message"
              class="form-input"
              :placeholder="$t('login.iphone')"
              @keyup.enter.native="toPasswdFocus"
            />
          </el-form-item>
          <el-form-item prop="passwd">
            <el-col :span="14">
              <el-form-item prop="date1">
                <el-input
                  v-model="form.passwd"
                  placeholder="Pick a date"
                  style="width: 100%"
                />
              </el-form-item>
            </el-col>
            <el-col :span="9" :offset="1">
              <el-button type="primary" style="float: right"
                >发送验证码</el-button
              >
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit" class="signin">{{
              $t("login.login")
            }}</el-button>
          </el-form-item>
          <p style="display: flex; justify-content: space-between">
            <router-link :to="{ name: 'Repassword' }" class="repasswd">
              {{ $t("login.repasswd") }}?
            </router-link>
            <router-link :to="{ name: 'Register' }" class="register">
              学生注册
            </router-link>
          </p>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="扫码登录" name="third">
        <div style="text-align: center">
          <img :src="qrcode" alt="" />
          <p>使用微信扫一扫登录</p>
        </div>
      </el-tab-pane>
    </el-tabs>
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
import { Message, Lock } from "@element-plus/icons-vue";
import { setLanguage, getLanguage, parseURLParams, getCookie } from "@/utils";
import { handleRedirect } from "@/hooks/useLogin";
// 导入 pinia 实例
import { userStore } from "@/stores/user";
import Logo from "@/assets/common/logo.png";
import qrcode from "@/assets/demo/qrcode.png";
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
// 去除浏览器默认行为--改变输入框
:deep(.el-input__inner:-webkit-autofill) {
  box-shadow: inset 0px 100px #272727;
  -webkit-text-fill-color: #fff;
  caret-color: #fff; // 设置光标颜色
}
.boxs {
  width: 100%;
  height: 100%;
}
// 按键
.signin {
  width: 100%;
}
.form-input {
  --el-input-height: 42px;
}
</style>
