import { loadPost } from "../../services/posts";
import { ArticlePageData } from "../../types/pageTypes";

export const getArticlePageData = async (
  slug: string
): Promise<ArticlePageData | null> => {
  const post = await loadPost(slug);

  if (!post) {
    return null;
  }

  return {
    article: {
      slug: post.slug,
      title: post.title,
      description: post.description,
      date: post.date,
      "time-to-read": post["time-to-read"],
    },
    content: post.content,
  };
};
