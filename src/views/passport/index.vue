<template>
  <div class="boxs">
    <div class="main">
      <!-- logo -->
      <div class="logo">
        <div>
          <img
            src="@/assets/passport/login_logo.png"
            style="width: 453px; margin: 0 50px; max-width: 56%"
          />
          <div
            style="
              border-bottom: 1px dashed #130b00;
              width: 603px;
              margin-top: 84px;
              max-width: 67%;
            "
          ></div>
          <p
            style="
              font-size: 28px;
              font-family: Adobe Heiti Std;
              font-weight: normal;
              color: #010000;
              opacity: 0.4;
              margin-top: 26px;
            "
          >
            构建数字孪生底座 推动产业升级转型
          </p>
        </div>
      </div>
      <!-- 表单 -->
      <div class="passport_box">
        <RouterView />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
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
  display: flex;
  justify-content: center;
  // align-items: center;
  overflow: auto;

  .main {
    display: flex;
    align-items: center;
    padding-bottom: 24px;
    max-width: 68vw;
    width: 100%;
    min-height: 622px;
    // logo
    .logo {
      display: flex;
      align-items: center;
      padding: 10px 0;
      flex: 1;
    }

    .passport_box {
      padding-right: 16px;
    }
  }
}
</style>
