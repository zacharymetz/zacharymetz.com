import { type Application, Request, Response } from "express";
import { buildAppDataHelper } from "../../../types/pageTypes";
import { buildHTMLDocument, renderSSRPage } from "../../../ssr-helper";
import { getPostPageData } from "./postPageData";
import { postPageRoute, postPageApiRoute } from "./postPageConstants";

export const postRoutes = (app: Application) => {
  app.get(postPageRoute, async (req: Request, res: Response) => {
    const slug = req.params.id;
    if (!slug) {
      return res.status(400).json({ error: "Post slug is required" });
    }

    const data = await getPostPageData(slug);
    if (!data) {
      return res.status(404).send("Post not found");
    }

    const { html, data: pageData } = renderSSRPage(
      req.url,
      buildAppDataHelper({ post: data })
    );
    const document = buildHTMLDocument(
      data.post.title,
      data.post.description,
      html,
      pageData
    );

    res.send(document);
  });

  app.get(postPageApiRoute, async (req: Request, res: Response) => {
    const slug = req.params.id;
    if (!slug) {
      return res.status(400).json({ error: "Post slug is required" });
    }

    const data = await getPostPageData(slug);
    if (!data) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.json({
      data,
      title: data.post.title,
    });
  });
};
