<template>
  <div class="boxs">
    <div class="main">
      <!-- 国际化 -->
      <div class="lang">
        <section class="lang-box">
          <img src="@/assets/common/earth.png" />
          <select
            v-model="langValue"
            placeholder="请选择语言"
            @change="switchLanguage"
          >
            <option label="简体中文" value="cn"></option>
            <option label="English" value="en"></option>
          </select>
        </section>
      </div>
      <!-- logo -->
      <!-- <div class="logo">
        <el-image :src="Logo" fit="contain" />
      </div> -->
      <!-- 表单 -->
      <div style="background: #ffffff; padding: 16px">
        <RouterView />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { setLanguage, getLanguage } from "@/utils";
// 国际化
const langValue = ref(getLanguage() || "cn");
setLanguage(langValue.value);

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
  background-color: #272727;
  display: flex;
  justify-content: center;
  // align-items: center;

  .main {
    width: 300px;
    margin-top: 240px;
    background-color: #272727;
    // 重置密码
    // 按键
    .signin {
      width: 100%;
    }
    // // 输入框
    // :deep(.el-input__wrapper) {
    //   background-color: #272727;
    //   color: #fff;
    // }
    // :deep(.el-input__inner) {
    //   color: #fff;
    // }
    // logo
    .logo {
      display: flex;
      justify-content: center;
      padding: 10px 0;
    }
    // 国际化
    .lang {
      position: fixed;
      top: 60px;
      right: 400px;
    }
    .lang-box {
      margin-bottom: 30px;
      width: 100%;
      position: relative;
      box-sizing: border-box;
      padding: 0 24px;
      img {
        position: absolute;
        width: 16px;
        height: 16px;
        left: 30px;
        top: 8px;
      }
      select {
        outline: none;
        width: 100%;
        height: 32px;
        background: #262626;
        font-size: 14px;
        color: #aaaaaa;
        padding: 0 24px;
        border: 1px solid #484848;
        option {
          background: #484848;
        }
      }
    }
  }
}
</style>
