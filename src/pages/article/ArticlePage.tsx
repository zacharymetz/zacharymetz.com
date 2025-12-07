import React from "react";
import { ArticlePageData, PageProps } from "../../types/pageTypes";
import { usePageData } from "../../components/hooks/usePageData";
import { articlePageApiRoute } from "./articlePageRoutes";

const pageBreakLarge = 1280;
const pageBreakMedium = 1024;

export const ArticlePage: React.FC<PageProps<ArticlePageData>> = ({
  data: _data,
}) => {
  const { data, loading, error } = usePageData<ArticlePageData>(
    _data,
    articlePageApiRoute
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !data) {
    return <div>Error: {error?.message || "Unknown error"}</div>;
  }

  return (
    <div>
      <h1>{data.article.title}</h1>
      <p>
        By {data.article.author} on {data.article.date}
      </p>
      <div>{data.contents}</div>
    </div>
  );
};
