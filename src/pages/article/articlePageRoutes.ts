import { type Application, Request, Response } from "express";
import { buildAppDataHelper } from "../../types/pageTypes";
import { buildHTMLDocument, renderSSRPage } from "../../ssr-helper";
import { getArticlePageData } from "./articlePageData";
import { articlePageRoute, articlePageApiRoute } from "./articlePageConstants";

export const articleRoutes = (app: Application) => {
  app.get(articlePageRoute, async (req: Request, res: Response) => {
    const slug = req.params.id;
    if (!slug) {
      return res.status(400).json({ error: "Article slug is required" });
    }

    const data = await getArticlePageData(slug);
    if (!data) {
      return res.status(404).send("Article not found");
    }

    const { html, data: pageData } = renderSSRPage(
      req.url,
      buildAppDataHelper({ article: data })
    );
    const document = buildHTMLDocument(
      data.article.title,
      data.article.description,
      html,
      pageData
    );

    res.send(document);
  });

  app.get(articlePageApiRoute, async (req: Request, res: Response) => {
    const slug = req.params.id;
    if (!slug) {
      return res.status(400).json({ error: "Article slug is required" });
    }

    const data = await getArticlePageData(slug);
    if (!data) {
      return res.status(404).json({ error: "Article not found" });
    }

    res.json({
      data,
      title: data.article.title,
    });
  });
};
