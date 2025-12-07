const buildAppDataHelper = (data) => {
  return {
    home: data.home || null,
    about: data.about || null,
    products: data.articles || null,
    article: data.article || null
  };
};
export {
  buildAppDataHelper as b
};
