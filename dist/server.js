/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

eval("{\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\nmodule.exports = function (cssWithMappingToString) {\n  var list = [];\n\n  // return the list of modules as css string\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = \"\";\n      var needLayer = typeof item[5] !== \"undefined\";\n      if (item[4]) {\n        content += \"@supports (\".concat(item[4], \") {\");\n      }\n      if (item[2]) {\n        content += \"@media \".concat(item[2], \" {\");\n      }\n      if (needLayer) {\n        content += \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\");\n      }\n      content += cssWithMappingToString(item);\n      if (needLayer) {\n        content += \"}\";\n      }\n      if (item[2]) {\n        content += \"}\";\n      }\n      if (item[4]) {\n        content += \"}\";\n      }\n      return content;\n    }).join(\"\");\n  };\n\n  // import a list of modules into the list\n  list.i = function i(modules, media, dedupe, supports, layer) {\n    if (typeof modules === \"string\") {\n      modules = [[null, modules, undefined]];\n    }\n    var alreadyImportedModules = {};\n    if (dedupe) {\n      for (var k = 0; k < this.length; k++) {\n        var id = this[k][0];\n        if (id != null) {\n          alreadyImportedModules[id] = true;\n        }\n      }\n    }\n    for (var _k = 0; _k < modules.length; _k++) {\n      var item = [].concat(modules[_k]);\n      if (dedupe && alreadyImportedModules[item[0]]) {\n        continue;\n      }\n      if (typeof layer !== \"undefined\") {\n        if (typeof item[5] === \"undefined\") {\n          item[5] = layer;\n        } else {\n          item[1] = \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\").concat(item[1], \"}\");\n          item[5] = layer;\n        }\n      }\n      if (media) {\n        if (!item[2]) {\n          item[2] = media;\n        } else {\n          item[1] = \"@media \".concat(item[2], \" {\").concat(item[1], \"}\");\n          item[2] = media;\n        }\n      }\n      if (supports) {\n        if (!item[4]) {\n          item[4] = \"\".concat(supports);\n        } else {\n          item[1] = \"@supports (\".concat(item[4], \") {\").concat(item[1], \"}\");\n          item[4] = supports;\n        }\n      }\n      list.push(item);\n    }\n  };\n  return list;\n};\n\n//# sourceURL=webpack://ssr-frontend/./node_modules/css-loader/dist/runtime/api.js?\n}");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/noSourceMaps.js":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/noSourceMaps.js ***!
  \**************************************************************/
/***/ ((module) => {

eval("{\n\nmodule.exports = function (i) {\n  return i[1];\n};\n\n//# sourceURL=webpack://ssr-frontend/./node_modules/css-loader/dist/runtime/noSourceMaps.js?\n}");

/***/ }),

/***/ "./src/components/App.tsx":
/*!********************************!*\
  !*** ./src/components/App.tsx ***!
  \********************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("{\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst jsx_runtime_1 = __webpack_require__(/*! react/jsx-runtime */ \"react/jsx-runtime\");\n__webpack_require__(/*! ../styles/global.css */ \"./src/styles/global.css\");\nconst react_router_dom_1 = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\nconst siteHeader_1 = __importDefault(__webpack_require__(/*! ./shared/siteHeader */ \"./src/components/shared/siteHeader.tsx\"));\nconst siteFooter_1 = __webpack_require__(/*! ./shared/siteFooter */ \"./src/components/shared/siteFooter.tsx\");\nconst HomePage_1 = __webpack_require__(/*! ../pages/home/HomePage */ \"./src/pages/home/HomePage.tsx\");\nconst AboutPage_1 = __webpack_require__(/*! ../pages/about/AboutPage */ \"./src/pages/about/AboutPage.tsx\");\nconst ArticlesPage_1 = __webpack_require__(/*! ../pages/articles/ArticlesPage */ \"./src/pages/articles/ArticlesPage.tsx\");\nconst ArticlePage_1 = __webpack_require__(/*! ../pages/article/ArticlePage */ \"./src/pages/article/ArticlePage.tsx\");\nconst useSSRContext_1 = __webpack_require__(/*! ./hooks/useSSRContext */ \"./src/components/hooks/useSSRContext.tsx\");\nconst scroller_1 = __webpack_require__(/*! ./scroller */ \"./src/components/scroller.tsx\");\nconst App = ({ data }) => {\n    const { isSSR } = (0, useSSRContext_1.useSSRContext)();\n    // Use SSR data if available (from props on server, or window on client)\n    // Once SSR is cleared, all pages get null and must fetch their own data\n    const appData = isSSR\n        ? data ||\n            (typeof window !== \"undefined\" ? window.__INITIAL_DATA__ : null) || {\n            home: null,\n            about: null,\n            products: null,\n            article: null,\n        }\n        : { home: null, about: null, products: null, article: null };\n    return ((0, jsx_runtime_1.jsxs)(\"div\", { style: {\n            minHeight: \"100vh\",\n            width: \"100vw\",\n            overflow: \"hidden\",\n            display: \"flex\",\n            flexDirection: \"column\",\n            justifyContent: \"space-between\",\n            alignItems: \"stretch\",\n        }, children: [(0, jsx_runtime_1.jsx)(scroller_1.Scroller, {}), (0, jsx_runtime_1.jsx)(siteHeader_1.default, {}), (0, jsx_runtime_1.jsx)(\"div\", { style: {\n                    flexGrow: 1,\n                    display: \"flex\",\n                    marginTop: \"57px\",\n                    justifyContent: \"stretch\",\n                }, children: (0, jsx_runtime_1.jsxs)(react_router_dom_1.Routes, { children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: \"/\", element: (0, jsx_runtime_1.jsx)(HomePage_1.HomePage, { data: appData.home }) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: \"/about\", element: (0, jsx_runtime_1.jsx)(AboutPage_1.AboutPage, { data: appData.about }) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: \"/articles\", element: (0, jsx_runtime_1.jsx)(ArticlesPage_1.ArticlesPage, { data: appData.products }) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: \"/article/:id\", element: (0, jsx_runtime_1.jsx)(ArticlePage_1.ArticlePage, { data: appData.article }) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: \"*\", element: (0, jsx_runtime_1.jsxs)(\"div\", { children: [(0, jsx_runtime_1.jsx)(\"h1\", { children: \"SPA Route\" }), (0, jsx_runtime_1.jsx)(\"p\", { children: \"This route is client-side only\" })] }) })] }) }), (0, jsx_runtime_1.jsx)(siteFooter_1.SiteFooter, {})] }));\n};\nexports[\"default\"] = App;\n\n\n//# sourceURL=webpack://ssr-frontend/./src/components/App.tsx?\n}");

/***/ }),

