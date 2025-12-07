import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import App from "./components/App";
import { AppData } from "./types/pageTypes";
import { SSRProvider } from "./components/hooks/useSSRContext";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isProduction = process.env.NODE_ENV === "production";

// Load manifest in production
let manifest: Record<string, { file: string; css?: string[] }> | null = null;
if (isProduction) {
  try {
    const manifestPath = path.resolve(
      __dirname,
      "../dist/client/.vite/manifest.json"
    );
    manifest = JSON.parse(fs.readFileSync(manifestPath, "utf-8"));
  } catch {
    // Manifest might not exist yet during build
  }
}

interface SSRResult {
  html: string;
  data: AppData;
}

export function renderSSRPage(url: string, data: AppData): SSRResult {
  const html = renderToString(
    <StaticRouter location={url}>
      <SSRProvider>
        <App data={data} />
      </SSRProvider>
    </StaticRouter>
  );

  return { html, data };
}

function getAssetTags(): { scripts: string; styles: string } {
  if (!isProduction) {
    // Development mode - Vite injects scripts via middleware
    return {
      scripts: `
        <script type="module" src="/@vite/client"></script>
        <script type="module" src="/src/client.tsx"></script>
      `,
      styles: "",
    };
  }

  // Production mode - use manifest
  if (!manifest) {
    return { scripts: "", styles: "" };
  }

  const clientEntry = manifest["src/client.tsx"];
  if (!clientEntry) {
    return { scripts: "", styles: "" };
  }

  const scripts = `<script type="module" src="/${clientEntry.file}"></script>`;
  const styles = (clientEntry.css || [])
    .map((css) => `<link rel="stylesheet" href="/${css}">`)
    .join("\n");

  return { scripts, styles };
}

export function buildHTMLDocument(
  title: string,
  description: string,
  html: string,
  data: AppData,
  isSSR: boolean = true
): string {
  const { scripts, styles } = getAssetTags();

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <link rel="icon" href="/tropicalgalaxy.png" />
    <meta name="description" content="${description}">
    ${styles}
  </head>
  <body>
    <div id="root">${html}</div>
    ${isSSR ? `<script>window.__INITIAL_DATA__ = ${JSON.stringify(data)}</script>` : ""}
    <script>window.__SSR__ = ${isSSR}</script>
    ${scripts}
  </body>
</html>`;
}

export function buildSPADocument(): string {
  const { scripts, styles } = getAssetTags();

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>React App</title>
    <link rel="icon" href="/tropicalgalaxy.png" />
    ${styles}
  </head>
  <body>
    <div id="root"></div>
    <script>window.__SSR__ = false</script>
    ${scripts}
  </body>
</html>`;
}
