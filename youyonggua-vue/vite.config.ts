import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import legacy from '@vitejs/plugin-legacy';
import ViteCompression from 'vite-plugin-compression';
import ViteComponents from 'unplugin-vue-components/vite';
// import { viteMockServe } from 'vite-plugin-mock'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers';
import {
  EleAdminResolver,
  eleStyleDeps,
  antStyleDeps
} from 'ele-admin-pro/lib/utils/resolvers';
import { DynamicAntdLess } from 'ele-admin-pro/lib/utils/dynamic-theme';
import { resolve } from 'path';

export default defineConfig(({ command }) => {
  const isBuild = command === 'build';
  return {
    resolve: {
      alias: {
        '@/': resolve(__dirname, 'src') + '/',
        'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js'
      }
    },
    plugins: [
      vue(),
      // viteMockServe({
      //   mockPath: "mock", // 指定mock文件的路径
      //   localEnabled: command === "serve", // 根据命令行参数决定是否开启本地存储
      // }),
      // 组件按需引入
      ViteComponents({
        dts: false,
        resolvers: [
          AntDesignVueResolver({
            importStyle: 'less'
          }),
          EleAdminResolver({
            importStyle: true
          })
        ]
      }),
      // 打包gzip压缩
      ViteCompression({
        disable: !isBuild,
        threshold: 10240,
        algorithm: 'gzip',
        ext: '.gz'
      }),
      // 兼容低版本浏览器
      legacy({
        targets: ['Chrome 63'],
        modernPolyfills: true
      })
    ],
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          plugins: [new DynamicAntdLess()]
        }
      }
    },
    optimizeDeps: {
      include: [
        ...antStyleDeps,
        ...eleStyleDeps,
        'ant-design-vue',
        'ant-design-vue/es',
        'ele-admin-pro',
        'ele-admin-pro/es',
        '@ant-design/icons-vue',
        'vuedraggable',
        'dayjs',
        // 'statistics/core',
        // 'statistics/charts',
        // 'statistics/renderers',
        // 'statistics/components',
        // 'vue-statistics',
        // 'statistics-wordcloud',
        // 'xlsx'
      ]
    },
    build: {
      target: 'chrome63'
    }
  };
});
