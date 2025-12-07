// Helper so that we can pass in null data to a page
// this is used to signify that we need to load the data from the server
// if its not null, the page is most likely an spa page
export interface PageProps<T> {
  data: T | null;
}

/**
 * SSR page props that we can inject on the server side
 * to pre render the page
 */
export interface HomePageData {
  highlightedArticles: Article[];
}

export interface AboutPageData {
  message: string;
  company: string;
}

export interface ArticlesPageData {
  articles: Article[];
}

export interface Article {
  id: number;
  title: string;
  content: string;
  author: string;
  date: string;
}

export interface ArticlePageData {
  article: Article;
  contents: string;
}

/**
 * App data interface wrapper that
 * is used to inject the data into the app from
 * the server side
 */
export interface AppData {
  home: HomePageData | null;
  about: AboutPageData | null;
  products: ArticlesPageData | null;
  article: ArticlePageData | null;
}

/**
 * Helper so we don't have to define the null values when building the app data
 * for a specific page
 * @param data - The data to build the app data from
 * @returns
 */
export const buildAppDataHelper = (data: {
  home?: HomePageData;
  about?: AboutPageData;
  articles?: ArticlesPageData;
  article?: ArticlePageData;
}): AppData => {
  return {
    home: data.home || null,
    about: data.about || null,
    products: data.articles || null,
    article: data.article || null,
  };
};

/**
 * Global window object interface that
 * is used to inject the data into the app from
 * the server side
 * __INITIAL_DATA__ is the data that is injected into the app from
 * the server side
 * __SSR__ is a boolean that is used to determine if the app is being
 * rendered on the server side or the client side
 */
declare global {
  interface Window {
    __INITIAL_DATA__?: AppData;
    __SSR__: boolean;
  }
}
