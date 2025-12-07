import React from "react";
import { HomePageData, PageProps } from "../../types/pageTypes";
import { usePageData } from "../../components/hooks/usePageData";
import { homePageApiRoute } from "./homePageRoutes";
import { InternalLink } from "../../components/shared/internalLink";
import { useDetectIsMobile } from "../../components/hooks/useDetectIsMobile";

export const HomePage: React.FC<PageProps<HomePageData>> = ({
  data: _data,
}) => {
  const { data, loading, error } = usePageData<HomePageData>(
    _data,
    homePageApiRoute
  );
  const isMobile = useDetectIsMobile();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !data) {
    return <div>Error: {error?.message || "Unknown error"}</div>;
  }

  return (
    <div
      style={{
        height: "700px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        padding: "16px",
      }}
    >
      <div
        style={{
          position: "absolute",

          left: 0,

          zIndex: 0,
          width: "100vw",
          height: "100%",
          backgroundImage:
            "repeating-linear-gradient(180deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1) 6px,rgba(255, 255, 255, 0.4) 2px,rgba(255, 255, 255, 0.4) 7px),linear-gradient(#321cb0, #6049a6, #c979bb) ",
        }}
      ></div>
      <div
        style={{
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          paddingTop: "3%",
          justifyContent: isMobile ? "" : "center",
          width: isMobile ? "" : "40%",
        }}
      >
        {" "}
        <div
          style={{
            display: "flex",
          }}
        >
          <div
            style={{
              paddingTop: "3%",
              display: "flex",
              fontSize: isMobile ? "3.8rem" : "4erm",
              color: "white",
              paddingBottom: isMobile ? "0.5%" : "3%",
            }}
          >
            Rest your mind.
          </div>{" "}
        </div>
        <div
          style={{
            display: "flex",
          }}
        >
          <div
            style={{
              padding: "3% 0% 3% 0%",
              display: "flex",
              justifyContent: "flex-start",
              fontSize: isMobile ? "1.2rem" : "1.5em",
              color: "white",
              width: isMobile ? "80%" : "50%",
            }}
          >
            You've been working hard, take a break and discover something new.
            Maybe a random article or two.
          </div>
        </div>
        <div
          style={{
            paddingTop: isMobile ? "8%" : "6%",
            display: "flex",
          }}
        >
          <InternalLink href={`/posts/asd`}>
            <div
              style={{
                border: "none",
                backgroundColor: "#292827",
                color: "white",
                height: isMobile ? "40px" : "45px",
                borderRadius: "25px",
                width: isMobile ? "55%" : "290px",
                borderColor: "#292827",
                fontSize: isMobile ? "1.2em" : "1.7rem",
                fontFamily: "Georgia",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {" "}
              <div> I'm feeling lucky </div>
            </div>
          </InternalLink>
        </div>
      </div>
      {!isMobile && (
        <img
          src={"/subject.svg"}
          alt="tmp"
          style={{ height: isMobile ? "30vh" : "45vh", zIndex: 100 }}
        />
      )}
    </div>
  );
};
