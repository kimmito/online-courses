import { defineConfig } from 'vite'

export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
})