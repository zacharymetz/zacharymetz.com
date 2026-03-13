import { Article, HomePageData, PageProps } from "../../../types/pageTypes";
import { usePageData } from "../../components/hooks/usePageData";
import { homePageApiRoute } from "./homePageConstants";
import { InternalLink } from "../../components/shared/internalLink";
import { useDetectIsMobile } from "../../components/hooks/useDetectIsMobile";
import { Loader } from "@/frontend/components/shared/loader";

export const HomePage: React.FC<PageProps<HomePageData>> = ({
  data: _data,
}) => {
  const { data, loading, error } = usePageData<HomePageData>(
    _data,
    homePageApiRoute,
  );

  if (loading) {
    return <Loader />;
  }

  if (error || !data) {
    return <div>Error: {error?.message || "Unknown error"}</div>;
  }

  return (
    <>
      <div>
        <h2
          style={{
            textAlign: "center",
          }}
        >
          Posts
        </h2>
      </div>
      <HomePageArticleList articles={data.highlightedArticles} />
    </>
  );
};

const HomePageArticleList = ({ articles }: { articles: Article[] }) => {
  const { isMobile } = useDetectIsMobile();
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        justifyContent: "center",
        padding: isMobile ? "16px" : "32px",
        paddingBottom: "32px",
        paddingTop: "0",
        fontSize: isMobile ? "14px" : "16px",
      }}
    >
      <table
        style={{
          maxWidth: "600px",
          textAlign: "center",
          fontSize: "14px",
        }}
      >
        <thead>
          <tr style={{}}>
            <th
              style={{
                fontWeight: "normal",
                paddingBottom: "16px",
              }}
            >
              date
            </th>
            <th
              style={{
                whiteSpace: "nowrap",
                padding: "0 16px",

                paddingBottom: "16px",
                fontWeight: "normal",
              }}
            >
              time
            </th>
            <th
              style={{
                textAlign: "left",
                width: "100%",
                fontWeight: "normal",

                paddingBottom: "16px",
              }}
            >
              title
            </th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article) => (
            <tr key={article.slug}>
              <td
                style={{
                  whiteSpace: "nowrap",
                  paddingBottom: "4px",
                  fontWeight: "200",
                }}
              >
                {article.date}
              </td>
              <td
                style={{
                  paddingBottom: "4px",
                  fontWeight: "200",
                }}
              >
                {article["time-to-read"]}
              </td>
              <td
                style={{
                  textAlign: "left",
                  width: "100%",
                  paddingBottom: "4px",
                }}
              >
                <InternalLink
                  href={`/post/${article.slug}`}
                  linkStyle={{
                    textDecoration: "none",
                  }}
                >
                  {" "}
                  {article.title}
                </InternalLink>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
