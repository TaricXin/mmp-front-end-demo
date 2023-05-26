<template>
  <section>
    <div class="search_box">
      <div class="search_type">
        <el-select :model-value="1" size="large" :suffix-icon="ArrowDownBold">
          <el-option label="模型" :value="1" />
          <el-option label="任务" :value="2" />
        </el-select>
      </div>
      <el-input
        v-model="data.name"
        class="search_input"
        placeholder="按模型名称或关键词搜索"
      />
      <img
        :src="searchIcon"
        alt=""
        style="width: 65px; height: 65px; cursor: pointer"
      />
    </div>

    <div class="main_box">
      <div class="main_bg"></div>
      <div class="info_box">
        <div class="type_list">
          <div class="type_item">
            <div>
              <img :src="type1" alt="" />
              <p>发布模型</p>
            </div>
          </div>
          <div class="type_item">
            <div>
              <img :src="type2" alt="" />
              <p>发布任务</p>
            </div>
          </div>
          <div class="type_item">
            <div>
              <img :src="type3" alt="" />
              <p>资产库</p>
            </div>
          </div>
        </div>

        <div class="news_list">
          <p class="news_title">最新动态</p>
          <p class="new_item" v-for="item in news">
            <span class="new">{{ item.l1 }}</span>
            <span class="aciton">{{ item.l2 }}</span>
          </p>
        </div>
      </div>
    </div>

    <div class="recommend_bg">
      <div class="recommend_box">
        <p class="box_title">精选推荐</p>
        <p class="box_subtitle">SELECT RECOMMEND</p>

        <div class="recommend_list">
          <div v-for="item in recommend_list" class="recommend_item">
            <div class="logo"></div>
            <div class="recommend_details">
              <div style="display: flex; align-items: center">
                <span
                  style="
                    display: block;
                    width: 27px;
                    height: 27px;
                    background-color: #f4a133;
                    margin-right: 8px;
                  "
                ></span>
                Aurora
              </div>
              <span style="display: flex; align-items: center">
                <img :src="pre" alt="" style="margin-right: 6px" />
                2090
              </span>
              <span style="display: flex; align-items: center">
                <img :src="down" alt="" style="margin-right: 6px" />
                90
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="information_box">
      <p class="box_title">资讯问答</p>
      <p class="box_subtitle">information Q&a</p>
      <div class="information_content">
        <div class="info_item" style="width: 35.73vw; left: 0; top: 3.2vw">
          <span>【MP资讯】进军元宇宙行业，旭庭推出模型套餐</span>
        </div>
        <div
          class="info_item"
          style="width: 25.83vw; right: 19.58vw; top: 3.2vw"
        >
          <span>Q：如何将模型资产上传并售卖？</span>
        </div>
        <div
          class="info_item"
          style="width: 31vw; left: 28.18vw; bottom: 4.4vw"
        >
          <span>Q：模型资产购买后可以用做商业用途吗？</span>
        </div>
        <div class="info_item" style="width: 23vw; right: -10px; bottom: 4.4vw">
          <span>Q：模型资产购买后可以用做商业用途吗？</span>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import { ArrowDownBold } from "@element-plus/icons-vue";
import searchIcon from "@/assets/home/search_icon.png";
import type1 from "@/assets/home/type1.png";
import type2 from "@/assets/home/type2.png";
import type3 from "@/assets/home/type3.png";
import pre from "@/assets/home/pre.png";
import down from "@/assets/home/down.png";
import info2 from "@/assets/home/info2.png";

const data = ref({
  name: "",
});

const news = ref([
  { l1: "深圳大学XX食堂精细模型", l2: "出售成功" },
  { l1: "深圳湾体育馆最新模型", l2: "最新发布" },
  { l1: "深圳大学XX食堂精细模型", l2: "出售成功" },
  { l1: "大学城园区模型任务", l2: "任务完成" },
  { l1: "深圳大学XX食堂精细模型", l2: "出售成功" },
]);
const recommend_list = ref([
  { l1: "深圳大学XX食堂精细模型", l2: "出售成功" },
  { l1: "深圳湾体育馆最新模型", l2: "最新发布" },
  { l1: "深圳大学XX食堂精细模型", l2: "出售成功" },
  { l1: "大学城园区模型任务", l2: "任务完成" },
  { l1: "深圳大学XX食堂精细模型", l2: "出售成功" },
  { l1: "深圳大学XX食堂精细模型", l2: "出售成功" },
]);
</script>

