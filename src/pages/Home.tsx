import Header from '../components/Header';
import CategoryNav from '../components/CategoryNav';
import ComponentGrid from '../components/ComponentGrid';
import CreateDrawer from '../components/CreateDrawer';
import { useComponentFilter } from '../hooks/useComponentFilter';
import { useAuth } from '../contexts/AuthContext';
import { useState } from 'react';
import { message } from '@suminhan/land-design';

export default function Home() {
  const { user } = useAuth();
  const {
    selectedCategory,
    setSelectedCategory,
    categories,
    filteredComponents,
    loading,
    error
  } = useComponentFilter();
  
  const [showCreateDrawer, setShowCreateDrawer] = useState(false);

  // 处理上传点击
  const handleUploadClick = () => {
    if (!user) {
      message.error('请先登录');
      return;
    }
    setShowCreateDrawer(true);
  };


  // 加载状态
  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header
          title="Insignificant Elements in Web"
          description="A collection of refined UI components and interactions"
        />
        <div className="flex items-center justify-center py-16">
          <div className="text-center">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">加载中...</p>
          </div>
        </div>
      </div>
    );
  }

  // 错误状态
  if (error) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header
          title="Insignificant Elements in Web"
          description="A collection of refined UI components and interactions"
        />
        <div className="flex items-center justify-center py-16">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">加载失败</h3>
            <p className="text-gray-500 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              重新加载
            </button>
          </div>
        </div>
      </div>
    );
  }


  return (
    <div className="flex flex-col min-h-screen">
      <Header
        title="Insignificant Elements in Web"
        description="A collection of refined UI components and interactions"
      />

      {user && (
        <div className="px-4 py-2 bg-blue-50">
          <p className="text-sm text-blue-600">
            欢迎回来，{user.user_metadata?.username}！
          </p>
        </div>
      )}

      <CategoryNav
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <ComponentGrid
        components={filteredComponents}
        selectedCategory={selectedCategory}
        onUpload={handleUploadClick}
      />

      <CreateDrawer
        show={showCreateDrawer}
        onClose={() => setShowCreateDrawer(false)}
        initialCategory={selectedCategory === 'all' ? 'style' : selectedCategory}
        onSuccess={() => {
          setShowCreateDrawer(false);
          // 刷新组件列表
          window.location.reload();
        }}
      />
    </div>
  );
}