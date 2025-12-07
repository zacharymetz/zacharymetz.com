import { type Application, Request, Response } from "express";
import { buildAppDataHelper } from "../../types/pageTypes";
import { buildHTMLDocument, renderSSRPage } from "../../ssr-helper";
import {
  API_ROUTES_ROOT,
  ARTICLES_PAGE_DESCRIPTION,
  ARTICLES_PAGE_TITLE,
} from "../../constants";
import { getArticlesPageData } from "./articlesPageData";

export const articlesPageRoute = "/articles";

export const articlesPageApiRoute = API_ROUTES_ROOT + articlesPageRoute;

export const articlesRoutes = (app: Application) => {
  app.get(articlesPageRoute, async (req: Request, res: Response) => {
    // static route for getting the articles page data
    const data = await getArticlesPageData();

    const { html, data: pageData } = renderSSRPage(
      req.url, // pass the entire url into here
      buildAppDataHelper({ articles: data })
    );
    const document = buildHTMLDocument(
      ARTICLES_PAGE_TITLE,
      ARTICLES_PAGE_DESCRIPTION,
      html,
      pageData
    );

    res.send(document);
  });

  app.get(articlesPageApiRoute, async (req: Request, res: Response) => {
    const data = await getArticlesPageData();
    res.json({
      data,
      title: ARTICLES_PAGE_TITLE,
    });
  });
};
