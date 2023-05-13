import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import vueJsx from "@vitejs/plugin-vue-jsx";
import path from "path";
import postcssNesting from "postcss-nesting";
import autoprefixer from "autoprefixer";
import flexbugsFixes from "postcss-flexbugs-fixes";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import AutoImport from "unplugin-auto-import/vite";
import topLevelAwait from "vite-plugin-top-level-await";

function resolvePath(src: string) {
  return path.resolve(__dirname, src);
}
// https://vitejs.dev/config/
export default ({ mode, command }) => {
  const env = loadEnv(mode, process.cwd());
  return defineConfig({
    base: env.VITE_ENV === "production" ? "/" : "/education/",
    plugins: [
      vue(),
      AutoImport({
        include: [
          /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
          /\.vue$/,
          /\.vue\?vue/, // .vue
        ],
        imports: ["vue"],
      }),
      vueJsx(),
      createSvgIconsPlugin({
        iconDirs: [resolvePath("src/svgs")],
        symbolId: "svg-[dir]-[name]",
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
      topLevelAwait({
        // The export name of top-level await promise for each chunk module
        promiseExportName: "__tla",
        // The function to generate import names of top-level await promise in each chunk module
        promiseImportName: (i) => `__tla_${i}`,
      }),
    ],
    css: {
      postcss: {
        plugins: [
          postcssNesting,
          autoprefixer({
            overrideBrowserslist: [
              "Android 4.1",
              "iOS 7.1",
              "Chrome > 31",
              "ff > 31",
              "ie >= 8",
              "> 1%",
            ],
            grid: true,
          }),
          flexbugsFixes,
        ],
      },
    },
    resolve: {
      alias: {
        "@": "/src",
      },
    },
    build: {
      minify: "terser",
      sourcemap: env.VITE_BUILD_SOURCEMAP === "true",
      // 消除打包大小超过警告
      chunkSizeWarningLimit: 5000,
      //remote console.log in prod
      terserOptions: {
        //detail to look https://terser.org/docs/api-reference#compress-options
        compress: {
          drop_console: false,
          pure_funcs: ["console.log", "console.info"],
          drop_debugger: true,
        },
      },
      //build assets Separate
      assetsDir: "static/assets",
      rollupOptions: {
        output: {
          chunkFileNames: "static/js/[name]-[hash].js",
          entryFileNames: "static/js/[name]-[hash].js",
          assetFileNames: "static/[ext]/[name]-[hash].[ext]",
        },
      },
    },
    server: {
      open: true,
      port: 8888,
      host: "0.0.0.0",
      proxy: {
        "/sac": {
          target: "http://192.168.100.21:9002",
          changeOrigin: true,
        },
      },
    },
  });
};
