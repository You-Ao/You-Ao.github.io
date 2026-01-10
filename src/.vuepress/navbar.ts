import { navbar } from "vuepress-theme-hope";

export default navbar([
  {
    text: "人工智能",
    icon: "robot",
    prefix: "/AI/",
    children:[
      {
        text: "线性代数",
        icon: "calculator",
        link: "math"
      },
      {
        text: "机器学习",
        icon: "laptop-code",
        link: "ML/"
      },
      {
        text: "计算机视觉导论",
        icon: "eye",
        link: "CV/"
      }
    ]
  },
  {
    text: "思政",
    icon: "star",
    prefix: "/Iap/",
    children:[
      {
        text: "毛概",
        link: "mao/"
      }
    ]
  },
  {
    text: "其他",
    icon: "book",
    prefix: "/Others/",
    children:[
      {
        text: "中外名曲欣赏",
        icon: "music",
        link: "Music/"
      }
    ]
  }
]);
