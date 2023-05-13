<template>
  <div class="logo">
    <h2>学生注册</h2>
  </div>
  <div>
    <el-form :model="form" :rules="rules" ref="RedactForm">
      <!-- 邮件 -->
      <el-form-item prop="email">
        <el-input
          v-model.trim="form.email"
          class="input"
          :placeholder="$t('repasswd.iemail')"
        />
      </el-form-item>
      <!-- 验证码 -->
      <el-form-item prop="emailVerificationCode">
        <el-input
          v-model="form.emailVerificationCode"
          class="input"
          :placeholder="$t('repasswd.icode')"
        >
          <!-- 验证码 -->
          <template #append>
            <el-button text class="code-font" @click="onCode">
              {{
                codeInit == true
                  ? $t("repasswd.sendCode")
                  : codeNum == 60
                  ? $t("repasswd.resendCode")
                  : $t("repasswd.seconds", codeNum)
              }}
            </el-button>
          </template>
        </el-input>
      </el-form-item>
      <!-- 密码 -->
      <el-form-item prop="changePassword">
        <el-input
          v-model.trim="form.changePassword"
          show-password
          :placeholder="$t('repasswd.sizePassword')"
          class="input"
          autocomplete="new-password"
        />
      </el-form-item>
      <!-- 再次输入密码 -->
      <el-form-item prop="changePasswordTo">
        <el-input
          v-model.trim="form.changePasswordTo"
          show-password
          :placeholder="$t('repasswd.iiPassword')"
          class="input"
          autocomplete="new-password"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit" class="signin">{{
          $t("repasswd.confirm")
        }}</el-button>
      </el-form-item>
      <p style="display: flex; justify-content: flex-end">
        <span>
          已有账号？
          <router-link :to="{ name: 'Login' }" class="login">
            去登录
          </router-link>
        </span>
      </p>
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
import { useRouter } from "vue-router";
import { Back } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import request from "@/utils/request";
import { checkPassword } from "@/utils/index";
// this实例
const { proxy } = getCurrentInstance() as ComponentInternalInstance;
// 实例化路由
const route = useRouter();
// 跳转上一页
function goBack() {
  route.go(-1);
}
// 表单元素
const RedactForm = ref<any>(null);
// 表单
const form = reactive({
  email: "",
  emailVerificationCode: "",
  changePassword: "",
  changePasswordTo: "",
});
// 表单验证
const rules = reactive({
  email: [
    { required: true, message: proxy?.$t("repasswd.noemail"), trigger: "blur" },
    { validator: checkEmail, trigger: "blur" },
  ],
  emailVerificationCode: [
    { required: true, message: proxy?.$t("repasswd.nocode"), trigger: "blur" },
  ],
  changePassword: [
    {
      required: true,
      message: proxy?.$t("repasswd.nopasswd"),
      trigger: "blur",
    },
    {
      min: 6,
      max: 18,
      message: proxy?.$t("repasswd.setlimitpasswd"),
      trigger: "blur",
    },
    { validator: checkPassword, trigger: "blur" },
  ],
  changePasswordTo: [
    {
      required: true,
      message: proxy?.$t("repasswd.Nnopasswd"),
      trigger: "blur",
    },
    {
      min: 6,
      max: 18,
      message: proxy?.$t("repasswd.setlimitpasswd"),
      trigger: "blur",
    },
    { validator: checkPassword, trigger: "blur" },
  ],
});
/**
 * @name: onSubmit
 * @msg: 登录
 * @return {*}
 */
function onSubmit() {
  RedactForm.value.validate((valid: boolean) => {
    // 判断校验结果
    if (valid) {
      if (form.changePassword === form.changePasswordTo) {
        request
          .post("/sac/cuc/userAccount/forgetPassword", {
            changePassword: form.changePassword,
            changePasswordTo: form.changePasswordTo,
            email: form.email,
            emailVerificationCode: form.emailVerificationCode,
          })
          .then((res) => {
            const { status, success } = res.data;
            if (status === 200 && success === true) {
              // 提示
              ElMessage.success({
                message: proxy?.$t("repasswd.passwdoktologin"),
              });
              setTimeout(() => {
                // 跳到登录
                route.push({ name: "Login" });
              }, 1000);
            }
          });
      } else {
        // 清空
        form.changePassword = "";
        form.changePasswordTo = "";
        ElMessage({
          message: proxy?.$t("repasswd.twopasswd"),
          type: "warning",
        });
      }
    }
  });
}
// 验证码
// 定时器
let timer: any;
// 是否第一次
let codeInit = ref(true);
// 秒数
let codeNum = ref(59);
// 是否禁用
const codeDis = ref(true);
function onCode() {
  // 判断是否点击过
  if (!codeDis.value) {
    return;
  }
  //判断是否输入邮箱
  RedactForm.value.validateField("email", (valid: boolean) => {
    if (valid) {
      // 发送验证码
      request
        .post("/sac/cuc/userAccount/sendPlatformEmailVerifyCode", {
          email: form.email,
          requestUser: false,
          templateCode: "MT000014",
        })
        .then((res) => {
          const { data, status, success } = res.data;
          if (data && success) {
            ElMessage({
              message: proxy?.$t("repasswd.sendcodeok"),
              type: "success",
            });
            // 标记不是初始化
            codeInit.value = false;
            // 标记点击过
            codeDis.value = false;
            timer = setInterval(() => {
              // 判断是否小于0
              if (codeNum.value <= 1) {
                clearInterval(timer);
                // 重新设置60秒
                codeNum.value = 60;
                // 开启点击
                codeDis.value = true;
              } else {
                codeNum.value--;
              }
            }, 1000);
          }
        });
    }
  });
}
// 验证邮箱的规则
function checkEmail(rule: any, value: any, callback: any) {
  // 邮箱正则表达式
  const regEmail = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  if (regEmail.test(value)) {
    // True 合法的邮箱
    return callback();
  }
  callback(new Error(proxy?.$t("myEmail.index.ifEamil")));
}
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
  background-color: #272727;
  display: flex;
  justify-content: center;
  // align-items: center;
  // 去除浏览器默认行为--改变输入框
  :deep(.el-input__inner:-webkit-autofill) {
    box-shadow: inset 0px 100px #272727;
    -webkit-text-fill-color: #fff;
  }
  // 按键
  .signin {
    width: 100%;
  }

  .logo {
    text-align: center;
    margin-bottom: 16px;
  }

  // 输入框
  :deep(.el-input__wrapper) {
    background-color: #272727;
    color: #fff;
  }
  :deep(.el-input__inner) {
    color: #fff;
  }
  // 验证码
  .code-font {
    background-color: transparent;
    color: #286de1;
  }
  :deep(.el-input-group__append) {
    background: transparent;
  }
}
</style>
