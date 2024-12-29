import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    build: {
        outDir: "dist", // Ensure this matches your deployment setup
    },
    server: {
        port: 3000,
    },
    resolve: {
        alias: {
            "@": "/src",
        },
    },
});
