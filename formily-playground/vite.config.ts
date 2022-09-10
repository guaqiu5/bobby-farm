import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {resolve} from 'path'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      less: {
        // 支持内联 JavaScript
        javascriptEnabled: true,
      }
    }
  },
  resolve:{
    alias: [
      { find: '@', replacement: resolve(__dirname, 'src') },
      { find: 'public', replacement: resolve(__dirname, 'src/public') },
      { find: 'components', replacement: resolve(__dirname, 'src/public/components') },
      { find: 'pages', replacement: resolve(__dirname, 'src/pages') },
      { find: 'stylesheets', replacement: resolve(__dirname, 'src/stylesheets') },
      { find: /^~/, replacement: '' },
    ],
  }
  
})
