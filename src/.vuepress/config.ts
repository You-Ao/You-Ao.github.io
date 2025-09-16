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
});
