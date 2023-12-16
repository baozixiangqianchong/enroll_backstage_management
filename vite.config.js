import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import vue from '@vitejs/plugin-vue'
import legacy from '@vitejs/plugin-legacy';
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // legacy({
    //   targets: ['defaults', 'not IE 11']
    // }),
    legacy(),
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  // build: {
  //   target: ['es2015', 'chrome63'], // 默认是modules,百度说是更改这个会去输出兼容浏览器，尝试没啥作用，先配置吧
  // },
  base: "./",
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    cors: true, // 或者不设置 cors 选项
    proxy: {
      '/api': {
        // rewrite: (path) => path.replace(/^\/api/, ''),
        rewrite: (path) => path.replace(/^\/api/, ''), // 正确的正则表达式
        target: 'http://39.101.77.206:8181', // 将请求代理到的目标服务器地址
        changeOrigin: true,// 是否开启跨域
      }
    },
  },
})



