import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    port: 666,
    hmr: true,
    proxy: {
      '/admin': {
        target: 'http://172.18.30.23',
        changeOrigin: true,

        //路径重写不能要，因为api文档里需要带路径
        // rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/api': {
        target: 'http://172.18.30.23',
        changeOrigin: true,

        //路径重写不能要，因为api文档里需要带路径
        // rewrite: (path) => path.replace(/^\/api/, ''),
      }
    }
  }
})
