import { CryptoType, useCryptoPrices } from "../hooks/useCryptoPrices";

export const SiteFooter = () => {
  const { tokensData, tokenPairs } = useCryptoPrices();
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        overflow: "hidden",
        backgroundColor: "white",
        borderTop: "1px solid #e0e0e0",
        padding: "16px",
      }}
    >
      <div
        style={{
          flexGrow: 1,
          maxWidth: "1440px",
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "stretch",
            flexDirection: "column",
            flexGrow: 1,
          }}
        >
          <div
            style={{
              marginLeft: "16px",

              display: "flex",
              alignItems: "center",
            }}
          >
            <img
              src="/tropicalgalaxy.png"
              style={{
                height: "32px",
                marginRight: "16px",
              }}
            />
            <div style={{ fontSize: "16px!important" }}>
              {" "}
              &copy; Tropical Galaxy 2025
            </div>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "stretch",
              paddingLeft: "64px",
              flexWrap: "wrap",
            }}
          >
            {/* Dynamically render token price displays */}
            {tokenPairs.map((pair) => {
              const symbol = pair.split("-")[0] as CryptoType; // Extract symbol from pair (e.g., "BTC" from "BTC-USD")
              const tokenData = tokensData[pair] || {
                price: 0,
                priceChange: 0,
              };

              return (
                <div
                  key={pair}
                  style={{
                    paddingLeft: "8px",
                    paddingRight: "8px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      fontSize: "12px",
                      lineHeight: "14px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {symbol}:{" "}
                    {tokenData.price === 0
                      ? "$--.--"
                      : new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "USD",
                        }).format(tokenData.price)}
                  </div>
                  <div
                    style={{
                      color: tokenData.priceChange > 0 ? "green" : "#ff4d4f",
                      fontSize: "12px",
                      lineHeight: "14px",
                      marginLeft: "4px",
                    }}
                  >
                    {tokenData.priceChange > 0 ? "+" : ""}
                    {new Intl.NumberFormat("en-US", {
                      style: "decimal",
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }).format(tokenData.priceChange)}
                    {"%"}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div
          style={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "row-reverse",
          }}
        >
          <img
            src="/doomer.png"
            alt="Blog.dev"
            style={{
              height: "128px",
              marginBottom: "-18px",
              transform: "scaleX(-1)",
            }}
          />
        </div>
      </div>
    </div>
  );
};
