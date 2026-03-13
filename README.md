# zacharymetz.com

Personal website and blog built with a hand-rolled React SSR framework -- no Next.js, no Remix. Express 5, Vite 6, React 19, React Router 7, TypeScript.

## Quick Start

```bash
yarn install
yarn dev       # http://localhost:3000 with HMR
yarn build     # production build
yarn start     # run production server
```

---

## Adding an SSR Page

SSR pages are server-rendered on first load (good for SEO), then behave as SPA on client-side navigation. Every SSR page needs 4 files plus wiring in 4 existing files.

Using a hypothetical `/settings` page as an example:

### 1. Define the data type in `src/types/pageTypes.ts`

Add your page's data interface and slot it into `AppData`:

```typescript
export interface SettingsPageData {
  theme: string;
  notifications: boolean;
}

export interface AppData {
  home: HomePageData | null;
  about: AboutPageData | null;
  products: null;
  post: PostPageData | null;
  settings: SettingsPageData | null; // add this
}
```

Update `buildAppDataHelper` to include the new field:

```typescript
export const buildAppDataHelper = (data: {
  home?: HomePageData;
  about?: AboutPageData;
  post?: PostPageData;
  settings?: SettingsPageData; // add this
}): AppData => {
  return {
    home: data.home || null,
    about: data.about || null,
    products: null,
    post: data.post || null,
    settings: data.settings || null, // add this
  };
};
```

### 2. Add page title/description to `src/constants.ts`

```typescript
export const SETTINGS_PAGE_TITLE = "Settings - Zachary Metz";
export const SETTINGS_PAGE_DESCRIPTION = "User settings page";
```

### 3. Create the 4 page files in `src/frontend/pages/settings/`

**`settingsPageConstants.ts`** -- route paths:

```typescript
import { API_ROUTES_ROOT } from "../../../constants";

export const settingsPageRoute = "/settings";
export const settingsPageApiRoute = API_ROUTES_ROOT + settingsPageRoute;
```

**`settingsPageData.ts`** -- server-side data fetching:

```typescript
import { SettingsPageData } from "../../../types/pageTypes";

export const getSettingsPageData = async (): Promise<SettingsPageData> => {
  return {
    theme: "dark",
    notifications: true,
  };
};
```

**`settingsPageRoutes.ts`** -- Express route handler (registers both the SSR page route and the JSON API route):

```typescript
import { type Application, Request, Response } from "express";
import { buildAppDataHelper } from "../../../types/pageTypes";
import { buildHTMLDocument, renderSSRPage } from "../../../ssr-helper";
import {
  SETTINGS_PAGE_TITLE,
  SETTINGS_PAGE_DESCRIPTION,
} from "../../../constants";
import { getSettingsPageData } from "./settingsPageData";
import {
  settingsPageRoute,
  settingsPageApiRoute,
} from "./settingsPageConstants";

export const settingsRoutes = (app: Application) => {
  // SSR route -- returns full HTML document
  app.get(settingsPageRoute, async (req: Request, res: Response) => {
    const data = await getSettingsPageData();
    const { html, data: pageData } = renderSSRPage(
      req.url,
      buildAppDataHelper({ settings: data }),
    );
    const document = buildHTMLDocument(
      SETTINGS_PAGE_TITLE,
      SETTINGS_PAGE_DESCRIPTION,
      html,
      pageData,
    );
    res.send(document);
  });

  // JSON API route -- used by client-side navigation
  app.get(settingsPageApiRoute, async (req: Request, res: Response) => {
    const data = await getSettingsPageData();
    res.json({ data, title: SETTINGS_PAGE_TITLE });
  });
};
```

**`SettingsPage.tsx`** -- React component:

```tsx
import React from "react";
import { SettingsPageData, PageProps } from "../../../types/pageTypes";
import { usePageData } from "../../components/hooks/usePageData";
import { settingsPageApiRoute } from "./settingsPageConstants";
import { Loader } from "@/frontend/components/shared/loader";

export const SettingsPage: React.FC<PageProps<SettingsPageData>> = ({
  data: _data,
}) => {
  const { data, loading, error } = usePageData<SettingsPageData>(
    _data,
    settingsPageApiRoute,
  );

  if (loading) return <Loader />;
  if (error || !data) return <div>Error loading settings</div>;

  return (
    <div>
      <h1>Settings</h1>
      <p>Theme: {data.theme}</p>
      <p>Notifications: {data.notifications ? "On" : "Off"}</p>
    </div>
  );
};
```

### 4. Wire it up

**`src/routes/ssrPageRoutes.ts`** -- register the Express routes:

```typescript
import { settingsRoutes } from "../frontend/pages/settings/settingsPageRoutes";

export const ssrPageRoutes = (app: Application) => {
  homeRoutes(app);
  aboutRoutes(app);
  postRoutes(app);
  settingsRoutes(app); // add this
};
```

**`src/frontend/App.tsx`** -- add the React Router route and pass SSR data:

```tsx
import { SettingsPage } from "./pages/settings/SettingsPage";

// inside <Routes>:
<Route path="/settings" element={<SettingsPage data={appData.settings} />} />;
```

**`vite.config.server.ts`** -- add the route file as an SSR build entry:

```typescript
rollupOptions: {
  input: {
    // ...existing entries
    "pages/settings/settingsPageRoutes": "./src/frontend/pages/settings/settingsPageRoutes.ts",
  },
},
```

