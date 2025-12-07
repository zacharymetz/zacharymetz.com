import express, { Request, Response } from "express";
import {
  renderSSRPage,
  buildHTMLDocument,
  buildSPADocument,
} from "./ssr-helper";
import { AppData } from "./types/pageTypes";
import { homeRoutes } from "./pages/home/homePageRoutes";
import { aboutRoutes } from "./pages/about/aboutPageRoutes";
import { articlesRoutes } from "./pages/articles/articlesPageRoutes";
import { articleRoutes } from "./pages/article/articlePageRoutes";

const app = express();

app.use(express.static("public"));

// initialize the home page
homeRoutes(app);

// SSR Route: About page
aboutRoutes(app);

// SSR Route: Articles page
articlesRoutes(app);

// SSR Route: Article page
articleRoutes(app);

// Catch-all: SPA mode for all other routes (no SSR)
app.use((_req: Request, res: Response) => {
  res.send(buildSPADocument());
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
