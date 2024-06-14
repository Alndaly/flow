import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  build: { sourcemap: true },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src")
    },
  },
  plugins: [react()],
})
