<template>
  <div>
    <div class="search_box">
      <p class="page_title">「 精选模型 」</p>
      <p class="page_subtitle">精选模型推荐用语精选模型推荐用语</p>
      <div class="search_content">
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
          style="
            max-width: 65px;
            max-height: 65px;
            width: 3vw;
            height: 3vw;
            cursor: pointer;
          "
        />
      </div>
    </div>

    <div class="type_box">
      <div class="type_item">
        <p class="type_subtitle">Deploy model</p>
        <p class="type_title">发布模型</p>
        <div class="goto_but">
          <el-icon :size="36"><Right /></el-icon>
        </div>
        <div class="type_logo">
          <img :src="type1" alt="" style="width: 84px; height: 92px" />
        </div>
      </div>
      <div class="type_item">
        <p class="type_subtitle">Publish task</p>
        <p class="type_title">发布任务</p>
        <div class="goto_but">
          <el-icon :size="36"><Right /></el-icon>
        </div>
        <div class="type_logo">
          <img :src="type2" alt="" style="width: 84px; height: 92px" />
        </div>
      </div>
      <div class="type_item">
        <p class="type_subtitle">Asset library</p>
        <p class="type_title">资产库</p>
        <div class="goto_but">
          <el-icon :size="36"><Right /></el-icon>
        </div>
        <div class="type_logo">
          <img :src="type3" alt="" style="width: 84px; height: 92px" />
        </div>
      </div>
    </div>

    <div class="main_box">
      <p class="box_title">最新动态</p>
      <p class="box_subtitle">RECENT NEWS</p>
      <div class="info_list">
        <div class="info_item">
          <span class="">深圳大学XX校区XX食堂精细模型</span>
          <span class="new">03/05 17:40 出售成功</span>
        </div>
        <div class="info_item">
          <span class="">深圳大学XX校区XX食堂精细模型</span>
          <span class="new">03/05 17:40 出售成功</span>
        </div>
      </div>
    </div>

    <div class="recommend_bg">
      <div class="recommend_box">
        <p class="box_title">精选推荐</p>
        <p class="box_subtitle">SELECT RECOMMEND</p>

        <div class="recommend_list">
          <div v-for="item in recommend_list" class="flex_item">
            <div class="recommend_item">
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
    </div>

    <div class="information_box">
      <p class="box_title">资讯问答</p>
      <p class="box_subtitle">information Q&a</p>
      <div class="information_content">
        <div
          class="info_item"
          style="min-width: 550px; width: 29vw; left: 1.7vw; top: 5.3vw"
        >
          <span>【MP资讯】进军元宇宙行业，旭庭推出模型套餐</span>
        </div>
        <div
          class="info_item"
          style="min-width: 400px; width: 21vw; left: 42vw; top: 5.3vw"
        >
          <span>Q：如何将模型资产上传并售卖？</span>
        </div>
        <div
          class="info_item"
          style="min-width: 480px; width: 25vw; left: 75vw; top: 5.3vw"
        >
          <span>Q：模型资产购买后可以用做商业用途吗？</span>
        </div>
        <div
          class="info_item"
          style="min-width: 480px; width: 25vw; left: 22vw; bottom: 4.4vw"
        >
          <span>Q：模型资产购买后可以用做商业用途吗？</span>
        </div>
        <div
          class="info_item"
          style="min-width: 480px; width: 25vw; left: 60vw; bottom: 4.4vw"
        >
          <span>Q：模型资产购买后可以用做商业用途吗？</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ArrowDownBold, Right } from "@element-plus/icons-vue";
import searchIcon from "@/assets/home/search_icon.png";
import type1 from "@/assets/home/type1.png";
import type2 from "@/assets/home/type2.png";
import type3 from "@/assets/home/type3.png";
import pre from "@/assets/home/pre.png";
import down from "@/assets/home/down.png";

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
]);
</script>