<style lang="scss" scoped>
.search_box {
  width: 67vw;
  margin: auto;
  height: 109px;
  background: #ffffff;
  border-radius: 54px;
  margin-top: 56px;
  box-shadow: 0px 0px 4px 5px rgb(226 224 222 / 19%);
  overflow: hidden;
  display: flex;
  align-items: center;
  padding-right: 51px;
  .search_type {
    width: 226px;
    height: 109px;
    display: flex;
    align-items: center;
    border-radius: 54px;
    background-color: #f4a132;
    padding: 0 13px 0 28px;
    :deep(.el-select) {
      margin-left: 3px;
      width: 180px;
      .el-input__wrapper {
        background-color: transparent;
        border: unset;
        box-shadow: none !important;

        .el-input__inner {
          font-size: 36px;
          font-family: Alibaba PuHuiTi;
          font-weight: bold;
          color: #ffffff;
          letter-spacing: 14px;
        }
        .el-select__caret {
          font-size: 36px;
          color: #ffffff;
        }
      }
    }
  }

  :deep(.search_input) {
    .el-input__wrapper {
      box-shadow: none !important;
      padding: 0 66px;
      .el-input__inner {
        outline: 0;
        font-size: 32px;
        font-family: Alibaba PuHuiTi;
        font-weight: 400;
        color: #000000;
        height: 54px;
      }
      .el-input__inner::placeholder {
        letter-spacing: 10px;
        color: rgb(0 0 0 / 30%);
      }
    }
  }
}

.main_box {
  display: flex;
  max-width: 85vw;
  margin: 119px auto 104px;
  .main_bg {
    flex: 1;
    min-height: 29.5vw;
    box-shadow: 1px 7px 12px 1px rgba(114, 109, 105, 0.41);
    background-image: url("../assets/bg1.png");
    background-position: center;
    background-size: cover;
  }

  .info_box {
    padding-left: 42px;
    width: 32vw;
    .type_list {
      display: flex;
      justify-content: space-between;
      .type_item {
        width: 7.6vw;
        height: 7.6vw;
        box-shadow: 0px 2px 9px 1px rgba(114, 109, 105, 0.14);
        border-radius: 10px;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        img {
          width: 3.59vw;
          height: 3.59vw;
        }
        p {
          font-size: 22px;
          font-family: Alibaba PuHuiTi;
          font-weight: 500;
          color: #010000;
        }
      }
    }

    .news_list {
      margin-top: 1.9vw;
      padding: 1.3vw 1.9vw;
      box-shadow: 0px 2px 9px 1px rgba(114, 109, 105, 0.14);
      border-radius: 10px;
      .news_title {
        font-size: 40px;
        font-family: ShiShangZhongHeiJianTi;
        font-weight: 400;
        color: #000000;
      }
      .new_item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 1.5vw;
        font-size: 1.5rem;
        font-family: Source Han Sans CN;
        font-weight: 400;
        .new {
          color: #000000;
        }
        .aciton {
          color: #000000;
        }
      }
    }
  }
}

.recommend_bg {
  background: rgb(244 161 50 / 5%);
  padding: 53px 0 8px;
  .recommend_box {
    max-width: 85vw;
    text-align: center;
    margin: auto;

    .box_title {
      font-size: 50px;
      font-family: ShiShangZhongHeiJianTi;
      font-weight: 400;
      color: #000000;
    }
    .box_subtitle {
      font-size: 28px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: rgb(0 0 0 / 60%);
    }

    .recommend_list {
      margin-top: 72px;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      .recommend_item {
        width: 24vw;
        min-height: 17.2vw;
        margin-bottom: 102px;
        box-shadow: 2px 8px 17px 4px rgba(113, 93, 71, 0.27);
        border-radius: 12px;
        position: relative;
        overflow: hidden;
        cursor: pointer;
        .logo {
          background-image: url("../assets/bg2.png");
          background-position: center;
          background-size: cover;
          height: 13vw;
        }

        .recommend_details {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 28px;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: #000000;
          height: calc(100% - 13vw);
          padding: 0 22px;
        }
      }
    }
  }
}

.information_box {
  max-width: 85vw;
  text-align: center;
  margin: auto;
  .box_title {
    margin-top: 86px;
    font-size: 50px;
    font-family: ShiShangZhongHeiJianTi;
    font-weight: 400;
    color: #000000;
  }
  .box_subtitle {
    font-size: 28px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: rgb(0 0 0 / 60%);
  }

  .information_content {
    min-height: 26.2vw;
    position: relative;

    .info_item {
      position: absolute;
      background-image: url("../assets/home/info1.png");
      background-position: center;
      background-size: 100% 100%;
      min-height: 8vw;
      font-size: 1.1rem;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: #000000;
      padding-top: 2vw;
    }

    .info_item:nth-child(3) {
      background-image: url("../assets/home/info2.png");
    }
  }
}
</style>
