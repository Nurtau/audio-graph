import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/audio-graph/',
  build: {
    target: 'es2015',
    minify: 'terser',
    sourcemap: true,
  },
  server: {
    port: 3000,
    host: true,
  },
})
