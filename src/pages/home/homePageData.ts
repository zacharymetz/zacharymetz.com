import { loadAllPosts } from "../../services/posts";
import { HomePageData, Article } from "../../types/pageTypes";

export const getHomePageData = async (): Promise<HomePageData> => {
  const posts = await loadAllPosts();

  // Convert posts to articles format
  const articles: Article[] = [];
  for (const post of posts) {
    articles.push({
      slug: post.slug,
      title: post.title,
      description: post.description,
      date: post.date,
      "time-to-read": post["time-to-read"],
    });
  }

  return {
    highlightedArticles: articles,
  };
};
