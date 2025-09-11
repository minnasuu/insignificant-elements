import { supabase } from '../../supaClient';
import type { ComponentItem } from '../types';

// 获取所有组件数据
export async function getComponents(): Promise<ComponentItem[]> {
  try {
    const { data, error } = await supabase
      .from('littleTasteData')
      .select(`
        *,
        user:users!littleTasteData_userId_fkey (
          id,
          username,
          avatar_url
        )
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching components:', error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Error in getComponents:', error);
    throw error;
  }
}

// 根据分类获取组件
export async function getComponentsByCategory(category: string): Promise<ComponentItem[]> {
  try {
    const { data, error } = await supabase
      .from('littleTasteData')
      .select(`
        *,
        user:users!littleTasteData_userId_fkey (
          id,
          username,
          avatar_url
        )
      `)
      .eq('category', category)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching components by category:', error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Error in getComponentsByCategory:', error);
    throw error;
  }
}

// 获取用户上传的组件
export async function getUserComponents(userId: string): Promise<ComponentItem[]> {
  try {
    const { data, error } = await supabase
      .from('littleTasteData')
      .select(`
        *,
        user:users!littleTasteData_userId_fkey (
          id,
          username,
          avatar_url
        )
      `)
      .eq('userId', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching user components:', error);
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('Error in getUserComponents:', error);
    throw error;
  }
}
