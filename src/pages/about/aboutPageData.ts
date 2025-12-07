import { AboutPageData } from "../../types/pageTypes";

export const getAboutPageData = async (): Promise<AboutPageData> => {
  return {
    message: "About page SSR data",
    company: "Tropical Galaxy Inc",
  };
};

