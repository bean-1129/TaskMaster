import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';

export default defineConfig({
  root: './frontend',  
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  build: {
    outDir: './frontend/dist',  
    emptyOutDir: true,          
  },
  server: {
    proxy: {
      '/api': 'https://taskmaster-bb5b.onrender.com',  
    },
  },
});
