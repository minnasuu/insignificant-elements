import ComponentRenderer from './ComponentRenderer';
import type { ComponentItem } from '../types';

interface ComponentCardProps {
  component: ComponentItem;
}

function getCategoryStyle(category: string) {
  const styles = {
    '样式': { background: '#f0f9ff', color: '#3b82f6' },
    '动画': { background: '#fffbeb', color: '#f59e0b' },
    default: { background: '#f0fdf4', color: '#16a34a' }
  };

  return styles[category as keyof typeof styles] || styles.default;
}

export default function ComponentCard({ component }: ComponentCardProps) {
  const categoryStyle = getCategoryStyle(component.category);

  return (
    <div className="flex flex-col gap-4 h-full border border-gray-100 rounded-[16px] p-4 transition-shadow transition-transform duration-300 cursor-pointer">
      <div className="flex-1 flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <h3 className="text-sm">{component.title}</h3>
            {component.originLink && (
              <a
                href={component.originLink}
                target="_blank"
                className="text-gray-400 text-sm hover:text-gray-800 transition-colors duration-300"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M24.7073 9.56521L9.85801 24.4145C6.34329 27.9292 6.34329 33.6277 9.85801 37.1424V37.1424C13.3727 40.6571 19.0712 40.6571 22.5859 37.1424L40.2636 19.4647C42.6067 17.1216 42.6067 13.3226 40.2636 10.9794V10.9794C37.9205 8.63628 34.1215 8.63628 31.7783 10.9794L14.1007 28.6571C12.9291 29.8287 12.9291 31.7282 14.1007 32.8997V32.8997C15.2722 34.0713 17.1717 34.0713 18.3433 32.8997L33.1925 18.0505"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            )}
          </div>
          <div
            className="text-gray-500 text-xs px-2 py-1 rounded-md"
            style={categoryStyle}
          >
            {component.category}
          </div>
        </div>

        <div className="flex justify-between items-center mt-auto">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
              {component.user.avatar_url ? (
                <img
                  src={component.user.avatar_url}
                  alt={component.user.username}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-xs text-gray-500">
                  {component.user.username?.charAt(0).toUpperCase() || 'U'}
                </span>
              )}
            </div>
            <span className="text-gray-600 text-xs">{component.user.username}</span>
          </div>
          <span className="text-gray-500 text-xs">{component.date}</span>
        </div>

        <div className="flex gap-2 mt-2">
          {component.tags.map((tag: string) => (
            <span
              key={tag}
              className="text-gray-500 text-xs border border-gray-100 rounded-md px-2 py-1"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="relative h-48 bg-white rounded-[12px] border border-gray-200 overflow-hidden">
        {component.component ? (
          <div className="flex items-center justify-center w-full h-full">
            {component.component}
          </div>
        ) : (component.html || component.css || component.js) ? (
          <ComponentRenderer
            html={component.html}
            css={component.css}
            js={component.js}
          />
        ) : (
          <div className="flex gap-2 items-center justify-center h-full">
            <div className="preview-element w-2 h-2 bg-gray-600 rounded-full"></div>
            <div className="preview-element w-2 h-2 bg-gray-600 rounded-full"></div>
            <div className="preview-element w-2 h-2 bg-gray-600 rounded-full"></div>
          </div>
        )}
      </div>
    </div>
  );
}