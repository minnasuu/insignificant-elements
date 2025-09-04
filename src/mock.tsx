  import type { ComponentItem } from "./App";
import GradientDivider from "./pages/Visual/GradientDivider";
import TextBottomFilter from "./pages/Visual/TextBottomFilter";

export const components: ComponentItem[] = [
    {
        id: 'gradient-divider',
        title: '渐变分割线',
        description: '一条柔和的渐变分割线',
        category: 'Visual',
        date: '2025-09-04',
        tags: ['css', 'linear-gradient'],
        component: <GradientDivider />
    },
    {
      id: 'text-bottom-filter',
      title: 'Text Bottom Filter',
      description: '文本底部滤镜效果',
      category: 'Visual',
      date: '2025-09-04',
      tags: ['css', 'back-drop-filter'],
      component: <TextBottomFilter />
    },
  ]