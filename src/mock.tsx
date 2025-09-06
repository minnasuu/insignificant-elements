  import type { ComponentItem } from "./App";
import MoreCloseIcon from "./pages/Animation/MoreCloseIcon/index";
import TextBottomFilter from "./pages/Visual/TextBottomFilter";

export const components: ComponentItem[] = [
  {
    id: "gradient-divider",
    title: "渐变分割线",
    category: "样式",
    date: "2025-09-04",
    tags: ["linear-gradient"],
    component: (
      <div
        className="w-full h-px to-gray-100"
        style={{
          width: "180px",
          height: "1px",
          background:
            "linear-gradient(to right, rgba(0,0,0,0.02), rgba(0,0,0,0.08), rgba(0,0,0,0.02))",
        }}
      ></div>
    ),
  },
  {
    id: "gradient-wave-divider",
    title: "渐变波浪分割线",
    category: "样式",
    date: "2025-09-04",
    tags: ["linear-gradient"],
    component: (
      <div
        aria-hidden="true"
        style={{
          height: "20px",
          width: "180px",
          backgroundImage: "url(./line.svg)",
          filter: "invert(1)",
          "-webkit-mask-image":
            "linear-gradient(90deg, transparent, #fff 4rem, #fff calc(100% - 4rem), transparent)",
          "mask-image":
            "linear-gradient(90deg, transparent, #fff 4rem, #fff calc(100% - 4rem), transparent)",
        }}
      ></div>
    ),
    originLink: "https://cmdk.paco.me/",
  },
  {
    id: "text-bottom-filter",
    title: "Text Bottom Filter",
    category: "样式",
    date: "2025-09-04",
    tags: ["back-drop-filter"],
    component: <TextBottomFilter />,
    originLink: "https://interfaces.rauno.me/",
  },
  {
    id: "blur-text",
    title: "Blur Text",
    category: "样式",
    date: "2025-09-04",
    tags: ["blur"],
    component: (
      <div className="w-full h-full bg-black flex flex-col gap-2 items-center justify-center rounded-lg">
        <div
          className="text-s text-white"
          style={{ filter: "blur(2px) opacity(0.5)" }}
        >
          今天天气不错
        </div>
        <div
          className="text-s text-white"
          style={{ filter: "blur(2px) opacity(0.8)", transform: "scale(1.1)" }}
        >
          今天天气不错
        </div>
        <div
          className="text-s text-white"
          style={{ filter: "blur(2px) opacity(0.5)" }}
        >
          今天天气不错
        </div>
      </div>
    ),
    originLink: "https://flow.rest/",
  },
  {
    id: "more&close-btn",
    title: "More & Close Button",
    category: "动画",
    date: "2025-09-07",
    tags: ["button", "transform"],
    component: <MoreCloseIcon />,
    originLink: "https://layrid.tomoyaokada.com/",
  },
];