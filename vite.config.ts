import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist/client",
    manifest: true,
    rollupOptions: {
      input: "./src/client.tsx",
    },
  },
  css: {
    modules: {
      localsConvention: "camelCase",
      generateScopedName: "[name]__[local]--[hash:base64:5]",
    },
  },
  ssr: {
    noExternal: ["lenis", "react-router"],
  },
});
