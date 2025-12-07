import { b as buildAppDataHelper } from "../../assets/pageTypes-f9vgTcmT.js";
import { h as homePageRoute, renderSSRPage, buildHTMLDocument, H as HOME_PAGE_DESCRIPTION, a as HOME_PAGE_TITLE, b as homePageApiRoute } from "../../ssr-helper.js";
import "react/jsx-runtime";
import "react-dom/server";
import "react";
import "node:fs";
import "node:path";
import "node:url";
const getArticles = async () => {
  return [
    {
      id: 1,
      title: "How does next js work under the hood?",
      content: "This is the content of article 1",
      author: "John Doe",
      date: "2024-01-01"
    },
    {
      id: 2,
      title: "Article 2",
      content: "This is the content of article 2",
      author: "Jane Doe",
      date: "2024-01-02"
    },
    {
      id: 3,
      title: "Article 3",
      content: "This is the content of article 3",
      author: "John Doe",
      date: "2024-01-03"
    },
    {
      id: 4,
      title: "Article 4",
      content: "This is the content of article 4",
      author: "Jane Doe",
      date: "2024-01-04"
    },
    {
      id: 5,
      title: "Article 5",
      content: "This is the content of article 5",
      author: "John Doe",
      date: "2024-01-05"
    },
    {
      id: 6,
      title: "Article 6",
      content: "This is the content of article 6",
      author: "Jane Doe",
      date: "2024-01-06"
    }
  ];
};
const getHomePageData = async () => {
  console.log("Getting home page data 1");
  const articles = await getArticles();
  return {
    highlightedArticles: articles.slice(0, 3)
  };
};
const homeRoutes = (app) => {
  app.get(homePageRoute, async (req, res) => {
    const data = await getHomePageData();
    const { html, data: pageData } = renderSSRPage(
      req.url,
      // pass the entire url into here
      buildAppDataHelper({ home: data })
    );
    const document = buildHTMLDocument(
      HOME_PAGE_TITLE,
      HOME_PAGE_DESCRIPTION,
      html,
      pageData
    );
    res.send(document);
  });
  app.get(homePageApiRoute, async (req, res) => {
    const data = await getHomePageData();
    res.json({
      data,
      title: HOME_PAGE_TITLE
    });
  });
};
export {
  homeRoutes
};
