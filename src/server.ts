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
  let ssrPageRoutes: RouteInitializer;
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
    const ssrHelper = await vite.ssrLoadModule("/src/ssr/ssr-helper.tsx");
    buildSPADocument = ssrHelper.buildSPADocument;

    const ssrPageRoutesModule = await vite.ssrLoadModule(
      "/src/routes/ssrPageRoutes.ts"
    );
    ssrPageRoutes = ssrPageRoutesModule.ssrPageRoutes;
  } else {
    // Production mode - serve static assets and use pre-built SSR modules
    // Load robots.txt route first and register it before static file serving
    const robotsRoutesModule = await import(
      // we have to ignore this because its in the dist
      // folder but only so during production build
      //@ts-ignore
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
    const ssrHelper = await import(
      // we have to ignore this because its in the dist
      // folder but only so during production build
      //@ts-ignore
      "../dist/server/ssr-helper.js"
    );
    buildSPADocument = ssrHelper.buildSPADocument;

    const ssrPageRoutesModule = await import(
      //@ts-ignore
      "../dist/server/routes/ssrPageRoutes.js"
    );
    ssrPageRoutes = ssrPageRoutesModule.ssrPageRoutes;
  }

  // Serve static files from public folder
  app.use(express.static("public"));

  // Initialize SSR routes
  ssrPageRoutes(app);

  // Catch-all: SPA mode for all other routes
  app.use((_req: Request, res: Response) => {
    res.send(buildSPADocument());
  });

  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

createServer();
