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
        "pages/home/homePageRoutes":
          "./src/frontend/pages/home/homePageRoutes.ts",
        "pages/about/aboutPageRoutes":
          "./src/frontend/pages/about/aboutPageRoutes.ts",
        "pages/post/postPageRoutes":
          "./src/frontend/pages/post/postPageRoutes.ts",
        "routes/robotsRoutes": "./src/routes/robotsRoutes.ts",
        "routes/ssrPageRoutes": "./src/routes/ssrPageRoutes.ts",
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
