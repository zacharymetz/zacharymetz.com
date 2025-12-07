import React from "react";
import { hydrateRoot, createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import App from "./components/App";
import { SSRProvider } from "./components/hooks/useSSRContext";

const container = document.getElementById("root")!;

const AppWithProviders = () => (
  <BrowserRouter>
    <SSRProvider>
      <App />
    </SSRProvider>
  </BrowserRouter>
);

if (window.__SSR__) {
  // Hydrate if SSR
  hydrateRoot(container, <AppWithProviders />);
} else {
  // Fresh render if SPA
  createRoot(container).render(<AppWithProviders />);
}
