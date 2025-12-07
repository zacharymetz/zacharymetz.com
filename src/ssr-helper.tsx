import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import App from "./components/App";
import { AppData } from "./types/pageTypes";
import { SSRProvider } from "./components/hooks/useSSRContext";

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

export function buildHTMLDocument(
  title: string,
  description: string,
  html: string,
  data: AppData,
  isSSR: boolean = true
): string {
  const isDev = process.env.NODE_ENV !== "production";

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>${title}</title>
        <link rel="icon" href="/tropicalgalaxy.png" />
        <meta name="description" content="${description}">
        ${!isDev ? '<link rel="stylesheet" href="/styles.css">' : ""}
      </head>
      <body>
        <div id="root">${html}</div>
        ${
          isSSR
            ? `<script>window.__INITIAL_DATA__ = ${JSON.stringify(
                data
              )}</script>`
            : ""
        }
        <script>window.__SSR__ = ${isSSR}</script>
        <script src="/bundle.js"></script>
      </body>
    </html>
  `;
}

export function buildSPADocument(): string {
  const isDev = process.env.NODE_ENV !== "production";

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>React App</title>
        <link rel="icon" href="/tropicalgalaxy.png" />
        ${!isDev ? '<link rel="stylesheet" href="/styles.css">' : ""}
      </head>
      <body>
        <div id="root"></div>
        <script>window.__SSR__ = false</script>
        <script src="/bundle.js"></script>
      </body>
    </html>
  `;
}
