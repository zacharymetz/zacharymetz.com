import { type Application, Request, Response } from "express";
import { buildAppDataHelper } from "../../../types/pageTypes";
import { buildHTMLDocument, renderSSRPage } from "../../../ssr-helper";
import { ABOUT_PAGE_DESCRIPTION, ABOUT_PAGE_TITLE } from "../../../constants";
import { getAboutPageData } from "./aboutPageData";
import { aboutPageRoute, aboutPageApiRoute } from "./aboutPageConstants";

export const aboutRoutes = (app: Application) => {
  app.get(aboutPageRoute, async (req: Request, res: Response) => {
    // static route for getting the about page data
    const data = await getAboutPageData();

    const { html, data: pageData } = renderSSRPage(
      req.url, // pass the entire url into here
      buildAppDataHelper({ about: data }),
    );
    const document = buildHTMLDocument(
      ABOUT_PAGE_TITLE,
      ABOUT_PAGE_DESCRIPTION,
      html,
      pageData,
    );

    res.send(document);
  });

  app.get(aboutPageApiRoute, async (_req: Request, res: Response) => {
    const data = await getAboutPageData();
    res.json({
      data,
      title: ABOUT_PAGE_TITLE,
    });
  });
};
