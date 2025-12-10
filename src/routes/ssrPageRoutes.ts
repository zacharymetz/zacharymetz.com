import { type Application } from "express";
import { homeRoutes } from "../frontend/pages/home/homePageRoutes";
import { aboutRoutes } from "../frontend/pages/about/aboutPageRoutes";
import { postRoutes } from "../frontend/pages/post/postPageRoutes";

export const ssrPageRoutes = (app: Application) => {
  homeRoutes(app);
  aboutRoutes(app);
  postRoutes(app);
};
