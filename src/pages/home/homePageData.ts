import { HomePageData } from "../../types/pageTypes";

export const getHomePageData = async (): Promise<HomePageData> => {
  return {
    message: "Home page SSR data",
    timestamp: Date.now(),
  };
};
