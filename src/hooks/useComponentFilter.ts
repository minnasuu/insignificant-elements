import { useState, useMemo } from 'react';
import { useComponents, useComponentsByCategory } from './useComponents';

export function useComponentFilter() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // 获取所有组件数据
  const { components: allComponents, loading: allLoading, error: allError } = useComponents();

  // 获取按分类过滤的组件数据
  const { components: categoryComponents, loading: categoryLoading, error: categoryError } = useComponentsByCategory(
    selectedCategory !== 'all' ? selectedCategory : ''
  );

  const categories = useMemo(() => {
    return [
      { key: 'all', label: '全部' },
      { key: 'style', label: '样式' },
      { key: 'animation', label: '动画' },
      { key: 'interaction', label: '交互' },
      { key: 'copywriting', label: '文案' },
      { key: 'other', label: '其他' }
    ];
  }, []);

  const { components, loading, error } = useMemo(() => {
    if (selectedCategory === 'all') {
      return {
        components: allComponents,
        loading: allLoading,
        error: allError
      };
    } else {
      return {
        components: categoryComponents,
        loading: categoryLoading,
        error: categoryError
      };
    }
  }, [
    selectedCategory,
    allComponents, allLoading, allError,
    categoryComponents, categoryLoading, categoryError
  ]);

  const filteredComponents = useMemo(() => {
    return components.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
  }, [components]);

  return {
    selectedCategory,
    setSelectedCategory,
    categories,
    filteredComponents,
    loading,
    error
  };
}