/***/ "./src/components/hooks/useCryptoPrices.ts":
/*!*************************************************!*\
  !*** ./src/components/hooks/useCryptoPrices.ts ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("{\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.useCryptoPrices = exports.CryptoType = void 0;\nconst react_1 = __webpack_require__(/*! react */ \"react\");\nvar CryptoType;\n(function (CryptoType) {\n    CryptoType[\"BTC\"] = \"BTC\";\n    CryptoType[\"ETH\"] = \"ETH\";\n    CryptoType[\"SOL\"] = \"SOL\";\n    CryptoType[\"XMR\"] = \"XMR\";\n})(CryptoType || (exports.CryptoType = CryptoType = {}));\nconst createTokenPair = (crypto) => `${crypto}-USD`;\nconst tokenPairs = [\n    createTokenPair(CryptoType.BTC),\n    createTokenPair(CryptoType.ETH),\n    createTokenPair(CryptoType.SOL),\n    createTokenPair(CryptoType.XMR),\n];\nconst useCryptoPrices = () => {\n    // Use a single state object to store all token data\n    const [tokensData, setTokensData] = (0, react_1.useState)({});\n    (0, react_1.useEffect)(() => {\n        // set up a web socket connection to the server\n        const ws = new WebSocket('wss://data-streamer.cryptocompare.com/');\n        ws.onopen = () => {\n            // Dynamically subscribe to all token pairs\n            tokenPairs.forEach(pair => {\n                ws.send(JSON.stringify({\n                    action: \"SUBSCRIBE\",\n                    type: \"index_cc_v1_latest_tick\",\n                    groups: [\"VALUE\", \"LAST_UPDATE\", \"MOVING_24_HOUR\"],\n                    market: \"cadli\",\n                    instruments: [pair]\n                }));\n            });\n        };\n        ws.onmessage = (event) => {\n            const data = JSON.parse(event.data);\n            if (data.TYPE === '1101' && data.INSTRUMENT) {\n                const instrument = data.INSTRUMENT;\n                // Update the token data in state\n                setTokensData(prevData => ({\n                    ...prevData,\n                    [instrument]: {\n                        price: data.VALUE || 0,\n                        priceChange: data.MOVING_24_HOUR_CHANGE_PERCENTAGE || 0\n                    }\n                }));\n            }\n        };\n        return () => {\n            // close the web socket connection when the component unmounts\n            if (ws) {\n                ws.close();\n            }\n        };\n    }, []); // Re-run effect if tokenPairs changes\n    return { tokensData, tokenPairs };\n};\nexports.useCryptoPrices = useCryptoPrices;\n\n\n//# sourceURL=webpack://ssr-frontend/./src/components/hooks/useCryptoPrices.ts?\n}");

/***/ }),

/***/ "./src/components/hooks/useDetectIsMobile.tsx":
/*!****************************************************!*\
  !*** ./src/components/hooks/useDetectIsMobile.tsx ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("{\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.useDetectIsMobile = void 0;\nconst react_1 = __webpack_require__(/*! react */ \"react\");\nconst mobileAppBreakPointInPx = 415;\nconst subscribe = (callback) => {\n    window.addEventListener(\"resize\", callback);\n    return () => window.removeEventListener(\"resize\", callback);\n};\nconst getSnapshot = () => window.innerWidth < mobileAppBreakPointInPx;\nconst getServerSnapshot = () => true; // SSR default: assume mobile\nconst useDetectIsMobile = () => {\n    return (0, react_1.useSyncExternalStore)(subscribe, getSnapshot, getServerSnapshot);\n};\nexports.useDetectIsMobile = useDetectIsMobile;\n\n\n//# sourceURL=webpack://ssr-frontend/./src/components/hooks/useDetectIsMobile.tsx?\n}");

/***/ }),

/***/ "./src/components/hooks/usePageData.tsx":
/*!**********************************************!*\
  !*** ./src/components/hooks/usePageData.tsx ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("{\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.usePageData = usePageData;\nconst react_1 = __webpack_require__(/*! react */ \"react\");\n/**\n * A React hook for managing page data with SSR hydration support.\n *\n * This hook handles the data lifecycle for pages that may receive initial data\n * from server-side rendering. When `initialData` is provided (SSR case), it uses\n * that data immediately without making a network request. When `initialData` is\n * null (client-side navigation), it fetches the data from the specified API route.\n *\n * @template T - The shape of the page data being fetched\n *\n * @param initialData - Pre-fetched data from SSR, or null if fetching client-side\n * @param apiRoute - The API endpoint to fetch data from when no initial data exists\n *\n * @returns An object containing:\n *   - `data` - The fetched data, or null if not yet loaded\n *   - `loading` - Whether a fetch is currently in progress\n *   - `error` - Any error that occurred during fetching, or null\n *\n * @example\n * ```tsx\n * const { data, loading, error } = usePageData<HomePageData>(\n *   ssrContext?.pageData ?? null,\n *   '/api/home'\n * );\n * ```\n */\nfunction usePageData(initialData, apiRoute) {\n    const [data, setData] = (0, react_1.useState)(initialData);\n    const [loading, setLoading] = (0, react_1.useState)(!initialData);\n    const [error, setError] = (0, react_1.useState)(null);\n    (0, react_1.useEffect)(() => {\n        console.log(\"usePageData\", initialData, apiRoute);\n        if (!initialData) {\n            setLoading(true);\n            fetch(apiRoute)\n                .then((res) => res.json())\n                .then((data) => {\n                setData(data.data);\n                if (typeof window !== \"undefined\") {\n                    window.document.title = data.title;\n                }\n            })\n                .catch(setError)\n                .finally(() => setLoading(false));\n        }\n    }, [initialData, apiRoute]);\n    return { data, loading, error };\n}\n\n\n//# sourceURL=webpack://ssr-frontend/./src/components/hooks/usePageData.tsx?\n}");

/***/ }),

/***/ "./src/components/hooks/useSSRContext.tsx":
/*!************************************************!*\
  !*** ./src/components/hooks/useSSRContext.tsx ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("{\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.useSSRContext = exports.SSRProvider = void 0;\nconst jsx_runtime_1 = __webpack_require__(/*! react/jsx-runtime */ \"react/jsx-runtime\");\nconst react_1 = __webpack_require__(/*! react */ \"react\");\nconst SSRContext = (0, react_1.createContext)(null);\nconst SSRProvider = ({ children }) => {\n    const [isSSR, setIsSSR] = (0, react_1.useState)(typeof window !== \"undefined\" ? window.__SSR__ : true);\n    /**\n     * Clears all SSR data and switches the app to SPA mode permanently.\n     * Call this when navigating away from an SSR-rendered page\n     * to ensure the app fetches fresh data from the API.\n     */\n    const clearSSRData = (0, react_1.useCallback)(() => {\n        if (!isSSR)\n            return; // Already cleared, nothing to do\n        // Clear the window SSR flag\n        if (typeof window !== \"undefined\") {\n            window.__SSR__ = false;\n            window.__INITIAL_DATA__ = undefined;\n        }\n        setIsSSR(false);\n    }, [isSSR]);\n    const value = {\n        isSSR,\n        clearSSRData,\n    };\n    return (0, jsx_runtime_1.jsx)(SSRContext.Provider, { value: value, children: children });\n};\nexports.SSRProvider = SSRProvider;\n/**\n * Hook to access SSR context.\n * Must be used within an SSRProvider.\n */\nconst useSSRContext = () => {\n    const context = (0, react_1.useContext)(SSRContext);\n    if (!context) {\n        throw new Error(\"useSSRContext must be used within an SSRProvider\");\n    }\n    return context;\n};\nexports.useSSRContext = useSSRContext;\n\n\n//# sourceURL=webpack://ssr-frontend/./src/components/hooks/useSSRContext.tsx?\n}");

