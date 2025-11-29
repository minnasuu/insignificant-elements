import type { ComponentItem } from '../types';

// 静态组件数据 - 从CSV迁移
const staticComponents: ComponentItem[] = [
  {
    id: "3",
    title: "渐变分割线",
    category: "style",
    desc: "",
    html: `<div class="gradient-divider"></div>`,
    css: `.gradient-divider{
  width: 180px;
  height: 1px;
  background: linear-gradient(to right, rgba(0,0,0,0.02), rgba(0,0,0,0.08), rgba(0,0,0,0.02));
}`,
    js: "",
    tags: ["linear-gradient"],
    origin_link: "",
    user_id: "392e3ffb-785f-49c3-abdc-047014c06008",
    created_at: "2025-09-12",
    updated_at: "2025-09-12"
  },
  {
    id: "7",
    title: "渐变旋转边框",
    category: "animation",
    desc: "",
    html: `<a class="styles_button__SL_b_"
href="javascript:;">
  <span class="styles_content__1jMaL">Get Started<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"><path d="M4.5 10H16M16 10L11.5 5.5M16 10L11.5 14.5" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"></path></svg></span><span class="styles_highlight__Zryzp" style=" will-change: transform;"><span class="styles_rainbow__NLqxL" style="will-change: transform;"></span>
  </span>
</a>`,
    css: `@property --rotate {
  syntax: "<angle>";
  initial-value: 0deg;
  inherits: false;
}
.styles_button__SL_b_ {
  cursor: pointer;
  position: relative;
  display: inline-flex;
  text-decoration: none;
}

.styles_button__SL_b_ .styles_content__1jMaL {
  z-index: 2;
  position: relative;
  pointer-events: none;
  display: inline-flex;
  align-items: center;
  column-gap: 6px;
  box-shadow: 0 0 0 1.5px rgba(0, 0, 0, .06);
  border-radius: 50px;
  padding: 9px 16px 9px 20px;
  background-color: #fff;
  font-family: var(--font-sans);
  font-feature-settings: "cv11" on;
  font-size: 16px;
  font-weight: 500;
  line-height: 125%;
  letter-spacing: -.18px;
  color: #221d1d;
  transition: box-shadow .15s ease-in-out, background-color .15s ease-in-out;
}

.styles_button__SL_b_ .styles_highlight__Zryzp {
  z-index: 1;
  position: absolute;
  inset: -3px;
  border-radius: 50px;
  overflow: hidden;
  transform: scale(0.95,0.8);
}

.styles_button__SL_b_ .styles_highlight__Zryzp .styles_rainbow__NLqxL {
  position: absolute;
  inset: -200% -25%;
  --red: #ff8947;
  --blue: #b5e7fa;
  --purple: #9896ff;
  --green: #63bbb6;
  --yellow: #ffd631;
  background: conic-gradient(from var(--rotate) at 50% 50%, var(--red) 0deg, var(--blue) 124.43deg, var(--purple) 179.13deg, var(--green) 233.53deg, var(--yellow) 308.53deg, var(--red) 364.52deg);
}

.styles_button__SL_b_:hover .styles_highlight__Zryzp{
  animation: scaleAniamtion 2s ease-in-out;
}
.styles_button__SL_b_:hover .styles_rainbow__NLqxL{
  animation: spin 2s ease-in-out;
}

@keyframes scaleAniamtion{
  0%,100%{
    transform: scale(0.95, 0.8);
  }
  50%{
    transform: scale(1,1);
  }
}

@keyframes spin {
  0% {
    --rotate: 0deg;
  }

  100% {
    --rotate: 360deg;
  }
}`,
    js: "",
    tags: ["conic-gradient", "@property"],
    origin_link: "https://aave.com/",
    user_id: "392e3ffb-785f-49c3-abdc-047014c06008",
    created_at: "2025-09-15",
    updated_at: "2025-09-15"
  },
  {
    id: "21",
    title: "点阵背景",
    category: "style",
    desc: "",
    html: `<div class="wrapper"></div>`,
    css: `.wrapper{
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  --pattern-fg: color-mix(in oklab, var(--color-gray-950) 5%, transparent);
  background-image: radial-gradient(var(--pattern-fg) 1px, transparent 0);
  background-size: 10px 10px;
  background-attachment: fixed;

}`,
    js: "",
    tags: ["background-image"],
    origin_link: "https://tailwindcss.com/",
    user_id: "392e3ffb-785f-49c3-abdc-047014c06008",
    created_at: "2025-09-12",
    updated_at: "2025-09-12"
  },
  {
    id: "29",
    title: "更多&关闭按钮",
    category: "animation",
    desc: "线条图标的转换动画",
    html: `<div class='more-close-button-wrapper'>
    <button class='header__menu-button' aria-label="menu close">
    <span class="header__menu-line top"></span>
    <span class="header__menu-line bottom"></span>
  </button>
</div>`,
    css: `.more-close-button-wrapper{
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.header__menu-button {
  position: relative;
  width: 30px;
  height: 30px;
  border: none;
  cursor: pointer;
}

.header__menu-line {
  background: #000;
  display: block;
  height: 1px;
  left: 0;
  position: absolute;
  transition: all .4s ease;
  width: 100%;
}

.header__menu-line.top {
  top: 13px;
}

.header__menu-line.bottom {
  top: 17px;
}

.more-close-button-wrapper:hover .header__menu-button .header__menu-line.top {
  top: 15px;
  transform: rotate(30deg);
}

.more-close-button-wrapper:hover .header__menu-button .header__menu-line.bottom {
  top: 15px;
  transform: rotate(-30deg);
}`,
    js: "",
    tags: [],
    origin_link: "https://layrid.tomoyaokada.com/",
    user_id: "392e3ffb-785f-49c3-abdc-047014c06008",
    created_at: "2025-09-12",
    updated_at: "2025-09-12"
  },
  {
    id: "30",
    title: "斜线背景",
    category: "style",
    desc: "",
    html: `<div
  class="slash-bg" />`,
    css: `.slash-bg{
  width: 100%;
  height: 100%;
  background-size: 8px 8px;
  background-position: top left;
  color: color-mix(in oklab, #000 10%, transparent);
  background-image: repeating-linear-gradient(315deg, currentColor 0, currentColor 1px, transparent 0, transparent 50%);

}`,
    js: "",
    tags: ["background-image"],
    origin_link: "https://tailwindcss.com/",
    user_id: "392e3ffb-785f-49c3-abdc-047014c06008",
    created_at: "2025-09-12",
    updated_at: "2025-09-12"
  },
  {
    id: "86",
    title: "文字底部模糊",
    category: "style",
    desc: "只需要 1px 的背景模糊就能达到还不错的效果",
    html: `<div class="text-blur-wrapper">
  <div class="text-blur-content">
    Clicking the input label should focus the input field
    Inputs should be wrapped with a \`<\`form\`> to submit by pressing Enter
      Inputs should have an appropriate type like password, email, etc
      Inputs should disable spellcheck and autocomplete attributes most of the time
      Inputs should leverage HTML form validation by using the required attribute when appropriate
      Input prefix and suffix decorations, such as icons, should be absolutely positioned on top of the text input with
      padding, not next to it, and trigger focus on the input
      Toggles should immediately take effect, not require confirmation
      Buttons should be disabled after submission to avoid duplicate network requests
      Interactive elements should disable user-select for inner content
      Decorative elements (glows, gradients) should disable pointer-events to not hijack events
      Interactive elements in a vertical or horizontal list should have no dead areas between each element, instead,
      increase their padding
  </div>
  <div class="text-blur-bottom"></div>
</div>`,
    css: `.text-blur-wrapper{
  position: relative;
  width: 100%;
  height: 192px;
  overflow: hidden;
}
.text-blur-content{
  font-size: 12px;
  height: 100%;
  padding: 12px;
  overflow: auto;
  color: #333;
  scrollbar-width: none;
}

.text-blur-bottom{
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 30px;
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  pointer-events: none;
  background: linear-gradient(to bottom, transparent, #fcfcfc);
  mask-image: linear-gradient(to top, #fcfcfc 25%, transparent);
  backdrop-filter: blur(1px);
}`,
    js: "",
    tags: ["back-drop-filter"],
    origin_link: "https://interfaces.rauno.me/",
    user_id: "392e3ffb-785f-49c3-abdc-047014c06008",
    created_at: "2025-09-12",
    updated_at: "2025-09-12"
  },
  {
    id: "119",
    title: "文字高光动画",
    category: "animation",
    desc: "",
    html: `<div class="wrapper">
  正在思考
  <div class="light"></div>
</div>`,
    css: `.wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.light {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-image: linear-gradient(106deg, transparent, transparent 35%, #fff, transparent 65%, transparent);
  opacity: 0.8;
  background-size: 258% 100%;
  animation: maskLoading 2s cubic-bezier(0.30, 0.00, 0.70, 1.00) infinite;
  pointer-events: none;

}

@keyframes maskLoading {
  0% {
    background-position: 100%;
  }

  70%,
  100% {
    background-position: 0;
  }
}`,
    js: "",
    tags: ["background-image", "background-position"],
    origin_link: "",
    user_id: "392e3ffb-785f-49c3-abdc-047014c06008",
    created_at: "2025-10-23",
    updated_at: "2025-10-23"
  }
];