<style lang="scss" scoped>
.search_box {
  height: 720px;
  max-height: 66.6vh;
  background-image: url("../assets/bg1.png");
  // background-position: center;
  background-size: cover;
  padding-top: 20vh;

  .page_title {
    font-size: 2.4rem;
    font-family: ShiShangZhongHeiJianTi;
    color: #010000;
    text-align: center;
  }

  .page_subtitle {
    text-align: center;
    font-size: 1.8rem;
    font-family: ShiShangZhongHeiJianTi;
    color: #010000;
    opacity: 0.8;
    margin-top: 5.4vh;
  }
  .search_content {
    margin: 10.3vh auto 0;
    display: flex;
    align-items: center;
    width: 67vw;
    height: 109px;
    max-height: 10vh;
    background: #ffffff;
    border-radius: 54px;
    box-shadow: 0px 0px 4px 5px rgb(226 224 222 / 19%);
    overflow: hidden;
    padding-right: 51px;
    .search_type {
      width: 11.7vw;
      max-width: 226px;
      height: 109px;
      max-height: 10vh;
      display: flex;
      align-items: center;
      border-radius: 54px;
      background-color: #f4a132;
      padding: 0 0 4px 14px;
      :deep(.el-select) {
        margin-left: 3px;
        width: 180px;
        .el-input__wrapper {
          background-color: transparent;
          border: unset;
          box-shadow: none !important;

          .el-input__inner {
            font-size: 2rem;
            font-family: Alibaba PuHuiTi;
            font-weight: bold;
            color: #ffffff;
            letter-spacing: 14px;
          }
          .el-select__caret {
            font-size: 2rem;
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
          font-size: 1.6rem;
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
}

.main_box {
  max-width: 1500px;
  padding: 90px 40px 106px;
  margin: auto;
  .box_title {
    text-align: center;
    font-size: 38px;
    font-family: ShiShangZhongHeiJianTi;
    font-weight: 400;
    color: #000000;
  }
  .box_subtitle {
    text-align: center;
    font-size: 20px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: rgb(0 0 0 / 60%);
  }

  .info_list {
    margin-top: 87px;
    display: flex;
    flex-wrap: wrap;
    .info_item {
      width: 50%;
      font-size: 22px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: #000000;
      border-right: 1px solid #999999;
      text-align: center;
      cursor: pointer;
      .news_title {
      }
      .new {
        font-size: 22px;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: #000000;
        opacity: 0.6;
        margin-left: 43px;
      }
    }
    .info_item:nth-child(2) {
      border-right: unset;
    }
  }
}

.type_box {
  background: #faf8f6;
  height: 54vh;
  max-height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
  .type_item {
    width: 24vw;
    max-width: 464.3px;
    height: 252px;
    margin: 27px;
    background: #ffffff;
    box-shadow: 2px 8px 17px 4px rgba(114, 109, 105, 0.19);
    border-radius: 12px;
    cursor: pointer;
    position: relative;
    padding: 41px 39px 35px 41px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .type_title {
      font-size: 30px;
      font-family: ShiShangZhongHeiJianTi;
      font-weight: 400;
      color: #010000;
      margin-bottom: 8px;
    }
    .type_subtitle {
      font-size: 14px;
      font-family: Adobe Heiti Std;
      font-weight: normal;
      color: #908f8f;
    }

    .goto_but {
      background-color: #e1e1e1;
      height: 57px;
      width: 87px;
      border-radius: 28px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .type_logo {
      position: absolute;
      right: 39px;
      bottom: 35px;
    }
  }

  .type_item:nth-child(1) {
    .type_subtitle {
      color: #f4a133;
    }
    .goto_but {
      background-color: rgb(247 238 228);
      color: #f4a133;
    }
  }
}

.recommend_bg {
  background: rgb(244 161 50 / 5%);
  padding: 53px 40px 8px;
  .recommend_box {
    max-width: 1500px;
    text-align: center;
    margin: auto;

    .box_title {
      font-size: 38px;
      font-family: ShiShangZhongHeiJianTi;
      font-weight: 400;
      color: #000000;
    }
    .box_subtitle {
      font-size: 20px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: rgb(0 0 0 / 60%);
    }

    .recommend_list {
      margin-top: 72px;
      display: flex;
      flex-wrap: wrap;
      min-width: 63.3vw;
      .flex_item {
        width: 33.3%;
        display: flex;
      }
      .recommend_item {
        width: 21.1vw;
        min-width: 380px;
        min-height: 290px;
        margin-bottom: 61px;
        box-shadow: 2px 8px 17px 4px rgba(113, 93, 71, 0.27);
        border-radius: 12px;
        position: relative;
        overflow: hidden;
        cursor: pointer;
        .logo {
          background-image: url("../assets/bg2.png");
          background-position: center;
          background-size: cover;
          height: 228px;
        }

        .recommend_details {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 28px;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: #000000;
          height: calc(100% - 228px);
          padding: 0 22px;
        }
      }
      .flex_item:nth-child(3n + 3) {
        justify-content: flex-end;
      }

      .flex_item:nth-child(3n + 2) {
        justify-content: center;
      }
    }
  }
}

.information_box {
  text-align: center;
  margin: auto;
  padding: 0 40px;
  overflow: hidden;
  .box_title {
    margin-top: 78px;
    font-size: 38px;
    font-family: ShiShangZhongHeiJianTi;
    font-weight: 400;
    color: #000000;
  }
  .box_subtitle {
    font-size: 20px;
    font-family: Source Han Sans CN;
    font-weight: 400;
    color: rgb(0 0 0 / 60%);
  }

  .information_content {
    height: 22.5vw;
    position: relative;
    min-height: 380px;

    .info_item {
      position: absolute;
      background-image: url("../assets/home/info1.png");
      background-position: center;
      background-size: 100% 100%;
      height: 5vw;
      min-height: 100px;
      font-size: 1.1rem;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: #000000;
      padding-top: 1.5vw;
    }

    .info_item:nth-child(3),
    .info_item:nth-child(4) {
      background-image: url("../assets/home/info2.png");
    }
  }
}
</style>
