import { b as buildAppDataHelper } from "../../assets/pageTypes-f9vgTcmT.js";
import { k as articlePageRoute, renderSSRPage, buildHTMLDocument, l as ARTICLE_PAGE_DESCRIPTION, m as ARTICLE_PAGE_TITLE, n as articlePageApiRoute } from "../../ssr-helper.js";
import "react/jsx-runtime";
import "react-dom/server";
import "react";
import "node:fs";
import "node:path";
import "node:url";
const getArticlePageData = async (id) => {
  return {
    article: {
      id: parseInt(id),
      title: "Sample Article",
      content: "",
      author: "Author Name",
      date: "2024-01-15"
    },
    contents: ""
  };
};
const articleRoutes = (app) => {
  app.get(articlePageRoute, async (req, res) => {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ error: "Article ID is required" });
    }
    const data = await getArticlePageData(id);
    const { html, data: pageData } = renderSSRPage(
      req.url,
      // pass the entire url into here
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
  app.get(articlePageApiRoute, async (req, res) => {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ error: "Article ID is required" });
    }
    const data = await getArticlePageData(id);
    res.json({
      data,
      title: ARTICLE_PAGE_TITLE
    });
  });
};
export {
  articleRoutes
};