/***/ }),

/***/ "./src/components/scroller.tsx":
/*!*************************************!*\
  !*** ./src/components/scroller.tsx ***!
  \*************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("{\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.Scroller = void 0;\nconst jsx_runtime_1 = __webpack_require__(/*! react/jsx-runtime */ \"react/jsx-runtime\");\nconst lenis_1 = __importDefault(__webpack_require__(/*! lenis */ \"lenis\"));\nconst react_1 = __webpack_require__(/*! react */ \"react\");\nconst Scroller = () => {\n    (0, react_1.useEffect)(() => {\n        if (typeof window !== \"undefined\") {\n            // Initialize Lenis\n            const lenis = new lenis_1.default({\n                autoRaf: true,\n            });\n            // Listen for the scroll event and log the event data\n            lenis.on(\"scroll\", (e) => {\n                console.log(e);\n            });\n        }\n    }, [typeof window]);\n    return (0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, {});\n};\nexports.Scroller = Scroller;\n\n\n//# sourceURL=webpack://ssr-frontend/./src/components/scroller.tsx?\n}");

/***/ }),

/***/ "./src/components/shared/internalLink.tsx":
/*!************************************************!*\
  !*** ./src/components/shared/internalLink.tsx ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("{\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.InternalLink = void 0;\nconst jsx_runtime_1 = __webpack_require__(/*! react/jsx-runtime */ \"react/jsx-runtime\");\nconst react_router_dom_1 = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\nconst useSSRContext_1 = __webpack_require__(/*! ../hooks/useSSRContext */ \"./src/components/hooks/useSSRContext.tsx\");\nconst InternalLink = ({ href, children, }) => {\n    const { clearSSRData } = (0, useSSRContext_1.useSSRContext)();\n    const handleClick = () => {\n        // Clear SSR data when navigating to ensure the app\n        // behaves like an SPA and fetches fresh data\n        clearSSRData();\n    };\n    return ((0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: href, onClick: handleClick, children: children }));\n};\nexports.InternalLink = InternalLink;\n\n\n//# sourceURL=webpack://ssr-frontend/./src/components/shared/internalLink.tsx?\n}");

/***/ }),

/***/ "./src/components/shared/siteFooter.tsx":
/*!**********************************************!*\
  !*** ./src/components/shared/siteFooter.tsx ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("{\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.SiteFooter = void 0;\nconst jsx_runtime_1 = __webpack_require__(/*! react/jsx-runtime */ \"react/jsx-runtime\");\nconst useCryptoPrices_1 = __webpack_require__(/*! ../hooks/useCryptoPrices */ \"./src/components/hooks/useCryptoPrices.ts\");\nconst SiteFooter = () => {\n    const { tokensData, tokenPairs } = (0, useCryptoPrices_1.useCryptoPrices)();\n    return ((0, jsx_runtime_1.jsx)(\"div\", { style: {\n            display: \"flex\",\n            flexWrap: \"wrap\",\n            alignItems: \"center\",\n            justifyContent: \"center\",\n            flexDirection: \"row\",\n            overflow: \"hidden\",\n            backgroundColor: \"white\",\n            borderTop: \"1px solid #e0e0e0\",\n            padding: \"16px\",\n        }, children: (0, jsx_runtime_1.jsxs)(\"div\", { style: {\n                flexGrow: 1,\n                maxWidth: \"1440px\",\n                display: \"flex\",\n                alignItems: \"center\",\n                flexWrap: \"wrap\",\n            }, children: [(0, jsx_runtime_1.jsxs)(\"div\", { style: {\n                        display: \"flex\",\n                        alignItems: \"stretch\",\n                        flexDirection: \"column\",\n                        flexGrow: 1,\n                    }, children: [(0, jsx_runtime_1.jsxs)(\"div\", { style: {\n                                marginLeft: \"16px\",\n                                display: \"flex\",\n                                alignItems: \"center\",\n                            }, children: [(0, jsx_runtime_1.jsx)(\"img\", { src: \"/tropicalgalaxy.png\", style: {\n                                        height: \"32px\",\n                                        marginRight: \"16px\",\n                                    } }), (0, jsx_runtime_1.jsxs)(\"div\", { style: { fontSize: \"16px!important\" }, children: [\" \", \"\\u00A9 Tropical Galaxy 2025\"] })] }), (0, jsx_runtime_1.jsx)(\"div\", { style: {\n                                display: \"flex\",\n                                alignItems: \"stretch\",\n                                paddingLeft: \"64px\",\n                                flexWrap: \"wrap\",\n                            }, children: tokenPairs.map((pair) => {\n                                const symbol = pair.split(\"-\")[0]; // Extract symbol from pair (e.g., \"BTC\" from \"BTC-USD\")\n                                const tokenData = tokensData[pair] || {\n                                    price: 0,\n                                    priceChange: 0,\n                                };\n                                return ((0, jsx_runtime_1.jsxs)(\"div\", { style: {\n                                        paddingLeft: \"8px\",\n                                        paddingRight: \"8px\",\n                                        display: \"flex\",\n                                        alignItems: \"center\",\n                                    }, children: [(0, jsx_runtime_1.jsxs)(\"div\", { style: {\n                                                fontSize: \"12px\",\n                                                lineHeight: \"14px\",\n                                                whiteSpace: \"nowrap\",\n                                            }, children: [symbol, \":\", \" \", tokenData.price === 0\n                                                    ? \"$--.--\"\n                                                    : new Intl.NumberFormat(\"en-US\", {\n                                                        style: \"currency\",\n                                                        currency: \"USD\",\n                                                    }).format(tokenData.price)] }), (0, jsx_runtime_1.jsxs)(\"div\", { style: {\n                                                color: tokenData.priceChange > 0 ? \"green\" : \"#ff4d4f\",\n                                                fontSize: \"12px\",\n                                                lineHeight: \"14px\",\n                                                marginLeft: \"4px\",\n                                            }, children: [tokenData.priceChange > 0 ? \"+\" : \"\", new Intl.NumberFormat(\"en-US\", {\n                                                    style: \"decimal\",\n                                                    minimumFractionDigits: 2,\n                                                    maximumFractionDigits: 2,\n                                                }).format(tokenData.priceChange), \"%\"] })] }, pair));\n                            }) })] }), (0, jsx_runtime_1.jsx)(\"div\", { style: {\n                        flexGrow: 1,\n                        display: \"flex\",\n                        flexDirection: \"row-reverse\",\n                    }, children: (0, jsx_runtime_1.jsx)(\"img\", { src: \"/doomer.png\", alt: \"Blog.dev\", style: {\n                            height: \"128px\",\n                            marginBottom: \"-18px\",\n                            transform: \"scaleX(-1)\",\n                        } }) })] }) }));\n};\nexports.SiteFooter = SiteFooter;\n\n\n//# sourceURL=webpack://ssr-frontend/./src/components/shared/siteFooter.tsx?\n}");

