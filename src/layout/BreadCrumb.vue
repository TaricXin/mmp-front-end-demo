<script setup lang="ts">
import { onBeforeMount, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import type {
  RouteLocationMatched,
  RouteLocationNormalizedLoaded,
} from "vue-router";

const route = useRoute();
const router = useRouter();
const routeMatched = ref<RouteLocationMatched[]>([]);
const props = withDefaults(
  defineProps<{
    withIcons?: boolean;
  }>(),
  {
    withIcons: false,
  }
);

onBeforeMount(() => refreshBreadCrumb(route));
watch(route, refreshBreadCrumb);

function refreshBreadCrumb(route: RouteLocationNormalizedLoaded) {
  routeMatched.value = route.matched.filter(
    (item) => item.meta.breadcrumb !== false
  );
  if (routeMatched.value.length === 0) return;
}
</script>

<template>
  <ElBreadcrumb separator="|">
    <ElBreadcrumbItem v-for="(route, index) in routeMatched" :key="route.path">
      <span>
        <a
          v-if="index < routeMatched.length - 1"
          @click="router.go(index - routeMatched?.length + 1)"
          >&nbsp;{{ route.meta.title }}</a
        >
        <span v-else>&nbsp;{{ route.meta.title }}</span>
      </span>
    </ElBreadcrumbItem>
  </ElBreadcrumb>
</template>
<style lang="scss">
.el-breadcrumb__separator {
  font-weight: 200 !important;
  margin: 0 7px 0 12px !important;
}
</style>
