import { sidebar } from "vuepress-theme-hope";

export default sidebar({
  "/AI/": [
    "",
    {
      text: "线性代数",
      icon: "calculator",
      link: "math",
    },
    {
      text: "机器学习",
      icon: "laptop-code",
      prefix: "ML/",
      link: "ML/",
      collapsible: true,
      children: "structure"
    },
    {
      text: "计算机视觉导论",
      icon: "eye",
      prefix: "CV/",
      link: "CV/",
      collapsible: true,
      children: "structure"
    },
  ],
  "/Iap/": [
    "",
    {
      text: "毛概",
      prefix: "mao/",
      link: "mao/",
      collapsible: true,
      children: "structure"
    }
  ],
  "/Others/": [
    "",
    {
      text: "中外名曲欣赏",
      icon: "music",
      prefix: "Music/",
      link: "Music/",
      collapsible: true,
      children: "structure"
    }
  ]
});
