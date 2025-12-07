import React from "react";
import { ArticlesPageData, PageProps } from "../../types/pageTypes";
import { usePageData } from "../../components/hooks/usePageData";
import { articlesPageApiRoute } from "./articlesPageRoutes";

export const ArticlesPage: React.FC<PageProps<ArticlesPageData>> = ({
  data: _data,
}) => {
  const { data, loading, error } = usePageData<ArticlesPageData>(
    _data,
    articlesPageApiRoute
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !data) {
    return <div>Error: {error?.message || "Unknown error"}</div>;
  }

  return (
    <div>
      <h1>Articles Page</h1>
      {data.articles.map((article) => (
        <div key={article.id}>
          <h2>{article.title}</h2>
          <p>{article.content}</p>
          <p>By {article.author} on {article.date}</p>
        </div>
      ))}
    </div>
  );
};