/***/ }),

/***/ "./src/components/shared/siteHeader.tsx":
/*!**********************************************!*\
  !*** ./src/components/shared/siteHeader.tsx ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("{\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst jsx_runtime_1 = __webpack_require__(/*! react/jsx-runtime */ \"react/jsx-runtime\");\nconst useDetectIsMobile_1 = __webpack_require__(/*! ../hooks/useDetectIsMobile */ \"./src/components/hooks/useDetectIsMobile.tsx\");\nconst internalLink_1 = __webpack_require__(/*! ./internalLink */ \"./src/components/shared/internalLink.tsx\");\nconst Header = () => {\n    const isMobile = (0, useDetectIsMobile_1.useDetectIsMobile)();\n    return ((0, jsx_runtime_1.jsx)(\"div\", { style: {\n            display: \"flex\",\n            alignItems: \"center\",\n            width: \"100%\",\n            zIndex: 1000,\n            overflow: \"hidden\",\n            position: \"fixed\",\n            justifyContent: \"center\",\n            flexDirection: \"row\",\n            height: \"56px\",\n            backgroundColor: \"white\",\n            borderBottom: \"1px solid #e0e0e0\",\n            //padding: \"0 16px\",\n        }, children: (0, jsx_runtime_1.jsxs)(\"div\", { style: {\n                flexGrow: 1,\n                margin: \"0 16px\",\n                maxWidth: \"1440px\",\n                display: \"flex\",\n                flexDirection: \"row\",\n                alignItems: \"center\",\n            }, children: [(0, jsx_runtime_1.jsx)(\"div\", { style: {\n                        //paddingLeft: \"64px\",\n                        flexGrow: 1,\n                    }, children: (0, jsx_runtime_1.jsx)(internalLink_1.InternalLink, { href: \"/\", children: (0, jsx_runtime_1.jsxs)(\"div\", { style: {\n                                display: \"flex\",\n                                alignItems: \"center\",\n                                gap: \"8px\",\n                            }, children: [(0, jsx_runtime_1.jsx)(\"img\", { src: \"/tropicalgalaxy.png\", alt: \"Blog.dev\", style: { height: \"32px\" } }), (0, jsx_runtime_1.jsx)(\"div\", { style: {\n                                        fontSize: \"18px\",\n                                        fontWeight: \"bold\",\n                                    }, children: \"Tropical Construction\" })] }) }) }), (0, jsx_runtime_1.jsxs)(\"div\", { style: {\n                        display: \"flex\",\n                        gap: \"16px\",\n                    }, children: [(0, jsx_runtime_1.jsx)(internalLink_1.InternalLink, { href: \"/articles\", children: \"Posts\" }), (0, jsx_runtime_1.jsx)(internalLink_1.InternalLink, { href: \"/about\", children: \"About\" })] })] }) }));\n};\nexports[\"default\"] = Header;\n\n\n//# sourceURL=webpack://ssr-frontend/./src/components/shared/siteHeader.tsx?\n}");

/***/ }),

/***/ "./src/constants.ts":
/*!**************************!*\
  !*** ./src/constants.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports) => {

eval("{\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.ARTICLE_PAGE_DESCRIPTION = exports.ARTICLE_PAGE_TITLE = exports.ARTICLES_PAGE_DESCRIPTION = exports.ARTICLES_PAGE_TITLE = exports.ABOUT_PAGE_DESCRIPTION = exports.ABOUT_PAGE_TITLE = exports.HOME_PAGE_DESCRIPTION = exports.HOME_PAGE_TITLE = exports.API_ROUTES_ROOT = void 0;\nexports.API_ROUTES_ROOT = \"/api/v1\";\n// page titles\nexports.HOME_PAGE_TITLE = \"Home - React SSR\";\nexports.HOME_PAGE_DESCRIPTION = \"Home page with full SSR for SEO\";\nexports.ABOUT_PAGE_TITLE = \"About - React SSR\";\nexports.ABOUT_PAGE_DESCRIPTION = \"About page with full SSR for SEO\";\nexports.ARTICLES_PAGE_TITLE = \"Articles - React SSR\";\nexports.ARTICLES_PAGE_DESCRIPTION = \"Articles page with full SSR for SEO\";\nexports.ARTICLE_PAGE_TITLE = \"Article - React SSR\";\nexports.ARTICLE_PAGE_DESCRIPTION = \"Article page with full SSR for SEO\";\n\n\n//# sourceURL=webpack://ssr-frontend/./src/constants.ts?\n}");

/***/ }),

/***/ "./src/pages/about/AboutPage.tsx":
/*!***************************************!*\
  !*** ./src/pages/about/AboutPage.tsx ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("{\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.AboutPage = void 0;\nconst jsx_runtime_1 = __webpack_require__(/*! react/jsx-runtime */ \"react/jsx-runtime\");\nconst usePageData_1 = __webpack_require__(/*! ../../components/hooks/usePageData */ \"./src/components/hooks/usePageData.tsx\");\nconst aboutPageRoutes_1 = __webpack_require__(/*! ./aboutPageRoutes */ \"./src/pages/about/aboutPageRoutes.ts\");\nconst AboutPage = ({ data: _data, }) => {\n    console.log(\"AboutPage\", _data, aboutPageRoutes_1.aboutPageApiRoute);\n    const { data, loading, error } = (0, usePageData_1.usePageData)(_data, aboutPageRoutes_1.aboutPageApiRoute);\n    if (loading) {\n        return (0, jsx_runtime_1.jsx)(\"div\", { children: \"Loading...\" });\n    }\n    if (error || !data) {\n        return (0, jsx_runtime_1.jsxs)(\"div\", { children: [\"Error: \", error?.message || \"Unknown error\"] });\n    }\n    return ((0, jsx_runtime_1.jsxs)(\"div\", { children: [(0, jsx_runtime_1.jsx)(\"h1\", { children: \"About Page\" }), (0, jsx_runtime_1.jsxs)(\"p\", { children: [\"Message: \", data.message] }), (0, jsx_runtime_1.jsxs)(\"p\", { children: [\"Company: \", data.company] })] }));\n};\nexports.AboutPage = AboutPage;\n\n\n//# sourceURL=webpack://ssr-frontend/./src/pages/about/AboutPage.tsx?\n}");

/***/ }),

/***/ "./src/pages/about/aboutPageData.ts":
/*!******************************************!*\
  !*** ./src/pages/about/aboutPageData.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("{\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.getAboutPageData = void 0;\nconst getAboutPageData = async () => {\n    return {\n        message: \"About page SSR data\",\n        company: \"Tropical Galaxy Inc\",\n    };\n};\nexports.getAboutPageData = getAboutPageData;\n\n\n//# sourceURL=webpack://ssr-frontend/./src/pages/about/aboutPageData.ts?\n}");

/***/ }),

