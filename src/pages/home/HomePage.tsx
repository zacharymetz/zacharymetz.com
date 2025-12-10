import React from "react";
import { Article, HomePageData, PageProps } from "../../types/pageTypes";
import { usePageData } from "../../components/hooks/usePageData";
import { homePageApiRoute } from "./homePageConstants";
import { InternalLink } from "../../components/shared/internalLink";
import { useDetectIsMobile } from "../../components/hooks/useDetectIsMobile";

export const HomePage: React.FC<PageProps<HomePageData>> = ({
  data: _data,
}) => {
  const { data, loading, error } = usePageData<HomePageData>(
    _data,
    homePageApiRoute
  );

  if (loading) {
    return <div>Loading...</div>;
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

const HomePageHero = () => {
  const { isMobile, isTablet, isMedium } = useDetectIsMobile();
  // since i have the breakpoints i can set the content to what i want
  // it to be on mobile or desktop or what ever

  // asume it starts on large
  let flexBasis = "350px";

  // set a px value if we are not on mobile or table so we can tune it
  if (isTablet || isMobile) {
    flexBasis = "250px";
  }
  if (isMedium) {
    flexBasis = "300px";
  }

  // now we need to adjust the image size
  let imageSize = "500px";

  if (isTablet) {
    imageSize = "350px";
  }
  if (isMedium) {
    imageSize = "475px";
  }
  if (isMobile) {
    imageSize = "275px";
  }
  return (
    <div
      style={{
        height: "700px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: isMobile ? "8px" : "16px",
        width: "100%",
        backgroundImage: `
      repeating-linear-gradient(
        180deg,
        rgba(255, 255, 255, 0.1),
        rgba(255, 255, 255, 0.1) 6px,
        rgba(255, 255, 255, 0.4) 2px,
        rgba(255, 255, 255, 0.4) 7px
      ),
      linear-gradient(#321cb0, #6049a6, #c979bb)
    `.trim(),
      }}
    >
      <div
        style={{
          display: "flex",
          maxWidth: "900px",
          flexGrow: 1,
          padding: "32px",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            flexBasis: flexBasis,
            color: "white",
          }}
        >
          <h1
            style={{
              letterSpacing: "0.01em",
            }}
          >
            Welcome to Galaxy of Code
          </h1>

          <p
            style={{
              marginBottom: "32px",
              fontSize: "1.2rem",
            }}
          >
            Just throwing my curiosities out into the void. Web dev, AI, crypto,
            hacking, and pretty much everything else in the galaxy of code.
          </p>

          <InternalLink
            href={`/posts/asd`}
            linkStyle={{
              border: "none",
              backgroundColor: "#292827",
              color: "white",
              height: "45px",
              borderRadius: "25px",
              width: "290px",
              borderColor: "#292827",
              fontSize: "1.7rem",
              fontFamily: "Georgia",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textDecoration: "none",
            }}
          >
            I'm feeling lucky
          </InternalLink>
        </div>

        <div
          style={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            zIndex: 10,
            // if we are mobile then we need to have it be 100%
            // if we are not mobile then we need to have it be 50%
            width: isMobile ? "100%" : undefined,
            // add padding to the top of the image if we are mobile
            paddingTop: isMobile ? "32px" : undefined,
            paddingRight: isMobile ? "32px" : undefined,
          }}
        >
          <img
            src={"/subject.svg"}
            alt="tmp"
            style={{
              width: imageSize,
              height: imageSize,
            }}
          />
        </div>
      </div>
    </div>
  );
};
