import path from "node:path";
import { fileURLToPath } from "node:url";
import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import type { ViteDevServer } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isProduction = process.env.NODE_ENV === "production";
const port = process.env.PORT || 3000;

type RouteInitializer = (app: Application) => void;

async function createServer() {
  const app = express();

  let vite: ViteDevServer | undefined;
  let buildSPADocument: () => string;
  let homeRoutes: RouteInitializer;
  let aboutRoutes: RouteInitializer;
  let articlesRoutes: RouteInitializer;
  let articleRoutes: RouteInitializer;

  if (!isProduction) {
    // Development mode - use Vite's dev server as middleware
    const { createServer: createViteServer } = await import("vite");
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "custom",
    });

    app.use(vite.middlewares);

    // Load modules via Vite's SSR loader (with HMR support)
    const ssrHelper = await vite.ssrLoadModule("/src/ssr-helper.tsx");
    buildSPADocument = ssrHelper.buildSPADocument;

    const homeRoutesModule = await vite.ssrLoadModule(
      "/src/pages/home/homePageRoutes.ts"
    );
    const aboutRoutesModule = await vite.ssrLoadModule(
      "/src/pages/about/aboutPageRoutes.ts"
    );
    const articlesRoutesModule = await vite.ssrLoadModule(
      "/src/pages/articles/articlesPageRoutes.ts"
    );
    const articleRoutesModule = await vite.ssrLoadModule(
      "/src/pages/article/articlePageRoutes.ts"
    );

    homeRoutes = homeRoutesModule.homeRoutes;
    aboutRoutes = aboutRoutesModule.aboutRoutes;
    articlesRoutes = articlesRoutesModule.articlesRoutes;
    articleRoutes = articleRoutesModule.articleRoutes;
  } else {
    // Production mode - serve static assets and use pre-built SSR modules
    const sirv = (await import("sirv")).default;
    app.use(
      sirv(path.resolve(__dirname, "../dist/client"), { extensions: [] })
    );

    // Load pre-built SSR modules (Vite handles CSS and other assets at build time)
    const ssrHelper = await import("../dist/server/ssr-helper.js");
    buildSPADocument = ssrHelper.buildSPADocument;

    const homeRoutesModule = await import(
      "../dist/server/pages/home/homePageRoutes.js"
    );
    const aboutRoutesModule = await import(
      "../dist/server/pages/about/aboutPageRoutes.js"
    );
    const articlesRoutesModule = await import(
      "../dist/server/pages/articles/articlesPageRoutes.js"
    );
    const articleRoutesModule = await import(
      "../dist/server/pages/article/articlePageRoutes.js"
    );

    homeRoutes = homeRoutesModule.homeRoutes;
    aboutRoutes = aboutRoutesModule.aboutRoutes;
    articlesRoutes = articlesRoutesModule.articlesRoutes;
    articleRoutes = articleRoutesModule.articleRoutes;
  }

  // Serve static files from public folder
  app.use(express.static("public"));

  // Initialize SSR routes
  homeRoutes(app);
  aboutRoutes(app);
  articlesRoutes(app);
  articleRoutes(app);

  // Catch-all: SPA mode for all other routes
  app.use((_req: Request, res: Response) => {
    res.send(buildSPADocument());
  });

  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

createServer();
