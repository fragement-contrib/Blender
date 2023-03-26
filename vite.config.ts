import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  server: {
    port: 20000
  },
  build: {
    outDir: "./docs",
    assetsDir: './',
  },
  plugins: [vue(), vueJsx()]
})
