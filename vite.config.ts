import { fileURLToPath, URL } from 'url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import VueTypeImports from 'vite-plugin-vue-type-imports'

import ElementPlus from 'unplugin-element-plus/vite'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(),
  ElementPlus(), VueTypeImports(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  test: {
    globals: true,
    environment: "jsdom",
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "@/assets/scss/fonts/_fonts.scss";@import "@/assets/scss/mixins.scss";',
      },
    },
  },
})
