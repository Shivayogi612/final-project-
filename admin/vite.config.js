import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()], // Keep only React plugin here
  css: {
    postcss: './postcss.config.js' // Ensure PostCSS is used
  },
  server: { port: 5174 }
})
