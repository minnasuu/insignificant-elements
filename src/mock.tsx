  import type { ComponentItem } from "./App";
import TextBottomFilter from "./pages/Visual/TextBottomFilter";
import LinkArrowAnimation from "./pages/Visual/LinkArrowAnimation";

export const components: ComponentItem[] = [
    {
        id: 'gradient-divider',
        title: '渐变分割线',
        category: 'Visual',
        date: '2025-09-04',
        tags: ['css', 'linear-gradient'],
        component: <div className="w-full h-px to-gray-100" style={{
          background: 'linear-gradient(to right, #00000002, #00000001)'
        }}>
        </div>
    },
    {
      id: 'text-bottom-filter',
      title: 'Text Bottom Filter',
      category: 'Visual',
      date: '2025-09-04',
      tags: ['css', 'back-drop-filter'],
      component: <TextBottomFilter />,
      originLink: 'https://devouringdetails.com/'
    },
    {
      id: 'blur-text',
      title: 'Blur Text',
      category: 'Visual',
      date: '2025-09-04',
      tags: ['css',  'blur'],
      component: <div className="w-full h-full bg-black flex flex-col gap-2 items-center justify-center rounded-lg">
        <div className="text-s text-white" style={{filter: 'blur(2px) opacity(0.5)'}}>今天天气不错</div>
        <div className="text-s text-white" style={{filter: 'blur(2px) opacity(0.8)',transform:'scale(1.1)'}}>今天天气不错</div>
        <div className="text-s text-white" style={{filter: 'blur(2px) opacity(0.5)'}}>今天天气不错</div>
      </div>,
      originLink: 'https://flow.rest/'
    },
    {
      id:'link-arrow-animation',
      title: 'Link Arrow Animation',
      category: 'Visual',
      date: '2025-09-04',
      tags: ['css', 'animation'],
      component: <LinkArrowAnimation />
    }
  ]