import { getArticles } from "@/services/articles";
import { HomePageData } from "../../types/pageTypes";

export const getHomePageData = async (): Promise<HomePageData> => {
  // get a list of all the articles we have
  console.log("Getting home page data 1");
  const articles = await getArticles();
  return {
    highlightedArticles: articles.slice(0, 3),
  };
};