/***/ "./src/pages/about/aboutPageRoutes.ts":
/*!********************************************!*\
  !*** ./src/pages/about/aboutPageRoutes.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("{\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.aboutRoutes = exports.aboutPageApiRoute = exports.aboutPageRoute = void 0;\nconst pageTypes_1 = __webpack_require__(/*! ../../types/pageTypes */ \"./src/types/pageTypes.ts\");\nconst ssr_helper_1 = __webpack_require__(/*! ../../ssr-helper */ \"./src/ssr-helper.tsx\");\nconst constants_1 = __webpack_require__(/*! ../../constants */ \"./src/constants.ts\");\nconst aboutPageData_1 = __webpack_require__(/*! ./aboutPageData */ \"./src/pages/about/aboutPageData.ts\");\nexports.aboutPageRoute = \"/about\";\nexports.aboutPageApiRoute = constants_1.API_ROUTES_ROOT + exports.aboutPageRoute;\nconst aboutRoutes = (app) => {\n    app.get(exports.aboutPageRoute, async (req, res) => {\n        // static route for getting the about page data\n        const data = await (0, aboutPageData_1.getAboutPageData)();\n        const { html, data: pageData } = (0, ssr_helper_1.renderSSRPage)(req.url, // pass the entire url into here\n        (0, pageTypes_1.buildAppDataHelper)({ about: data }));\n        const document = (0, ssr_helper_1.buildHTMLDocument)(constants_1.ABOUT_PAGE_TITLE, constants_1.ABOUT_PAGE_DESCRIPTION, html, pageData);\n        res.send(document);\n    });\n    app.get(exports.aboutPageApiRoute, async (req, res) => {\n        const data = await (0, aboutPageData_1.getAboutPageData)();\n        res.json({\n            data,\n            title: constants_1.ABOUT_PAGE_TITLE,\n        });\n    });\n};\nexports.aboutRoutes = aboutRoutes;\n\n\n//# sourceURL=webpack://ssr-frontend/./src/pages/about/aboutPageRoutes.ts?\n}");

/***/ }),

/***/ "./src/pages/article/ArticlePage.tsx":
/*!*******************************************!*\
  !*** ./src/pages/article/ArticlePage.tsx ***!
  \*******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("{\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.ArticlePage = void 0;\nconst jsx_runtime_1 = __webpack_require__(/*! react/jsx-runtime */ \"react/jsx-runtime\");\nconst usePageData_1 = __webpack_require__(/*! ../../components/hooks/usePageData */ \"./src/components/hooks/usePageData.tsx\");\nconst articlePageRoutes_1 = __webpack_require__(/*! ./articlePageRoutes */ \"./src/pages/article/articlePageRoutes.ts\");\nconst pageBreakLarge = 1280;\nconst pageBreakMedium = 1024;\nconst ArticlePage = ({ data: _data, }) => {\n    const { data, loading, error } = (0, usePageData_1.usePageData)(_data, articlePageRoutes_1.articlePageApiRoute);\n    if (loading) {\n        return (0, jsx_runtime_1.jsx)(\"div\", { children: \"Loading...\" });\n    }\n    if (error || !data) {\n        return (0, jsx_runtime_1.jsxs)(\"div\", { children: [\"Error: \", error?.message || \"Unknown error\"] });\n    }\n    return ((0, jsx_runtime_1.jsxs)(\"div\", { children: [(0, jsx_runtime_1.jsx)(\"h1\", { children: data.article.title }), (0, jsx_runtime_1.jsxs)(\"p\", { children: [\"By \", data.article.author, \" on \", data.article.date] }), (0, jsx_runtime_1.jsx)(\"div\", { children: data.contents })] }));\n};\nexports.ArticlePage = ArticlePage;\n\n\n//# sourceURL=webpack://ssr-frontend/./src/pages/article/ArticlePage.tsx?\n}");

/***/ }),

/***/ "./src/pages/article/articlePageData.ts":
/*!**********************************************!*\
  !*** ./src/pages/article/articlePageData.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("{\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.getArticlePageData = void 0;\nconst getArticlePageData = async (id) => {\n    return {\n        article: {\n            id: parseInt(id),\n            title: \"Sample Article\",\n            content: \"\",\n            author: \"Author Name\",\n            date: \"2024-01-15\",\n        },\n        contents: \"\",\n    };\n};\nexports.getArticlePageData = getArticlePageData;\n\n\n//# sourceURL=webpack://ssr-frontend/./src/pages/article/articlePageData.ts?\n}");

/***/ }),

/***/ "./src/pages/article/articlePageRoutes.ts":
/*!************************************************!*\
  !*** ./src/pages/article/articlePageRoutes.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("{\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.articleRoutes = exports.articlePageApiRoute = exports.articlePageRoute = void 0;\nconst pageTypes_1 = __webpack_require__(/*! ../../types/pageTypes */ \"./src/types/pageTypes.ts\");\nconst ssr_helper_1 = __webpack_require__(/*! ../../ssr-helper */ \"./src/ssr-helper.tsx\");\nconst constants_1 = __webpack_require__(/*! ../../constants */ \"./src/constants.ts\");\nconst articlePageData_1 = __webpack_require__(/*! ./articlePageData */ \"./src/pages/article/articlePageData.ts\");\nexports.articlePageRoute = \"/article/:id\";\nexports.articlePageApiRoute = constants_1.API_ROUTES_ROOT + exports.articlePageRoute;\nconst articleRoutes = (app) => {\n    app.get(exports.articlePageRoute, async (req, res) => {\n        const id = req.params.id;\n        if (!id) {\n            return res.status(400).json({ error: \"Article ID is required\" });\n        }\n        // static route for getting the article page data\n        const data = await (0, articlePageData_1.getArticlePageData)(id);\n        const { html, data: pageData } = (0, ssr_helper_1.renderSSRPage)(req.url, // pass the entire url into here\n        (0, pageTypes_1.buildAppDataHelper)({ article: data }));\n        const document = (0, ssr_helper_1.buildHTMLDocument)(constants_1.ARTICLE_PAGE_TITLE, constants_1.ARTICLE_PAGE_DESCRIPTION, html, pageData);\n        res.send(document);\n    });\n    app.get(exports.articlePageApiRoute, async (req, res) => {\n        const id = req.params.id;\n        if (!id) {\n            return res.status(400).json({ error: \"Article ID is required\" });\n        }\n        const data = await (0, articlePageData_1.getArticlePageData)(id);\n        res.json({\n            data,\n            title: constants_1.ARTICLE_PAGE_TITLE,\n        });\n    });\n};\nexports.articleRoutes = articleRoutes;\n\n\n//# sourceURL=webpack://ssr-frontend/./src/pages/article/articlePageRoutes.ts?\n}");

/***/ }),

