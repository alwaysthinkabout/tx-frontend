import { defineConfig, IApi } from "umi";

export default defineConfig({
  routes: [
    { path: "/", component: "index" },
    { path: "/login", component: "login/index" },
    { path: "/login/register", component: "login/register" },
    { path: "/login/forget", component: "login/forget" },
    { path: "/login/review", component: "login/review" },
    { path: "/scan", component: "scan" },
    { path: "/scanCheck", component: "scanCheck" },
    { path: "/verify", component: "verify" },
    { path: "/personal", component: "personal" },
    { path: "/personal/qrcode", component: "qrcode" },
    { path: "/*", component: "404" },
  ],

  npmClient: "pnpm",
  proxy: {
    "/api": {
      target: "http://tongkang.soultrial.top/api/",
      changeOrigin: true,
      pathRewrite: { "^/api": "" },
    },
  },
  plugins: [
    "@umijs/plugins/dist/tailwindcss",
    // "./plugin/index",
  ],
  scripts: [
    {
      src: "https://res.wx.qq.com/open/js/jweixin-1.6.0.js",
    },
  ],
  tailwindcss: {},
});
