import { b as buildAppDataHelper } from "../../assets/pageTypes-f9vgTcmT.js";
import { f as articlesPageRoute, renderSSRPage, buildHTMLDocument, g as ARTICLES_PAGE_DESCRIPTION, i as ARTICLES_PAGE_TITLE, j as articlesPageApiRoute } from "../../ssr-helper.js";
import "react/jsx-runtime";
import "react-dom/server";
import "react";
import "node:fs";
import "node:path";
import "node:url";
const getArticlesPageData = async () => {
  return {
    articles: [
      {
        id: 1,
        title: "Getting Started with SSR",
        content: "Server-side rendering improves SEO and initial load times.",
        author: "John Doe",
        date: "2024-01-15"
      },
      {
        id: 2,
        title: "React Best Practices",
        content: "Learn the best practices for building React applications.",
        author: "Jane Smith",
        date: "2024-01-20"
      },
      {
        id: 2,
        title: "React Best Practices",
        content: "Learn the best practices for building React applications.",
        author: "Jane Smith",
        date: "2024-01-20"
      },
      {
        id: 2,
        title: "React Best Practices",
        content: "Learn the best practices for building React applications.",
        author: "Jane Smith",
        date: "2024-01-20"
      },
      {
        id: 2,
        title: "React Best Practices",
        content: "Learn the best practices for building React applications.",
        author: "Jane Smith",
        date: "2024-01-20"
      },
      {
        id: 2,
        title: "React Best Practices",
        content: "Learn the best practices for building React applications.",
        author: "Jane Smith",
        date: "2024-01-20"
      },
      {
        id: 2,
        title: "React Best Practices",
        content: "Learn the best practices for building React applications.",
        author: "Jane Smith",
        date: "2024-01-20"
      },
      {
        id: 2,
        title: "React Best Practices",
        content: "Learn the best practices for building React applications.",
        author: "Jane Smith",
        date: "2024-01-20"
      },
      {
        id: 2,
        title: "React Best Practices",
        content: "Learn the best practices for building React applications.",
        author: "Jane Smith",
        date: "2024-01-20"
      },
      {
        id: 2,
        title: "React Best Practices",
        content: "Learn the best practices for building React applications.",
        author: "Jane Smith",
        date: "2024-01-20"
      },
      {
        id: 2,
        title: "React Best Practices",
        content: "Learn the best practices for building React applications.",
        author: "Jane Smith",
        date: "2024-01-20"
      },
      {
        id: 2,
        title: "React Best Practices",
        content: "Learn the best practices for building React applications.",
        author: "Jane Smith",
        date: "2024-01-20"
      }
    ]
  };
};
const articlesRoutes = (app) => {
  app.get(articlesPageRoute, async (req, res) => {
    const data = await getArticlesPageData();
    const { html, data: pageData } = renderSSRPage(
      req.url,
      // pass the entire url into here
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
  app.get(articlesPageApiRoute, async (req, res) => {
    const data = await getArticlesPageData();
    res.json({
      data,
      title: ARTICLES_PAGE_TITLE
    });
  });
};
export {
  articlesRoutes
};