/***/ "./src/pages/articles/ArticlesPage.tsx":
/*!*********************************************!*\
  !*** ./src/pages/articles/ArticlesPage.tsx ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("{\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.ArticlesPage = void 0;\nconst jsx_runtime_1 = __webpack_require__(/*! react/jsx-runtime */ \"react/jsx-runtime\");\nconst usePageData_1 = __webpack_require__(/*! ../../components/hooks/usePageData */ \"./src/components/hooks/usePageData.tsx\");\nconst articlesPageRoutes_1 = __webpack_require__(/*! ./articlesPageRoutes */ \"./src/pages/articles/articlesPageRoutes.ts\");\nconst ArticlesPage = ({ data: _data, }) => {\n    const { data, loading, error } = (0, usePageData_1.usePageData)(_data, articlesPageRoutes_1.articlesPageApiRoute);\n    if (loading) {\n        return (0, jsx_runtime_1.jsx)(\"div\", { children: \"Loading...\" });\n    }\n    if (error || !data) {\n        return (0, jsx_runtime_1.jsxs)(\"div\", { children: [\"Error: \", error?.message || \"Unknown error\"] });\n    }\n    return ((0, jsx_runtime_1.jsxs)(\"div\", { children: [(0, jsx_runtime_1.jsx)(\"h1\", { children: \"Articles Page\" }), data.articles.map((article) => ((0, jsx_runtime_1.jsxs)(\"div\", { children: [(0, jsx_runtime_1.jsx)(\"h2\", { children: article.title }), (0, jsx_runtime_1.jsx)(\"p\", { children: article.content }), (0, jsx_runtime_1.jsxs)(\"p\", { children: [\"By \", article.author, \" on \", article.date] })] }, article.id)))] }));\n};\nexports.ArticlesPage = ArticlesPage;\n\n\n//# sourceURL=webpack://ssr-frontend/./src/pages/articles/ArticlesPage.tsx?\n}");

/***/ }),

/***/ "./src/pages/articles/articlesPageData.ts":
/*!************************************************!*\
  !*** ./src/pages/articles/articlesPageData.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("{\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.getArticlesPageData = void 0;\nconst getArticlesPageData = async () => {\n    return {\n        articles: [\n            {\n                id: 1,\n                title: \"Getting Started with SSR\",\n                content: \"Server-side rendering improves SEO and initial load times.\",\n                author: \"John Doe\",\n                date: \"2024-01-15\",\n            },\n            {\n                id: 2,\n                title: \"React Best Practices\",\n                content: \"Learn the best practices for building React applications.\",\n                author: \"Jane Smith\",\n                date: \"2024-01-20\",\n            },\n            {\n                id: 2,\n                title: \"React Best Practices\",\n                content: \"Learn the best practices for building React applications.\",\n                author: \"Jane Smith\",\n                date: \"2024-01-20\",\n            },\n            {\n                id: 2,\n                title: \"React Best Practices\",\n                content: \"Learn the best practices for building React applications.\",\n                author: \"Jane Smith\",\n                date: \"2024-01-20\",\n            },\n            {\n                id: 2,\n                title: \"React Best Practices\",\n                content: \"Learn the best practices for building React applications.\",\n                author: \"Jane Smith\",\n                date: \"2024-01-20\",\n            },\n            {\n                id: 2,\n                title: \"React Best Practices\",\n                content: \"Learn the best practices for building React applications.\",\n                author: \"Jane Smith\",\n                date: \"2024-01-20\",\n            },\n            {\n                id: 2,\n                title: \"React Best Practices\",\n                content: \"Learn the best practices for building React applications.\",\n                author: \"Jane Smith\",\n                date: \"2024-01-20\",\n            },\n            {\n                id: 2,\n                title: \"React Best Practices\",\n                content: \"Learn the best practices for building React applications.\",\n                author: \"Jane Smith\",\n                date: \"2024-01-20\",\n            },\n            {\n                id: 2,\n                title: \"React Best Practices\",\n                content: \"Learn the best practices for building React applications.\",\n                author: \"Jane Smith\",\n                date: \"2024-01-20\",\n            },\n            {\n                id: 2,\n                title: \"React Best Practices\",\n                content: \"Learn the best practices for building React applications.\",\n                author: \"Jane Smith\",\n                date: \"2024-01-20\",\n            },\n            {\n                id: 2,\n                title: \"React Best Practices\",\n                content: \"Learn the best practices for building React applications.\",\n                author: \"Jane Smith\",\n                date: \"2024-01-20\",\n            },\n            {\n                id: 2,\n                title: \"React Best Practices\",\n                content: \"Learn the best practices for building React applications.\",\n                author: \"Jane Smith\",\n                date: \"2024-01-20\",\n            },\n        ],\n    };\n};\nexports.getArticlesPageData = getArticlesPageData;\n\n\n//# sourceURL=webpack://ssr-frontend/./src/pages/articles/articlesPageData.ts?\n}");

/***/ }),

/***/ "./src/pages/articles/articlesPageRoutes.ts":
/*!**************************************************!*\
  !*** ./src/pages/articles/articlesPageRoutes.ts ***!
  \**************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("{\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.articlesRoutes = exports.articlesPageApiRoute = exports.articlesPageRoute = void 0;\nconst pageTypes_1 = __webpack_require__(/*! ../../types/pageTypes */ \"./src/types/pageTypes.ts\");\nconst ssr_helper_1 = __webpack_require__(/*! ../../ssr-helper */ \"./src/ssr-helper.tsx\");\nconst constants_1 = __webpack_require__(/*! ../../constants */ \"./src/constants.ts\");\nconst articlesPageData_1 = __webpack_require__(/*! ./articlesPageData */ \"./src/pages/articles/articlesPageData.ts\");\nexports.articlesPageRoute = \"/articles\";\nexports.articlesPageApiRoute = constants_1.API_ROUTES_ROOT + exports.articlesPageRoute;\nconst articlesRoutes = (app) => {\n    app.get(exports.articlesPageRoute, async (req, res) => {\n        // static route for getting the articles page data\n        const data = await (0, articlesPageData_1.getArticlesPageData)();\n        const { html, data: pageData } = (0, ssr_helper_1.renderSSRPage)(req.url, // pass the entire url into here\n        (0, pageTypes_1.buildAppDataHelper)({ articles: data }));\n        const document = (0, ssr_helper_1.buildHTMLDocument)(constants_1.ARTICLES_PAGE_TITLE, constants_1.ARTICLES_PAGE_DESCRIPTION, html, pageData);\n        res.send(document);\n    });\n    app.get(exports.articlesPageApiRoute, async (req, res) => {\n        const data = await (0, articlesPageData_1.getArticlesPageData)();\n        res.json({\n            data,\n            title: constants_1.ARTICLES_PAGE_TITLE,\n        });\n    });\n};\nexports.articlesRoutes = articlesRoutes;\n\n\n//# sourceURL=webpack://ssr-frontend/./src/pages/articles/articlesPageRoutes.ts?\n}");

/***/ }),

