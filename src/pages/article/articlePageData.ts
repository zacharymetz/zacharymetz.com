import { ArticlePageData } from "../../types/pageTypes";

export const getArticlePageData = async (
  id: string
): Promise<ArticlePageData> => {
  return {
    article: {
      id: parseInt(id),
      title: "Sample Article",
      content: "",
      author: "Author Name",
      date: "2024-01-15",
    },
    contents: "",
  };
};