// 获取所有组件数据
export async function getComponents(): Promise<ComponentItem[]> {
  // 模拟异步操作
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([...staticComponents]);
    }, 100);
  });
}

// 根据分类获取组件
export async function getComponentsByCategory(category: string): Promise<ComponentItem[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const filtered = staticComponents.filter(component => component.category === category);
      resolve(filtered);
    }, 100);
  });
}

// 获取用户上传的组件（静态版本返回空数组）
export async function getUserComponents(_userId: string): Promise<ComponentItem[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([]);
    }, 100);
  });
}

// 创建新组件（静态版本，仅返回模拟数据）
export interface CreateComponentData {
  title: string;
  category: string;
  desc?: string;
  html?: string;
  css?: string;
  js?: string;
  tags?: string[];
  origin_link?: string;
  user_id: string;
}

export async function createComponent(componentData: CreateComponentData): Promise<ComponentItem> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const newComponent: ComponentItem = {
        id: Date.now().toString(),
        title: componentData.title,
        category: componentData.category,
        desc: componentData.desc || '',
        html: componentData.html || '',
        css: componentData.css || '',
        js: componentData.js || '',
        tags: componentData.tags || [],
        origin_link: componentData.origin_link || '',
        user_id: componentData.user_id,
        created_at: new Date().toISOString().split('T')[0],
        updated_at: new Date().toISOString().split('T')[0]
      };
      resolve(newComponent);
    }, 100);
  });
}

// 更新组件（静态版本，仅返回模拟数据）
export interface UpdateComponentData {
  title: string;
  category: string;
  desc?: string;
  html?: string;
  css?: string;
  js?: string;
  tags?: string[];
  origin_link?: string;
}

export async function updateComponent(id: string, componentData: UpdateComponentData): Promise<ComponentItem> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const existingComponent = staticComponents.find(c => c.id === id);
      const updatedComponent: ComponentItem = {
        id,
        title: componentData.title,
        category: componentData.category,
        desc: componentData.desc || '',
        html: componentData.html || '',
        css: componentData.css || '',
        js: componentData.js || '',
        tags: componentData.tags || [],
        origin_link: componentData.origin_link || '',
        user_id: existingComponent?.user_id || 'static',
        created_at: existingComponent?.created_at || new Date().toISOString().split('T')[0],
        updated_at: new Date().toISOString().split('T')[0]
      };
      resolve(updatedComponent);
    }, 100);
  });
}