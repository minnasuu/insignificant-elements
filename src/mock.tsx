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
    originLink: "https://layrid.tomoyaokada.com/"
  },
  {
    id: "slash-background",
    title: "Slash Background",
    category: "样式",
    date: "2025-09-08",
    tags: ["background"],
    component: <div className="w-full h-full bg-[size:8px_8px] bg-top-left text-black/10 bg-[image:repeating-linear-gradient(315deg,currentColor_0,currentColor_1px,transparent_0,transparent_50%)]"  />,
    originLink: "https://tailwindcss.com/"
  },
  {
    id: 'dot-background',
    title: 'Dots Background',
    category: '样式',
    date: '2025-09-08',
    tags: ['background'],
    component: <div className="w-full h-full p-4 sm:p-8 relative overflow-hidden rounded-lg bg-[image:radial-gradient(var(--pattern-fg)_1px,_transparent_0)] bg-[size:10px_10px] bg-fixed [--pattern-fg:var(--color-gray-950)]/5 dark:[--pattern-fg:var(--color-white)]/10"></div>,
    originLink: "https://tailwindcss.com/"
  }
];