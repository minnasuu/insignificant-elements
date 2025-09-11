import ComponentRenderer from './ComponentRenderer';
import type { ComponentItem } from '../types';
import { useEffect, useState } from 'react';
import { getUserInfo } from '../services/userService';

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
  const [avatarUrl, setAvatarUrl] = useState<string>('');
  const [username, setUsername] = useState<string>('');

  const fetchUserInfo = async (userId: string) => {
    try {
      const user = await getUserInfo(userId);
      
      if (user) {
        setUsername(user.username || 'Unknown User');
        setAvatarUrl(user.avatar_url || '');
      } else {
        setUsername('Unknown User');
        setAvatarUrl('');
      }
    } catch (error) {
      console.error('Error fetching user info:', error);
      setUsername('Unknown User');
      setAvatarUrl('');
    }
  };
  useEffect(() => {
    fetchUserInfo(component.user_id);
  }, [component.user_id]);
  return (
    <div className="flex flex-col gap-4 h-full border border-gray-100 rounded-[16px] p-4 transition-shadow transition-transform duration-300 cursor-pointer">
      <div className="flex-1 flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <h3 className="text-sm">{component.title}</h3>
            {component.origin_link && (
              <a
                href={component.origin_link}
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

        {component.desc && (
          <div className="mt-2">
            <p className="text-xs text-gray-600 line-clamp-2">{component.desc}</p>
          </div>
        )}

        <div className="flex justify-between items-center mt-auto">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden flex-shrink-0 ring-1 ring-gray-100">
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={username || 'User'}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to initials if image fails to load
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      parent.innerHTML = `<span class="text-xs text-gray-500 font-medium">${(username?.charAt(0).toUpperCase() || 'U')}</span>`;
                    }
                  }}
                />
              ) : (
                <span className="text-xs text-gray-500 font-medium">
                  {username?.charAt(0).toUpperCase() || 'U'}
                </span>
              )}
            </div>
            <span 
              className="text-gray-600 text-xs truncate hover:text-gray-900 transition-colors"
              title={username || 'Unknown User'}
            >
              {username || 'Unknown User'}
            </span>
          </div>
          <span className="text-gray-500 text-xs flex-shrink-0 ml-2">
            {new Date(component.created_at).toLocaleDateString()}
          </span>
        </div>

        {component.tags && component.tags.length > 0 && (
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
        )}
      </div>

      <div className="relative h-48 bg-white rounded-[12px] border border-gray-200 overflow-hidden">
        {(component.html || component.css || component.js) ? (
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