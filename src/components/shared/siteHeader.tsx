import { useDetectIsMobile } from "../hooks/useDetectIsMobile";
import { InternalLink } from "./internalLink";

const Header = () => {
  const isMobile = useDetectIsMobile();
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        width: "100%",
        zIndex: 1000,
        overflow: "hidden",
        position: "fixed",
        justifyContent: "center",
        flexDirection: "row",
        height: "56px",
        backgroundColor: "white",
        borderBottom: "1px solid #e0e0e0",
        //padding: "0 16px",
      }}
    >
      <div
        style={{
          flexGrow: 1,
          margin: "0 16px",
          maxWidth: "1440px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <div
          style={{
            //paddingLeft: "64px",
            flexGrow: 1,
          }}
        >
          <InternalLink href="/">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <img
                src="/tropicalgalaxy.png"
                alt="Blog.dev"
                style={{ height: "32px" }}
              />
              <div
                style={{
                  fontSize: "18px",
                  fontWeight: "bold",
                }}
              >
                Tropical Construction
              </div>
            </div>
          </InternalLink>
        </div>
        <div
          style={{
            display: "flex",
            gap: "16px",
          }}
        >
          <InternalLink href="/articles">Posts</InternalLink>
          <InternalLink href="/about">About</InternalLink>
        </div>
      </div>
    </div>
  );
};

export default Header;
