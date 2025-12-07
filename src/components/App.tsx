import React from "react";
import "../styles/global.css";
import { Routes, Route } from "react-router";
import { AppData } from "../types/pageTypes";
import Header from "./shared/siteHeader";
import { SiteFooter } from "./shared/siteFooter";
import { HomePage } from "../pages/home/HomePage";
import { AboutPage } from "../pages/about/AboutPage";
import { ArticlesPage } from "../pages/articles/ArticlesPage";
import { ArticlePage } from "../pages/article/ArticlePage";
import { useSSRContext } from "./hooks/useSSRContext";
import { Scroller } from "./scroller";

interface AppProps {
  data?: AppData; // Only passed during SSR on server
}

const App: React.FC<AppProps> = ({ data }) => {
  const { isSSR } = useSSRContext();

  // Use SSR data if available (from props on server, or window on client)
  // Once SSR is cleared, all pages get null and must fetch their own data
  const appData: AppData = isSSR
    ? data ||
      (typeof window !== "undefined" ? window.__INITIAL_DATA__ : null) || {
        home: null,
        about: null,
        products: null,
        article: null,
      }
    : { home: null, about: null, products: null, article: null };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "stretch",
      }}
    >
      <Scroller />
      <Header />
      <div
        style={{
          flexGrow: 1,
          display: "flex",
          marginTop: "57px",
          justifyContent: "stretch",
        }}
      >
        <Routes>
          <Route path="/" element={<HomePage data={appData.home} />} />
          <Route path="/about" element={<AboutPage data={appData.about} />} />
          <Route
            path="/articles"
            element={<ArticlesPage data={appData.products} />}
          />
          <Route
            path="/article/:id"
            element={<ArticlePage data={appData.article} />}
          />
          <Route
            path="*"
            element={
              <div>
                <h1>SPA Route</h1>
                <p>This route is client-side only</p>
              </div>
            }
          />
        </Routes>
      </div>
      <SiteFooter />
    </div>
  );
};

export default App;
