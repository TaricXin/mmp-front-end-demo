import { createRouter, createWebHashHistory } from "vue-router";
import Layout from "@/layout/index.vue";
import PassportLayout from "@/views/passport/index.vue";
import { Component, markRaw } from "vue";
import type { RouteRecordRaw } from "vue-router";
import { getLocales } from "../locales";
const locales = getLocales();

declare module "vue-router" {
  interface RouteMeta {
    /**
     * title：菜单名
     */
    title?: string;
    /**
     * icon：菜单图标，值为src/svgs文件夹下相同的名称或者antd图标组件，当值为组件时需要显式导入，并且需要markRow
     */
    icon?: Component | string;
    /**
     * external：是否外部链接，外部链接时需在redirect指定链接地址
     */
    external?: boolean;
    /**
     * breadcrumb：是否显示面包屑，默认true
     */
    breadcrumb?: boolean;
    /**
     * hidden：是否在菜单隐藏
     */
    hidden?: boolean;
    /**
     * keepAlive：是否缓存该路由，只有当页面定义的name和路由定义的name一致时，才能生效
     */
    keepAlive?: boolean;
  }
}

const dashboardRoute: RouteRecordRaw = {
  path: "/",
  component: Layout,
  redirect: "/dashboard",
  meta: { breadcrumb: false },
  children: [
    {
      path: "dashboard",
      name: "Dashboard",
      component: () => import("@/views/dashboard.vue"),
      meta: { title: "首页", icon: "dashboard", isMenu: true },
    },
    {
      path: "dashboard1",
      name: "Dashboard1",
      component: () => import("@/views/dashboard.vue"),
      meta: { title: "模型商城", icon: "dashboard", isMenu: true },
    },
    {
      path: "dashboard2",
      name: "Dashboard2",
      component: () => import("@/views/dashboard.vue"),
      meta: { title: "任务大厅", icon: "dashboard", isMenu: true },
    },
    {
      path: "dashboard3",
      name: "Dashboard3",
      component: () => import("@/views/dashboard.vue"),
      meta: { title: "版权中心", icon: "dashboard", isMenu: true },
    },
    {
      path: "dashboard4",
      name: "Dashboard4",
      component: () => import("@/views/dashboard.vue"),
      meta: { title: "个人中心", icon: "dashboard", isMenu: true },
    },
  ],
};

const constantRoutes: RouteRecordRaw[] = [
  {
    path: "/redirect",
    component: Layout,
    meta: { hidden: true, title: "页面跳转" },
    children: [
      {
        path: "/redirect/:path(.*)",
        component: () => import("@/views/redirect.vue"),
      },
    ],
  },
  {
    path: "/404",
    component: () => import("@/views/404.vue"),
    meta: { hidden: true, title: "404" },
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/404",
    meta: { hidden: true },
  },
  {
    path: "/passport",
    name: "Passport",
    component: PassportLayout,
    meta: { hidden: true },
    children: [
      {
        path: "login",
        name: "Login",
        meta: { hidden: true, title: "登录" },
        component: () => import("@/views/passport/login/index.vue"),
      },
      {
        path: "repassword",
        name: "Repassword",
        component: () => import("@/views/passport/repassword/index.vue"),
        meta: { hidden: true, title: "重置密码" },
      },
      {
        path: "register",
        name: "Register",
        component: () => import("@/views/passport/register/index.vue"),
        meta: { hidden: true, title: "注册" },
      },
    ],
  },
];

const routes: RouteRecordRaw[] = [
  // {
  //   path: "/login",
  //   name: "Login",
  //   component: () => import("@/views/passport/login/index.vue"),
  //   meta: { hidden: true, title: "登陆" },
  // },
  // {
  //   path: "/repassword",
  //   name: "Repassword",
  //   component: () => import("@/views/passport/repassword/repassword.vue"),
  //   meta: { hidden: true, title: "重置密码" },
  // },
];

function markRawWrap(routes: RouteRecordRaw[]) {
  routes.forEach((route) => {
    if (route.meta?.icon && typeof route.meta.icon !== "string") {
      route.meta.icon = markRaw(route.meta.icon);
    }
    if (route.children && route.children.length > 0) {
      markRawWrap(route.children);
    }
  });
  return routes;
}

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: markRawWrap([dashboardRoute, ...routes, ...constantRoutes]),
});

export default router;
