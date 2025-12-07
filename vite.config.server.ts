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
    outDir: "dist/server",
    ssr: true,
    rollupOptions: {
      input: {
        "ssr-helper": "./src/ssr-helper.tsx",
        "pages/home/homePageRoutes": "./src/pages/home/homePageRoutes.ts",
        "pages/about/aboutPageRoutes": "./src/pages/about/aboutPageRoutes.ts",
        "pages/articles/articlesPageRoutes":
          "./src/pages/articles/articlesPageRoutes.ts",
        "pages/article/articlePageRoutes":
          "./src/pages/article/articlePageRoutes.ts",
      },
      output: {
        entryFileNames: "[name].js",
      },
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

