import { useEffect, useState } from 'react';
import ComponentRenderer from './ComponentRenderer';
import CodeViewer from './CodeViewer';
import type { ComponentItem } from '../types';
import { getUserInfo } from '../services/userService';
import { LandAffixContainer, LandDialog } from "@suminhan/land-design";

interface ComponentDetailModalProps {
  component: ComponentItem | null;
  isOpen: boolean;
  onClose: () => void;
  components?: ComponentItem[];
  onNavigate?: (component: ComponentItem) => void;
}

function getCategoryStyle(category: string) {
  const styles = {
    style: { background: "#f0f9ff", color: "#3b82f6" },
    animation: { background: "#fffbeb", color: "#f59e0b" },
    interaction: { background: "#f0fdf4", color: "#16a34a" },
    copywriting: { background: "#fdf2f8", color: "#ec4899" },
    other: { background: "#f0fdf4", color: "#16a34a" },
    default: { background: "#f0fdf4", color: "#16a34a" },
  };

  return styles[category as keyof typeof styles] || styles.default;
}

export default function ComponentDetailModal({
  component,
  isOpen,
  onClose,
  components = [],
  onNavigate,
}: ComponentDetailModalProps) {
  const [avatarUrl, setAvatarUrl] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [copySuccess, setCopySuccess] = useState<{ [key: string]: boolean }>(
    {}
  );

  // 获取当前组件在列表中的索引
  const getCurrentIndex = () => {
    if (!component || !components.length) return -1;
    return components.findIndex((c) => c.id === component.id);
  };

  // 导航到上一个组件
  const navigatePrevious = () => {
    const currentIndex = getCurrentIndex();
    if (currentIndex <= 0 || !components.length) return;

    const previousComponent = components[currentIndex - 1];
    if (onNavigate && previousComponent) {
      onNavigate(previousComponent);
    }
  };

  // 导航到下一个组件
  const navigateNext = () => {
    const currentIndex = getCurrentIndex();
    if (currentIndex === -1 || currentIndex >= components.length - 1) return;

    const nextComponent = components[currentIndex + 1];
    if (onNavigate && nextComponent) {
      onNavigate(nextComponent);
    }
  };

  // 检查是否可以导航
  const canNavigatePrevious = () => {
    const currentIndex = getCurrentIndex();
    return currentIndex > 0;
  };

  const canNavigateNext = () => {
    const currentIndex = getCurrentIndex();
    return currentIndex !== -1 && currentIndex < components.length - 1;
  };

  const fetchUserInfo = async (userId: string) => {
    try {
      const user = await getUserInfo(userId);

      if (user) {
        setUsername(user.username || "Unknown User");
        setAvatarUrl(user.avatar_url || "");
      } else {
        setUsername("Unknown User");
        setAvatarUrl("");
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
      setUsername("Unknown User");
      setAvatarUrl("");
    }
  };

  useEffect(() => {
    if (component?.user_id) {
      fetchUserInfo(component.user_id);
    }
  }, [component?.user_id]);

  // 监听键盘事件
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowLeft":
        case "ArrowUp":
          e.preventDefault();
          navigatePrevious();
          break;
        case "ArrowRight":
        case "ArrowDown":
          e.preventDefault();
          navigateNext();
          break;
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeydown);
      // 禁止背景滚动
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeydown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose, navigatePrevious, navigateNext]);

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess({ ...copySuccess, [type]: true });
      setTimeout(() => {
        setCopySuccess({ ...copySuccess, [type]: false });
      }, 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  if (!isOpen || !component) return null;

  const categoryStyle = getCategoryStyle(component.category);

  return (
    <LandDialog
      mask
      size="large"
      show={isOpen}
      onClose={onClose}
      footerComponent={null}
      className="max-w-4xl w-full mx-4 max-h-[90vh] overflow-hidden"
      bodyStyle={{ padding: 0 }}
    >
      {/* 弹窗内容 */}
      <div className="relative flex flex-col bg-white w-full max-h-[70vh]">
        {/* 内容区域 */}
        <div className="flex-1 px-4 overflow-y-auto">
          <div className="px-2 py-6">
            {/* 代码区域 */}
            <div className="grid grid-cols-2 gap-4 w-full">
              <div className="aspect-ratio-1/1 border border-gray-200 rounded-xl overflow-hidden">
                <div className="bg-white w-full h-full">
                  {component.html || component.css || component.js ? (
                    <ComponentRenderer
                      html={component.html}
                      css={component.css}
                      js={component.js}
                    />
                  ) : (
                    <div className="flex gap-2 items-center justify-center h-full">
                      <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                      <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                      <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                    </div>
                  )}
                </div>
              </div>
              {/* HTML 代码 */}
              {component.html && (
                <div className="flex-1 flex-shrink-0">
                  <LandAffixContainer
                    className="w-full p-"
                    rbOption={{
                      content: (
                        <button
                          onClick={() =>
                            copyToClipboard(component.html!, "html")
                          }
                          className="flex items-center gap-2 px-3 py-1 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          {copySuccess.html ? (
                            <>
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M20 6L9 17L4 12"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              已复制
                            </>
                          ) : (
                            <>
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <rect
                                  x="9"
                                  y="9"
                                  width="13"
                                  height="13"
                                  rx="2"
                                  ry="2"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  fill="none"
                                />
                                <path
                                  d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  fill="none"
                                />
                              </svg>
                              复制
                            </>
                          )}
                        </button>
                      ),
                      hoverShow: true,
                    }}
                  >
                    <CodeViewer
                      value={component.html}
                      language="html"
                      height="200px"
                    />
                  </LandAffixContainer>
                </div>
              )}

              {/* CSS 代码 */}
              {component.css && (
                <div className="flex-1 flex-shrink-0">
                  <LandAffixContainer
                    rbOption={{
                      content: (
                        <button
                          onClick={() => copyToClipboard(component.css!, "css")}
                          className="flex items-center gap-2 px-3 py-1 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          {copySuccess.css ? (
                            <>
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M20 6L9 17L4 12"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              已复制
                            </>
                          ) : (
                            <>
                              <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <rect
                                  x="9"
                                  y="9"
                                  width="13"
                                  height="13"
                                  rx="2"
                                  ry="2"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  fill="none"
                                />
                                <path
                                  d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  fill="none"
                                />
                              </svg>
                              复制
                            </>
                          )}
                        </button>
                      ),
                      hoverShow: true,
                    }}
                  >
                    <CodeViewer
                      value={component.css}
                      language="css"
                      height="200px"
                    />
                  </LandAffixContainer>
                </div>
              )}

              {/* JavaScript 代码 */}
              {component.js && (
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-medium text-gray-700 px-2">
                      JavaScript
                    </h4>
                    <button
                      onClick={() => copyToClipboard(component.js!, "js")}
                      className="flex items-center gap-2 px-3 py-1 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      {copySuccess.js ? (
                        <>
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M20 6L9 17L4 12"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                          已复制
                        </>
                      ) : (
                        <>
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <rect
                              x="9"
                              y="9"
                              width="13"
                              height="13"
                              rx="2"
                              ry="2"
                              stroke="currentColor"
                              strokeWidth="2"
                              fill="none"
                            />
                            <path
                              d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"
                              stroke="currentColor"
                              strokeWidth="2"
                              fill="none"
                            />
                          </svg>
                          复制
                        </>
                      )}
                    </button>
                  </div>
                  <CodeViewer
                    value={component.js}
                    language="javascript"
                    height="200px"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        {/* 头部 */}
        <div className="flex-1 height-1 flex items-end justify-between px-6 pt-4 border-t border-gray-100">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden flex-shrink-0 ring-1 ring-gray-100">
                  {avatarUrl ? (
                    <img
                      src={avatarUrl}
                      alt={username || "User"}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = "none";
                        const parent = target.parentElement;
                        if (parent) {
                          parent.innerHTML = `<span class="text-sm text-gray-500 font-medium">${
                            username?.charAt(0).toUpperCase() || "U"
                          }</span>`;
                        }
                      }}
                    />
                  ) : (
                    <span className="text-sm text-gray-500 font-medium">
                      {username?.charAt(0).toUpperCase() || "U"}
                    </span>
                  )}
                </div>
                <p className="text-gray-900 font-medium">
                  {username || "Unknown User"}
                </p>
              </div>
              <p className="text-gray-500 text-sm">
                {new Date(component.created_at).toLocaleDateString("zh-CN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            <div className="flex gap-2 items-center">
              <div className="flex items-center gap-1">
                <h2 className="text-xl font-semibold text-gray-900">
                  {component.title}
                </h2>
                {component.origin_link && (
                  <a
                    href={component.origin_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-gray-600 transition-colors p-2"
                    title="查看原始链接"
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
                className="text-sm px-3 py-1 rounded-full h-fit-content"
                style={categoryStyle}
              >
                {component.category}
              </div>
              {/* 标签 */}
              {component.tags && component.tags.length > 0 && (
                <div>
                  <div className="flex gap-2 flex-wrap">
                    {component.tags.map((tag: string) => (
                      <span
                        key={tag}
                        className="text-gray-600 text-sm border border-gray-200 rounded-lg px-3 py-1"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {components.length > 1 && (
              <div className="text-sm text-gray-500">
                {getCurrentIndex() + 1} / {components.length}
              </div>
            )}
            {/* 导航按钮 */}
            {components.length > 1 && (
              <>
                <button
                  onClick={navigatePrevious}
                  disabled={!canNavigatePrevious()}
                  className={`p-2 rounded-lg transition-colors ${
                    canNavigatePrevious()
                      ? "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                      : "text-gray-300 cursor-not-allowed"
                  }`}
                  title="上一个 (←/↑)"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15 18L9 12L15 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <button
                  onClick={navigateNext}
                  disabled={!canNavigateNext()}
                  className={`p-2 rounded-lg transition-colors ${
                    canNavigateNext()
                      ? "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                      : "text-gray-300 cursor-not-allowed"
                  }`}
                  title="下一个 (→/↓)"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 18L15 12L9 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </LandDialog>
  );
}
