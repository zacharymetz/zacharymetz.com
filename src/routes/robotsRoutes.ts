import { type Application, Request, Response } from "express";
import { generateRobotsTxt } from "../services/robots";

export const robotsRoutes = (app: Application) => {
  app.get("/robots.txt", (_req: Request, res: Response) => {
    // Configure robots.txt rules
    const robotsTxt = generateRobotsTxt({
      // Allow all paths by default (empty disallowPaths means allow all)
      disallowPaths: [],
      // Add sitemap URL if you have one
      // sitemapUrl: "https://yoursite.com/sitemap.xml",
    });

    res.type("text/plain");
    res.send(robotsTxt);
  });
};
