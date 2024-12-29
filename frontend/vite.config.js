import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";
import path from "path";

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // Alias "@" to the "src" directory
    },
  },
  build: {
    outDir: "dist", // Build output directory
    rollupOptions: {
      output: {
        manualChunks: undefined, // Optional: to bundle all JS into a single file
      },
    },
  },
  server: {
    port: 3000, // Default development server port
  },
});
