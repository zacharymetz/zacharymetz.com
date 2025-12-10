import { InternalLink } from "./internalLink";

const Header = () => {
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
            flexGrow: 1,
          }}
        >
          <InternalLink
            href="/"
            linkStyle={{
              textDecoration: "none",
              color: "black",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <img
                src="/coffee.png"
                alt="Blog.dev"
                style={{ height: "20px", marginTop: "2px" }}
              />
              <span
                style={{
                  fontSize: "18px",
                  fontWeight: "500",
                }}
              >
                Zachary Metz
                <span style={{ fontSize: "12px", color: "#666" }}>.com</span>
              </span>
            </div>
          </InternalLink>
        </div>
        <div
          style={{
            display: "flex",
            gap: "16px",
          }}
        >
          <InternalLink
            href="/about"
            linkStyle={{
              textDecoration: "none",
            }}
          >
            About
          </InternalLink>
        </div>
      </div>
    </div>
  );
};

export default Header;
