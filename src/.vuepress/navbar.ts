import { navbar } from "vuepress-theme-hope";

export default navbar([
  {
    text: "人工智能",
    icon: "robot",
    children:[
      {
        text: "总览",
        icon: "list",
        link: "/AI/"
      },
      {
        text: "机器学习",
        icon: "laptop-code",
        link: "/AI/ML/"
      }
    ]
  },
]);
