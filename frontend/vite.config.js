import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from 'tailwindcss'

export default defineConfig({
  plugins: [react()],
  root: './frontend', // This tells Vite where the root directory is
  build: {
    outDir: './dist', // Make sure to specify the correct build output directory
    rollupOptions: {
      input: './frontend/index.html', // Ensure this points to the correct entry point
    },
  },
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
})
