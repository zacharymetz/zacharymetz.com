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

  // Remove Express default X-Powered-By header
  app.disable("x-powered-by");

  // Add .NET-like headers to all responses
  app.use((_req: Request, res: Response, next) => {
    res.setHeader("X-Powered-By", "ASP.NET");
    res.setHeader("Server", "Microsoft-IIS/10.0");
    next();
  });

  let vite: ViteDevServer | undefined;
  let buildSPADocument: () => string;
  let homeRoutes: RouteInitializer;
  let aboutRoutes: RouteInitializer;
  let articlesRoutes: RouteInitializer;
  let articleRoutes: RouteInitializer;
  let robotsRoutes: RouteInitializer;

  if (!isProduction) {
    // Development mode - use Vite's dev server as middleware
    const { createServer: createViteServer } = await import("vite");
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "custom",
    });

    // Load robots.txt route module via Vite SSR loader (before adding middleware)
    const robotsRoutesModule = await vite.ssrLoadModule(
      "/src/routes/robotsRoutes.ts"
    );
    robotsRoutes = robotsRoutesModule.robotsRoutes;
    // Register robots.txt route BEFORE Vite middleware so Express handles it
    robotsRoutes(app);

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
    // Load robots.txt route first and register it before static file serving
    const robotsRoutesModule = await import(
      "../dist/server/routes/robotsRoutes.js"
    );
    robotsRoutes = robotsRoutesModule.robotsRoutes;
    // Register robots.txt route BEFORE static file middleware so Express handles it
    robotsRoutes(app);

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
