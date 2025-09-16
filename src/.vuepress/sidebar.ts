import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/AI/": [
    "",
    {
      text: "机器学习",
      icon: "laptop-code",
      prefix: "ML/",
      link: "ML/",
      collapsible: true,
      children: "structure"
    }
  ],
});
