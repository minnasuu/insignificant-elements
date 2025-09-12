import { useEffect, useRef } from 'react';

interface ComponentRendererProps {
  html?: string;
  css?: string;
  js?: string;
}

export default function ComponentRenderer({ html, css, js }: ComponentRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;

    // 清空容器
    container.innerHTML = '';

    // 创建样式元素
    if (css) {
      const styleElement = document.createElement('style');
      styleElement.textContent = css;
      container.appendChild(styleElement);
    }

    // 创建 HTML 内容
    if (html) {
      const htmlElement = document.createElement('div');
      htmlElement.innerHTML = html;
      htmlElement.style.width = '100%';
      htmlElement.style.height = '100%';
      htmlElement.style.display = 'flex';
      htmlElement.style.alignItems = 'center';
      htmlElement.style.justifyContent = 'center';
      container.appendChild(htmlElement);
    }

    // 执行 JavaScript
    if (js) {
      try {
        // 创建一个安全的函数来执行 JavaScript
        const scriptElement = document.createElement('script');
        scriptElement.textContent = js;
        container.appendChild(scriptElement);
      } catch (error) {
        console.error('Error executing component JavaScript:', error);
      }
    }

    // 清理函数
    return () => {
      if (container) {
        container.innerHTML = '';
      }
    };
  }, [html, css, js]);

  return (
    <div
      ref={containerRef}
      className="w-full h-full"
      style={{
        minHeight: '192px', // 对应 h-48
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    />
  );
}
