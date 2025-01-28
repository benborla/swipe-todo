import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  // @INFO: Remove this when deploying to another service this is just for github pages
  base: '/swipe-todo/',
  server: {
    port: 3000,
  },

  resolve: {
    alias: {
      // 4. tell vite to resolve `@/` to `src/`
      // "@/": new URL("./src/", import.meta.url).pathname,
      '@': path.resolve(__dirname, './src'),
    },
  },
})
