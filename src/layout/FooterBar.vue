<script setup lang="ts"></script>

<template>
  <el-footer>
    <div class="tips">
      <span class="tip">关于我们</span>
      <span class="tip">版权声明</span>
      <span class="tip">帮助中心</span>
      <span class="tip">其它信息</span>

      <div
        style="
          width: 134px;
          height: 134px;
          background: #ffffff;
          margin: 70px auto 0;
        "
      ></div>
      <p class="Copyright">
        Copyright © 2023-现在 版权所有 粤ICP备999999999号-1
      </p>
    </div>
  </el-footer>
</template>

<style scoped lang="scss">
.el-footer {
  height: 424px;
  background: linear-gradient(
    180deg,
    rgb(244 161 51 / 40%),
    rgba(245, 135, 69, 0.4)
  );
  padding: 89px 0 47px;
}

.tips {
  font-size: 22px;
  font-family: Source Han Sans CN;
  font-weight: 500;
  color: #000;
  margin: auto;
  text-align: center;
  .tip {
    font-size: 22px;
    font-family: Source Han Sans CN;
    font-weight: 500;
    color: #000;
    padding: 0 72px;
    border-right: 1px solid #000;
  }

  .tip:nth-child(4) {
    border-right: unset;
  }
}

.Copyright {
  margin-top: 28px;
  font-size: 18px;
  font-family: Source Han Sans CN;
  font-weight: 500;
  color: rgb(0 0 0 / 80%);
  text-align: center;
}
</style>
