import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
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