/***/ "./src/pages/home/HomePage.tsx":
/*!*************************************!*\
  !*** ./src/pages/home/HomePage.tsx ***!
  \*************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("{\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.HomePage = void 0;\nconst jsx_runtime_1 = __webpack_require__(/*! react/jsx-runtime */ \"react/jsx-runtime\");\nconst usePageData_1 = __webpack_require__(/*! ../../components/hooks/usePageData */ \"./src/components/hooks/usePageData.tsx\");\nconst homePageRoutes_1 = __webpack_require__(/*! ./homePageRoutes */ \"./src/pages/home/homePageRoutes.ts\");\nconst internalLink_1 = __webpack_require__(/*! ../../components/shared/internalLink */ \"./src/components/shared/internalLink.tsx\");\nconst useDetectIsMobile_1 = __webpack_require__(/*! ../../components/hooks/useDetectIsMobile */ \"./src/components/hooks/useDetectIsMobile.tsx\");\nconst HomePage = ({ data: _data, }) => {\n    const { data, loading, error } = (0, usePageData_1.usePageData)(_data, homePageRoutes_1.homePageApiRoute);\n    const isMobile = (0, useDetectIsMobile_1.useDetectIsMobile)();\n    if (loading) {\n        return (0, jsx_runtime_1.jsx)(\"div\", { children: \"Loading...\" });\n    }\n    if (error || !data) {\n        return (0, jsx_runtime_1.jsxs)(\"div\", { children: [\"Error: \", error?.message || \"Unknown error\"] });\n    }\n    return ((0, jsx_runtime_1.jsxs)(\"div\", { style: {\n            height: \"700px\",\n            display: \"flex\",\n            justifyContent: \"center\",\n            alignItems: \"center\",\n            position: \"relative\",\n            padding: \"16px\",\n        }, children: [(0, jsx_runtime_1.jsx)(\"div\", { style: {\n                    position: \"absolute\",\n                    left: 0,\n                    zIndex: 0,\n                    width: \"100vw\",\n                    height: \"100%\",\n                    backgroundImage: \"repeating-linear-gradient(180deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1) 6px,rgba(255, 255, 255, 0.4) 2px,rgba(255, 255, 255, 0.4) 7px),linear-gradient(#321cb0, #6049a6, #c979bb) \",\n                } }), (0, jsx_runtime_1.jsxs)(\"div\", { style: {\n                    zIndex: 10,\n                    display: \"flex\",\n                    flexDirection: \"column\",\n                    paddingTop: \"3%\",\n                    justifyContent: isMobile ? \"\" : \"center\",\n                    width: isMobile ? \"\" : \"40%\",\n                }, children: [\" \", (0, jsx_runtime_1.jsxs)(\"div\", { style: {\n                            display: \"flex\",\n                        }, children: [(0, jsx_runtime_1.jsx)(\"div\", { style: {\n                                    paddingTop: \"3%\",\n                                    display: \"flex\",\n                                    fontSize: isMobile ? \"3.8rem\" : \"4erm\",\n                                    color: \"white\",\n                                    paddingBottom: isMobile ? \"0.5%\" : \"3%\",\n                                }, children: \"Rest your mind.\" }), \" \"] }), (0, jsx_runtime_1.jsx)(\"div\", { style: {\n                            display: \"flex\",\n                        }, children: (0, jsx_runtime_1.jsx)(\"div\", { style: {\n                                padding: \"3% 0% 3% 0%\",\n                                display: \"flex\",\n                                justifyContent: \"flex-start\",\n                                fontSize: isMobile ? \"1.2rem\" : \"1.5em\",\n                                color: \"white\",\n                                width: isMobile ? \"80%\" : \"50%\",\n                            }, children: \"You've been working hard, take a break and discover something new. Maybe a random article or two.\" }) }), (0, jsx_runtime_1.jsx)(\"div\", { style: {\n                            paddingTop: isMobile ? \"8%\" : \"6%\",\n                            display: \"flex\",\n                        }, children: (0, jsx_runtime_1.jsx)(internalLink_1.InternalLink, { href: `/posts/asd`, children: (0, jsx_runtime_1.jsxs)(\"div\", { style: {\n                                    border: \"none\",\n                                    backgroundColor: \"#292827\",\n                                    color: \"white\",\n                                    height: isMobile ? \"40px\" : \"45px\",\n                                    borderRadius: \"25px\",\n                                    width: isMobile ? \"55%\" : \"290px\",\n                                    borderColor: \"#292827\",\n                                    fontSize: isMobile ? \"1.2em\" : \"1.7rem\",\n                                    fontFamily: \"Georgia\",\n                                    display: \"flex\",\n                                    alignItems: \"center\",\n                                    justifyContent: \"center\",\n                                }, children: [\" \", (0, jsx_runtime_1.jsx)(\"div\", { children: \" I'm feeling lucky \" })] }) }) })] }), !isMobile && ((0, jsx_runtime_1.jsx)(\"img\", { src: \"/subject.svg\", alt: \"tmp\", style: { height: isMobile ? \"30vh\" : \"45vh\", zIndex: 100 } }))] }));\n};\nexports.HomePage = HomePage;\n\n\n//# sourceURL=webpack://ssr-frontend/./src/pages/home/HomePage.tsx?\n}");

/***/ }),

/***/ "./src/pages/home/homePageData.ts":
/*!****************************************!*\
  !*** ./src/pages/home/homePageData.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("{\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.getHomePageData = void 0;\nconst getHomePageData = async () => {\n    return {\n        message: \"Home page SSR data\",\n        timestamp: Date.now(),\n    };\n};\nexports.getHomePageData = getHomePageData;\n\n\n//# sourceURL=webpack://ssr-frontend/./src/pages/home/homePageData.ts?\n}");

/***/ }),

/***/ "./src/pages/home/homePageRoutes.ts":
/*!******************************************!*\
  !*** ./src/pages/home/homePageRoutes.ts ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("{\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.homeRoutes = exports.homePageApiRoute = exports.homePageRoute = void 0;\nconst pageTypes_1 = __webpack_require__(/*! ../../types/pageTypes */ \"./src/types/pageTypes.ts\");\nconst ssr_helper_1 = __webpack_require__(/*! ../../ssr-helper */ \"./src/ssr-helper.tsx\");\nconst constants_1 = __webpack_require__(/*! ../../constants */ \"./src/constants.ts\");\nconst homePageData_1 = __webpack_require__(/*! ./homePageData */ \"./src/pages/home/homePageData.ts\");\nexports.homePageRoute = \"/\";\nexports.homePageApiRoute = constants_1.API_ROUTES_ROOT + exports.homePageRoute;\nconst homeRoutes = (app) => {\n    app.get(exports.homePageRoute, async (req, res) => {\n        // static route for getting the homepage data\n        const data = await (0, homePageData_1.getHomePageData)();\n        const { html, data: pageData } = (0, ssr_helper_1.renderSSRPage)(req.url, // pass the entire url into here\n        (0, pageTypes_1.buildAppDataHelper)({ home: data }));\n        const document = (0, ssr_helper_1.buildHTMLDocument)(constants_1.HOME_PAGE_TITLE, constants_1.HOME_PAGE_DESCRIPTION, html, pageData);\n        res.send(document);\n    });\n    app.get(exports.homePageApiRoute, async (req, res) => {\n        const data = await (0, homePageData_1.getHomePageData)();\n        res.json({\n            data,\n            title: constants_1.HOME_PAGE_TITLE,\n        });\n    });\n};\nexports.homeRoutes = homeRoutes;\n\n\n//# sourceURL=webpack://ssr-frontend/./src/pages/home/homePageRoutes.ts?\n}");

