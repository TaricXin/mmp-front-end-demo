<script setup lang="ts">
import { inject } from "vue";
import { RouteRecordRaw, useRoute, useRouter } from "vue-router";
import { userStore } from "../stores/user";
import Logo from "@/assets/common/navigation_logo.png";
import UserLogo from "@/assets/home/user_logo.png";
import College from "@/assets/home/college.png";
import Home from "@/assets/home/home.png";
import ShoppingCart from "@/assets/home/shopping_cart.png";
import BreadCrumb from "./BreadCrumb.vue";
import { storeToRefs } from "pinia";
import { useI18n } from "vue-i18n";

const loading = inject<Layout.Loading>("loading");
const keepAlivePages = inject<Layout.keepAlivePages>("keepAlivePages");
const router = useRouter();
const routesList = getAllShowRoute([...router.options.routes]);
const route = useRoute();
const defaultActive = ref<string>(route.path); // 菜单默认选中项
const user = userStore();
const { avatar, nickName } = storeToRefs(user);
const { t } = useI18n();

watch(route, (currentRoute) => {
  defaultActive.value = currentRoute.path;

  // 如果该路由设置页面缓存则推进缓存组
  if (
    currentRoute.meta.keepAlive &&
    !keepAlivePages?.has(currentRoute.name as string)
  ) {
    keepAlivePages?.add(currentRoute.name as string);
  }
});

function logout() {
  if (loading) loading.logout = true;
  // user.logout(t("sidebar.Logoutsucceeded")).then((_) => {
  //   router.replace("/passport/login");
  // });
  router.replace("/passport/login");
}

function getAllShowRoute(
  routes: RouteRecordRaw[],
  parentRoute = ""
): RouteRecordRaw[] {
  let _routes: RouteRecordRaw[] = [];
  routes.forEach((route) => {
    if (route.meta && route.meta.isMenu) {
      _routes.push({ ...route, path: parentRoute + route.path });
    }
    if (route.children && route.children?.length! > 0) {
      _routes = [
        ..._routes,
        ...getAllShowRoute(
          route.children,
          route.path === "/" ? "" : route.path
        ),
      ];
    }
  });
  return _routes;
}
</script>

<template>
  <el-header :height="'90px'">
    <div class="header_box">
      <div class="header_content">
        <div class="logo_box">
          <el-image
            class="logo"
            :src="Logo"
            fit="contain"
            @click="router.push('/')"
          />
          <div class="route-tabs">
            <span
              class="route-tab"
              :class="{ acvite: defaultActive.indexOf(item.path) > -1 }"
              v-for="item in routesList"
              @click="router.push(item.path)"
            >
              {{ item.meta?.title || item.name }}
            </span>
          </div>
        </div>

        <div class="options">
          <div class="option">
            <img
              :src="Home"
              alt=""
              style="
                width: 32px;
                height: 29px;
                margin-right: 25px;
                margin-top: 2px;
              "
            />
            <img
              :src="ShoppingCart"
              alt=""
              style="width: 31px; height: 31px; margin-right: 25px"
            />
            <img
              :src="College"
              alt=""
              style="
                width: 30px;
                height: 28px;
                margin-right: 45px;
                margin-top: 3px;
              "
            />
            <el-avatar
              :size="30"
              :src="
                UserLogo ||
                'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
              "
              class="o_icon"
              @click="logout"
            />
            <span class="o_label">admin</span>
          </div>
        </div>
      </div>
    </div>
    <div class="breadcrumb_box" v-if="route.meta.isBreadcrumb">
      <BreadCrumb :withIcons="true"></BreadCrumb>
    </div>
  </el-header>
</template>

<style scoped lang="scss">
.el-header {
  background: #f7f7f7;
  --el-header-padding: 0;
  z-index: 99;
  .header_box {
    background: #ffffff;
    box-shadow: 2px 7px 12px 1px rgba(114, 109, 105, 0.19);
    position: relative;
    height: 90px;
    min-width: 1230px;
    .header_content {
      height: 90px;
      max-width: 1700px;
      padding: 0 40px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: nowrap;
      z-index: 99;
      .logo_box {
        height: 90px;
        display: flex;
        align-items: center;
        .logo {
          width: 172px;
          height: 39px;
          cursor: pointer;
        }
      }

      .route-tabs {
        margin-left: 62px;
        display: flex;
        align-items: center;
        justify-content: center;
        .route-tab {
          margin: 0 12px;
          padding: 0 12px;
          display: block;
          text-align: center;
          line-height: 48px;
          font-size: 20px;
          font-family: Alibaba PuHuiTi;
          font-weight: 400;
          color: #000000;
          cursor: pointer;
        }

        .route-tab.acvite {
          // background: #f4f9e5;
          border-bottom: 3px solid #f4a133;
          font-weight: bold;
          color: #000001;
        }
        .route-tab:last-child {
          min-width: 114px;
        }
      }

      .route_title {
        font-size: 24px;
        font-family: PingFang SC-Medium, PingFang SC;
        font-weight: 500;
        color: #19182f;
      }
      .options {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        min-width: 260px;
        .option {
          display: flex;
          align-items: center;
          cursor: pointer;

          .o_icon {
            margin-right: 13px;
          }

          .o_label {
            font-size: 18px;
            font-family: Alibaba PuHuiTi;
            font-weight: 400;
            color: #214c93;
            max-width: 100px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
    }
  }

  .breadcrumb_box {
    height: 66px;
    padding: 0 40px;
    display: flex;
    align-items: center;
    margin: 0 auto;
    max-width: 1700px;
  }
}

.back_item {
  border-left: 1px solid #eaeaea;
  height: 22px;
  margin-left: 12px;
  padding-left: 12px;
  font-size: 16px;
  font-family: PingFang SC-Regular, PingFang SC;
  color: #19182f;
  cursor: pointer;
}
</style>
