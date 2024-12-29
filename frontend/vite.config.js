import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';

export default defineConfig({
  root: 'frontend',  // Ensure this points to the frontend directory, not './frontend'
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  build: {
    outDir: './frontend/dist',  // Ensure dist is generated inside the frontend directory
    emptyOutDir: true,          // Clean the dist folder before each build
  },
  server: {
    proxy: {
      '/api': 'https://taskmaster-bb5b.onrender.com',  // Proxy for API requests
    },
  },
});