/***/ }),

/***/ "./src/server.ts":
/*!***********************!*\
  !*** ./src/server.ts ***!
  \***********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("{\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nconst express_1 = __importDefault(__webpack_require__(/*! express */ \"express\"));\nconst ssr_helper_1 = __webpack_require__(/*! ./ssr-helper */ \"./src/ssr-helper.tsx\");\nconst homePageRoutes_1 = __webpack_require__(/*! ./pages/home/homePageRoutes */ \"./src/pages/home/homePageRoutes.ts\");\nconst aboutPageRoutes_1 = __webpack_require__(/*! ./pages/about/aboutPageRoutes */ \"./src/pages/about/aboutPageRoutes.ts\");\nconst articlesPageRoutes_1 = __webpack_require__(/*! ./pages/articles/articlesPageRoutes */ \"./src/pages/articles/articlesPageRoutes.ts\");\nconst articlePageRoutes_1 = __webpack_require__(/*! ./pages/article/articlePageRoutes */ \"./src/pages/article/articlePageRoutes.ts\");\nconst app = (0, express_1.default)();\napp.use(express_1.default.static(\"public\"));\n// initialize the home page\n(0, homePageRoutes_1.homeRoutes)(app);\n// SSR Route: About page\n(0, aboutPageRoutes_1.aboutRoutes)(app);\n// SSR Route: Articles page\n(0, articlesPageRoutes_1.articlesRoutes)(app);\n// SSR Route: Article page\n(0, articlePageRoutes_1.articleRoutes)(app);\n// Catch-all: SPA mode for all other routes (no SSR)\napp.use((_req, res) => {\n    res.send((0, ssr_helper_1.buildSPADocument)());\n});\napp.listen(3000, () => {\n    console.log(\"Server running on http://localhost:3000\");\n});\n\n\n//# sourceURL=webpack://ssr-frontend/./src/server.ts?\n}");

/***/ }),

/***/ "./src/ssr-helper.tsx":
/*!****************************!*\
  !*** ./src/ssr-helper.tsx ***!
  \****************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

eval("{\nvar __importDefault = (this && this.__importDefault) || function (mod) {\n    return (mod && mod.__esModule) ? mod : { \"default\": mod };\n};\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.renderSSRPage = renderSSRPage;\nexports.buildHTMLDocument = buildHTMLDocument;\nexports.buildSPADocument = buildSPADocument;\nconst jsx_runtime_1 = __webpack_require__(/*! react/jsx-runtime */ \"react/jsx-runtime\");\nconst server_1 = __webpack_require__(/*! react-dom/server */ \"react-dom/server\");\nconst react_router_dom_1 = __webpack_require__(/*! react-router-dom */ \"react-router-dom\");\nconst App_1 = __importDefault(__webpack_require__(/*! ./components/App */ \"./src/components/App.tsx\"));\nconst useSSRContext_1 = __webpack_require__(/*! ./components/hooks/useSSRContext */ \"./src/components/hooks/useSSRContext.tsx\");\nfunction renderSSRPage(url, data) {\n    const html = (0, server_1.renderToString)((0, jsx_runtime_1.jsx)(react_router_dom_1.StaticRouter, { location: url, children: (0, jsx_runtime_1.jsx)(useSSRContext_1.SSRProvider, { children: (0, jsx_runtime_1.jsx)(App_1.default, { data: data }) }) }));\n    return { html, data };\n}\nfunction buildHTMLDocument(title, description, html, data, isSSR = true) {\n    const isDev = \"development\" !== \"production\";\n    return `\n    <!DOCTYPE html>\n    <html>\n      <head>\n        <title>${title}</title>\n        <link rel=\"icon\" href=\"/tropicalgalaxy.png\" />\n        <meta name=\"description\" content=\"${description}\">\n        ${!isDev ? '<link rel=\"stylesheet\" href=\"/styles.css\">' : \"\"}\n      </head>\n      <body>\n        <div id=\"root\">${html}</div>\n        ${isSSR\n        ? `<script>window.__INITIAL_DATA__ = ${JSON.stringify(data)}</script>`\n        : \"\"}\n        <script>window.__SSR__ = ${isSSR}</script>\n        <script src=\"/bundle.js\"></script>\n      </body>\n    </html>\n  `;\n}\nfunction buildSPADocument() {\n    const isDev = \"development\" !== \"production\";\n    return `\n    <!DOCTYPE html>\n    <html>\n      <head>\n        <title>React App</title>\n        <link rel=\"icon\" href=\"/tropicalgalaxy.png\" />\n        ${!isDev ? '<link rel=\"stylesheet\" href=\"/styles.css\">' : \"\"}\n      </head>\n      <body>\n        <div id=\"root\"></div>\n        <script>window.__SSR__ = false</script>\n        <script src=\"/bundle.js\"></script>\n      </body>\n    </html>\n  `;\n}\n\n\n//# sourceURL=webpack://ssr-frontend/./src/ssr-helper.tsx?\n}");

/***/ }),

/***/ "./src/styles/global.css":
/*!*******************************!*\
  !*** ./src/styles/global.css ***!
  \*******************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("{__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"./node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n// Imports\n\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, `html,\nbody {\n  padding: 0;\n  margin: 0;\n  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,\n    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;\n  color: rgb(55, 53, 47);\n  min-height: \"100vh\";\n}`, \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://ssr-frontend/./src/styles/global.css?\n}");

/***/ }),

/***/ "./src/types/pageTypes.ts":
/*!********************************!*\
  !*** ./src/types/pageTypes.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, exports) => {

eval("{\nObject.defineProperty(exports, \"__esModule\", ({ value: true }));\nexports.buildAppDataHelper = void 0;\n/**\n * Helper so we don't have to define the null values when building the app data\n * for a specific page\n * @param data - The data to build the app data from\n * @returns\n */\nconst buildAppDataHelper = (data) => {\n    return {\n        home: data.home || null,\n        about: data.about || null,\n        products: data.articles || null,\n        article: data.article || null,\n    };\n};\nexports.buildAppDataHelper = buildAppDataHelper;\n\n\n//# sourceURL=webpack://ssr-frontend/./src/types/pageTypes.ts?\n}");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

module.exports = require("express");

/***/ }),

/***/ "lenis":
/*!************************!*\
  !*** external "lenis" ***!
  \************************/
/***/ ((module) => {

module.exports = require("lenis");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ "react-dom/server":
/*!***********************************!*\
  !*** external "react-dom/server" ***!
  \***********************************/
/***/ ((module) => {

module.exports = require("react-dom/server");

/***/ }),

/***/ "react-router-dom":
/*!***********************************!*\
  !*** external "react-router-dom" ***!
  \***********************************/
/***/ ((module) => {

module.exports = require("react-router-dom");

/***/ }),

/***/ "react/jsx-runtime":
/*!************************************!*\
  !*** external "react/jsx-runtime" ***!
  \************************************/
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/server.ts");
/******/ 	
/******/ })()
;