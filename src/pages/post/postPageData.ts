import { loadPost } from "../../services/posts";
import { PostPageData } from "../../types/pageTypes";

export const getPostPageData = async (
  slug: string
): Promise<PostPageData | null> => {
  const post = await loadPost(slug);

  if (!post) {
    return null;
  }

  return {
    post: {
      slug: post.slug,
      title: post.title,
      description: post.description,
      date: post.date,
      "time-to-read": post["time-to-read"],
    },
    content: post.content,
  };
};

