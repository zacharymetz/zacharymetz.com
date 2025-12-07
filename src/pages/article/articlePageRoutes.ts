import { type Application, Request, Response } from "express";
import { buildAppDataHelper } from "../../types/pageTypes";
import { buildHTMLDocument, renderSSRPage } from "../../ssr-helper";
import { ARTICLE_PAGE_DESCRIPTION, ARTICLE_PAGE_TITLE } from "../../constants";
import { getArticlePageData } from "./articlePageData";
import { articlePageRoute, articlePageApiRoute } from "./articlePageConstants";

export const articleRoutes = (app: Application) => {
  app.get(articlePageRoute, async (req: Request, res: Response) => {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ error: "Article ID is required" });
    }
    // static route for getting the article page data
    const data = await getArticlePageData(id);

    const { html, data: pageData } = renderSSRPage(
      req.url, // pass the entire url into here
      buildAppDataHelper({ article: data })
    );
    const document = buildHTMLDocument(
      ARTICLE_PAGE_TITLE,
      ARTICLE_PAGE_DESCRIPTION,
      html,
      pageData
    );

    res.send(document);
  });

  app.get(articlePageApiRoute, async (req: Request, res: Response) => {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ error: "Article ID is required" });
    }
    const data = await getArticlePageData(id);
    res.json({
      data,
      title: ARTICLE_PAGE_TITLE,
    });
  });
};
