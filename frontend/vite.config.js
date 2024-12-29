import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";
import path from "path";

export default defineConfig({
  root: path.resolve(__dirname, "frontend"), 
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  build: {
    outDir: path.resolve(__dirname, "dist"), 
    emptyOutDir: true,
  },
  server: {
    port: 3000,
  },
});
