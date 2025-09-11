import { supabase } from '../../supaClient';
import type { ComponentItem } from '../types';

// 获取所有组件数据
export async function getComponents(): Promise<ComponentItem[]> {
  try {
    const { data, error } = await supabase
      .from('littleTasteData')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching components:', error);
      throw error;
    }

    if (!data || data.length === 0) {
      return [];
    }

    return data;
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
      .select('*')
      .eq('category', category)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching components by category:', error);
      throw error;
    }

    if (!data || data.length === 0) {
      return [];
    }

    return data;
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
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching user components:', error);
      throw error;
    }

    if (!data || data.length === 0) {
      return [];
    }

    return data;
  } catch (error) {
    console.error('Error in getUserComponents:', error);
    throw error;
  }
}

// 创建新组件
export interface CreateComponentData {
  title: string;
  category: string;
  desc?: string;
  html?: string;
  css?: string;
  js?: string;
  tags?: string[];
  origin_link?: string;
  user_id: string;
}
export async function createComponent(componentData: CreateComponentData): Promise<ComponentItem> {
  console.log(componentData);
  
  try {
    const { data, error } = await supabase
      .from('littleTasteData')
      .insert([{
        title: componentData.title,
        category: componentData.category,
        desc: componentData.desc || '',
        html: componentData.html || '',
        css: componentData.css || '',
        js: componentData.js || '',
        tags: componentData.tags || [],
        origin_link: componentData.origin_link || '',
        user_id: componentData.user_id,
        updated_at: new Date().toISOString().split('T')[0]
      }])
      .select()
      .single();

    if (error) {
      console.error('Error creating component:', error);
      throw error;
    }

    return data;
  } catch (error) {
    console.error('Error in createComponent:', error);
    throw error;
  }
}
