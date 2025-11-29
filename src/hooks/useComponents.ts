import { useState, useEffect } from 'react';
import { getComponents, getComponentsByCategory } from '../services/componentService';
import type { ComponentItem } from '../types';

export function useComponents() {
  const [components, setComponents] = useState<ComponentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchComponents = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getComponents();
      setComponents(data);
    } catch (err) {
      console.error('Error fetching components:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch components');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComponents();
  }, []);

  return {
    components,
    loading,
    error,
    refetch: fetchComponents
  };
}

export function useComponentsByCategory(category: string) {
  const [components, setComponents] = useState<ComponentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchComponents = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getComponentsByCategory(category);
      setComponents(data);
    } catch (err) {
      console.error('Error fetching components by category:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch components');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (category) {
      fetchComponents();
    }
  }, [category]);

  return {
    components,
    loading,
    error,
    refetch: fetchComponents
  };
}

// 静态版本不支持用户组件
export function useUserComponents() {
  return {
    components: [],
    loading: false,
    error: null,
    refetch: () => {}
  };
}
