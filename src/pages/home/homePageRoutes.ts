import { type Application, Request, Response } from "express";
import { buildAppDataHelper } from "../../types/pageTypes";
import { buildHTMLDocument, renderSSRPage } from "../../ssr-helper";
import { HOME_PAGE_DESCRIPTION, HOME_PAGE_TITLE } from "../../constants";
import { getHomePageData } from "./homePageData";
import { homePageRoute, homePageApiRoute } from "./homePageConstants";

export const homeRoutes = (app: Application) => {
  app.get(homePageRoute, async (req: Request, res: Response) => {
    // static route for getting the homepage data
    const data = await getHomePageData();

    const { html, data: pageData } = renderSSRPage(
      req.url, // pass the entire url into here
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

  app.get(homePageApiRoute, async (req: Request, res: Response) => {
    const data = await getHomePageData();
    res.json({
      data,
      title: HOME_PAGE_TITLE,
    });
  });
};
