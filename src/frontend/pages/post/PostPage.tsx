import React from "react";
import { PostPageData, PageProps } from "../../../types/pageTypes";
import { usePageData } from "../../components/hooks/usePageData";
import { postPageApiRoute } from "./postPageConstants";
import { Markdown } from "../../../services/markdown-to-jsx";
import { Loader } from "@/frontend/components/shared/loader";

const contentMaxWidth = 736;

export const PostPage: React.FC<PageProps<PostPageData>> = ({
  data: _data,
}) => {
  // Only compute the API route on client-side when we don't have SSR data
  // During SSR, _data is already provided so we don't need the URL
  const apiRoute = React.useMemo(() => {
    if (_data) return ""; // Don't need API route if we have SSR data
    if (typeof window === "undefined") return ""; // SSR fallback
    const slug = window.location.pathname.replace("/post/", "");
    return postPageApiRoute.replace(":id", slug);
  }, [_data]);

  const { data, loading, error } = usePageData<PostPageData>(_data, apiRoute);

  if (loading) {
    return <Loader />;
  }

  if (error || !data) {
    return <div>Error: {error?.message || "Unknown error"}</div>;
  }

  return (
    <article
      style={{
        width: "100%",
        maxWidth: `${contentMaxWidth}px`,
        margin: "0 auto",
        padding: "0 1rem",
        boxSizing: "border-box",
      }}
    >
      <header style={{ marginBottom: "2rem" }}>
        <h1 style={{ marginBottom: "0.5rem" }}>{data.post.title}</h1>
        <p style={{ color: "#6a737d", fontSize: "0.9rem" }}>
          {data.post.date} • {data.post["time-to-read"]} read
        </p>
      </header>
      <Markdown content={data.content} />
    </article>
  );
};
