import Header from '../components/Header';
import CategoryNav from '../components/CategoryNav';
import ComponentGrid from '../components/ComponentGrid';
import ComponentDetailModal from "../components/ComponentDetailModal";
import { useComponentFilter } from "../hooks/useComponentFilter";
import { useState } from "react";
import { Icon, LandButton } from "@suminhan/land-design";
import type { ComponentItem } from "../types";

export default function Home() {
  const {
    selectedCategory,
    setSelectedCategory,
    categories,
    filteredComponents,
    loading,
    error,
  } = useComponentFilter();

  const [showDetailModal, setShowDetailModal] = useState(false);
  const [detailComponent, setDetailComponent] = useState<ComponentItem | null>(
    null
  );

  // 处理详情点击
  const handleDetailClick = (component: ComponentItem) => {
    setDetailComponent(component);
    setShowDetailModal(true);
  };

  // 处理导航切换
  const handleNavigate = (component: ComponentItem) => {
    setDetailComponent(component);
  };

  // 加载状态
  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header
          title="Insignificant Elements in Web"
          description="A collection of refined UI components and interactions"
        />
        <div className="flex-1 flex items-center justify-center pb-20">
          <div className="text-center">
            <div className="w-5 h-5 border-4 border-gray-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
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
        <div className="flex-1 flex flex-col items-center justify-center pb-16">
          <Icon name="error-fill" color="#f56c6c" size={32} />
          <p className="text-gray-500 mb-4">{error}</p>

          <LandButton
            type="background"
            text="点击重试"
            onClick={() => window.location.reload()}
          />
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

      <CategoryNav
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      <ComponentGrid
        components={filteredComponents}
        selectedCategory={selectedCategory}
        onDetail={handleDetailClick}
      />

      <ComponentDetailModal
        component={detailComponent}
        isOpen={showDetailModal}
        onClose={() => {
          setShowDetailModal(false);
          setDetailComponent(null);
        }}
        components={filteredComponents}
        onNavigate={handleNavigate}
      />
    </div>
  );
}