import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build:{
    outDir: "build",
    rollupOptions: {
      external: [
        '@devexpress/dx-react-core', 
        '@devexpress/dx-core'
      ]
    }
  },
  server: {
    port: 3000
  },
  css: {
    devSourcemap: true
  },
  

})
