import { b as buildAppDataHelper } from "../../assets/pageTypes-f9vgTcmT.js";
import { c as aboutPageRoute, renderSSRPage, buildHTMLDocument, A as ABOUT_PAGE_DESCRIPTION, d as ABOUT_PAGE_TITLE, e as aboutPageApiRoute } from "../../ssr-helper.js";
import "react/jsx-runtime";
import "react-dom/server";
import "react";
import "node:fs";
import "node:path";
import "node:url";
const getAboutPageData = async () => {
  return {
    message: "About page SSR data",
    company: "Tropical Galaxy Inc"
  };
};
const aboutRoutes = (app) => {
  app.get(aboutPageRoute, async (req, res) => {
    const data = await getAboutPageData();
    const { html, data: pageData } = renderSSRPage(
      req.url,
      // pass the entire url into here
      buildAppDataHelper({ about: data })
    );
    const document = buildHTMLDocument(
      ABOUT_PAGE_TITLE,
      ABOUT_PAGE_DESCRIPTION,
      html,
      pageData
    );
    res.send(document);
  });
  app.get(aboutPageApiRoute, async (req, res) => {
    const data = await getAboutPageData();
    res.json({
      data,
      title: ABOUT_PAGE_TITLE
    });
  });
};
export {
  aboutRoutes
};