---

## Adding an SPA-Only Page

SPA pages are client-side only -- no server rendering, no SEO. They load via the Express catch-all which serves an empty HTML shell.

Just add a route in `src/frontend/App.tsx`:

```tsx
import { DashboardPage } from "./pages/dashboard/DashboardPage";

// inside <Routes>, before the * catch-all:
<Route path="/dashboard" element={<DashboardPage />} />;
```

The component fetches its own data client-side however it wants (hooks, fetch, etc.). No server-side files needed. The catch-all in `src/server.ts` serves `buildSPADocument()` which returns an empty shell, and React Router handles the rest in the browser.

---

## Adding an API-Only Route

For endpoints that just return JSON (no page rendering), add a route file in `src/routes/` following the pattern in `robotsRoutes.ts`:

```typescript
// src/routes/myApiRoutes.ts
import { type Application, Request, Response } from "express";

export const myApiRoutes = (app: Application) => {
  app.get("/api/v1/something", async (req: Request, res: Response) => {
    res.json({ hello: "world" });
  });
};
```

Then register it in `src/server.ts` alongside the other routes (before the catch-all). In development, load it via `vite.ssrLoadModule()`; in production, add it as an entry in `vite.config.server.ts` and import it from `dist/server/`.

---

## Adding a Blog Post

Create a markdown file in `posts/` with YAML frontmatter:

```markdown
---
title: My New Post
description: A short summary
date: 13-03-2026
time-to-read: 5 min
---

Post content in markdown...
```

The filename (minus `.md`) becomes the URL slug. A file named `my-new-post.md` is served at `/post/my-new-post`. No other changes needed -- the post route handler dynamically reads from the `posts/` directory.

---

## How SSR Works Under the Hood

### The Three Rendering Paths

```
               Browser requests a URL
                       |
            ┌──────────┴──────────┐
            v                     v
    Matches SSR route?      No match (catch-all)
    (/, /about, /post/:id)        |
            |                     v
            v               buildSPADocument()
    Server fetches data     empty <div id="root">
    renderSSRPage()         __SSR__ = false
    buildHTMLDocument()           |
    __INITIAL_DATA__ = {...}      v
    __SSR__ = true          createRoot().render()
            |               (full client render)
            v
    hydrateRoot()
    (attach to server HTML)
            |
            v
    User clicks a link
    (client-side nav)
            |
            v
    clearSSRData() flips
    isSSR -> false (permanent)
            |
            v
    usePageData() fetches
    /api/v1/... JSON endpoint
```

**SSR (direct navigation):** Express matches a route handler -> fetches data server-side -> `renderSSRPage()` renders the React tree to HTML via `StaticRouter` + `renderToString` -> `buildHTMLDocument()` wraps it in a full HTML document with `window.__INITIAL_DATA__` and `window.__SSR__ = true` -> browser calls `hydrateRoot()` to attach interactivity without re-rendering.

**SPA (direct navigation to non-SSR route):** Express catch-all -> `buildSPADocument()` serves an empty shell with `window.__SSR__ = false` -> browser calls `createRoot().render()` for a full client-side render.

**Client-side navigation (after any initial load):** `clearSSRData()` permanently flips `isSSR` to false and clears `window.__INITIAL_DATA__` -> pages receive `null` data -> `usePageData()` hook fetches JSON from the page's `/api/v1/...` endpoint.

This is a "hydrate once, then SPA" pattern. The server provides a fully rendered first page, and after that the app transitions into a standard single-page application.

### The Dual-Route Pattern

Every SSR page registers **two** Express routes:

1. **Page route** (e.g. `GET /about`) -- returns full SSR HTML
2. **API route** (e.g. `GET /api/v1/about`) -- returns `{ data, title }` JSON

The page route is used on first load. The API route is used on client-side navigation. This is why the same React component works in both modes -- it receives data from either source via the `usePageData` hook.

### SSR Context Lifecycle

`useSSRContext` is a one-way switch:

1. Starts `true` if the page was server-rendered (`window.__SSR__`)
2. On first client-side navigation, `clearSSRData()` flips it to `false` permanently
3. From then on, every page fetches its own data from the API

---

## Build Pipeline

The 5-step production build (`build.js`):

| Step | What                                        | Output                                                       |
| ---- | ------------------------------------------- | ------------------------------------------------------------ |
| 1    | `vite build`                                | Client bundle -> `dist/client/` (with `.vite/manifest.json`) |
| 2    | `vite build --config vite.config.server.ts` | SSR modules -> `dist/server/`                                |
| 3    | `esbuild src/server.ts --bundle`            | Server entry -> `dist/server.js`                             |
| 4    | Copy `posts/`                               | -> `dist/posts/` (excludes `example-post.md`)                |
| 5    | Copy `public/`                              | -> `dist/public/`                                            |

Step 3 uses `--external:"./server/*"` so SSR modules stay as separate dynamic imports instead of being inlined. This preserves code-splitting in production.

---

## Development vs Production

**Development:** Express starts via `tsx watch` (auto-restarts on server file changes). Vite runs as Express middleware providing HMR and React Fast Refresh. SSR modules are loaded on-the-fly via `vite.ssrLoadModule()`.

**Production:** Static client assets served from `dist/client/` via `sirv`. Pre-built SSR modules loaded from `dist/server/` via dynamic `import()`. The Vite manifest resolves hashed asset paths for `<script>` and `<link>` tags.
