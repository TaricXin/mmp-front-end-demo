<script setup lang="ts"></script>

<template>
  <el-footer>
    <div class="tips">
      <span class="tip">关于我们</span>
      <span class="tip">版权声明</span>
      <span class="tip">帮助中心</span>
      <span class="tip">其它信息</span>

      <div style="width: 126px;height: 126px;background: #ffffff;margin:85px auto 0;"></div>
      <p class="Copyright">
        Copyright © 2023-现在 版权所有 粤ICP备999999999号-1
      </p>
    </div>
  </el-footer>
</template>

<style scoped lang="scss">
.el-footer {
  height: 553px;
  background: linear-gradient(
    180deg,
    rgba(244, 161, 51, 0.5),
    rgb(245 135 69 / 50%)
  );
  padding: 89px 0 158px;
}

.tips {
  font-size: 22px;
  font-family: Source Han Sans CN;
  font-weight: 500;
  color: #214c93;
  margin: auto;
  text-align: center;
  .tip {
    font-size: 22px;
    font-family: Source Han Sans CN;
    font-weight: 500;
    color: #214c93;
    padding: 0 72px;
    border-right: 1px solid #2967ac;
  }

  .tip:last-child {
    border-right: unset;
  }
}

.Copyright {
  margin-top: 54px;
  font-size: 18px;
  font-family: Source Han Sans CN;
  font-weight: 500;
  color: rgb(0 0 0 / 80%);
  text-align: center;
}
</style>
