import { defineUserConfig } from "vuepress";

import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  lang: "zh-CN",
  title: "AuA の Notebook",
  description: "You-Ao 的笔记本",

  theme,

  // 和 PWA 一起启用
  // shouldPrefetch: false,

  head: [
    ["link", {rel: "preconnect", href: "https://fonts.googleapis.com"}],
    ["link", {rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: ""}],
    ["link", {href: "https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@100..900&display=swap", rel: "stylesheet"}],
  ],
});
