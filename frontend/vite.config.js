import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';

export default defineConfig({
  root: './frontend',  // Set root to the frontend directory
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  build: {
    outDir: '../dist',  // Set output directory for build files
  },
  server: {
    proxy: {
      '/api': 'http://localhost:5000',  // Adjust based on your API
    },
  },
});
