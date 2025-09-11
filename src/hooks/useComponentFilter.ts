import { useState, useMemo, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useComponents, useComponentsByCategory, useUserComponents } from './useComponents';

export function useComponentFilter() {
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // 获取所有组件数据
  const { components: allComponents, loading: allLoading, error: allError } = useComponents();

  // 获取按分类过滤的组件数据
  const { components: categoryComponents, loading: categoryLoading, error: categoryError } = useComponentsByCategory(
    selectedCategory !== 'all' && selectedCategory !== 'my' ? selectedCategory : ''
  );

  // 获取用户组件数据
  const { components: userComponents, loading: userLoading, error: userError } = useUserComponents();

  const categories = useMemo(() => {
    const baseCategories = [
      { key: 'all', label: '全部' },
      { key: 'style', label: '样式' },
      { key: 'animation', label: '动画' },
      { key: 'interaction', label: '交互' },
      { key: 'copywriting', label: '文案' },
      { key: 'other', label: '其他' }
    ];

    // 如果用户已登录，在全部前面添加"我的"分类
    if (user) {
      return [
        { key: 'my', label: '我的' },
        ...baseCategories
      ];
    }

    return baseCategories;
  }, [user]);

  // 当用户登录状态变化时，如果当前选中的是"我的"但用户未登录，则切换到"全部"
  useEffect(() => {
    if (!user && selectedCategory === 'my') {
      setSelectedCategory('all');
    }
  }, [user, selectedCategory]);

  const { components, loading, error } = useMemo(() => {
    if (selectedCategory === 'all') {
      return {
        components: allComponents,
        loading: allLoading,
        error: allError
      };
    } else if (selectedCategory === 'my') {
      return {
        components: userComponents,
        loading: userLoading,
        error: userError
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
    categoryComponents, categoryLoading, categoryError,
    userComponents, userLoading, userError
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