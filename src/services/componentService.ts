import { supabase } from '../../supaClient';
import { useAuth } from '../contexts/AuthContext';
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

    // Get user data for each component
    const userIds = [...new Set(data.map(component => component.user_id))];
    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('id, username, avatar_url')
      .in('uid', userIds);

    if (usersError) {
      console.error('Error fetching users:', usersError);
      // Return components without user data if users fetch fails
      return data.map(component => ({
        ...component,
        user: {
          id: component.userId,
          username: 'Unknown User',
          avatar_url: undefined
        }
      }));
    }

    // Combine component and user data
    const userMap = new Map(users?.map(user => [user.id, user]) || []);
    return data.map(component => ({
      ...component,
      user: userMap.get(component.user_id) || {
        id: component.userId,
        username: 'Unknown User',
        avatar_url: undefined
      }
    }));
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

    // Get user data for each component
    const userIds = [...new Set(data.map(component => component.user_id))];
    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('id, username, avatar_url')
      .in('uid', userIds);

    if (usersError) {
      console.error('Error fetching users:', usersError);
      // Return components without user data if users fetch fails
      return data.map(component => ({
        ...component,
        user: {
          id: component.user_id,
          username: 'Unknown User',
          avatar_url: undefined
        }
      }));
    }

    // Combine component and user data
    const userMap = new Map(users?.map(user => [user.id, user]) || []);
    return data.map(component => ({
      ...component,
      user: userMap.get(component.user_id) || {
        id: component.user_id,
        username: 'Unknown User',
        avatar_url: undefined
      }
    }));
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

    // Get user data for the specific user
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('id, username, avatar_url')
      .eq('uid', userId)
      .single();

    if (userError) {
      console.error('Error fetching user:', userError);
      // Return components without user data if user fetch fails
      return data.map(component => ({
        ...component,
        user: {
          id: component.user_id,
          username: 'Unknown User',
          avatar_url: undefined
        }
      }));
    }

    // Combine component and user data
    return data.map(component => ({
      ...component,
      user: user || {
        id: component.user_id,
        username: 'Unknown User',
        avatar_url: undefined
      }
    }));
  } catch (error) {
    console.error('Error in getUserComponents:', error);
    throw error;
  }
}

// 创建新组件
export interface CreateComponentData {
  title: string;
  category: string;
  html?: string;
  css?: string;
  js?: string;
  tags: string[];
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
        html: componentData.html || '',
        css: componentData.css || '',
        js: componentData.js || '',
        tags: componentData.tags,
        user_id: componentData.user_id,
        updated_at: new Date().toISOString().split('T')[0]
      }])
      .select()
      .single();

    if (error) {
      console.error('Error creating component:', error);
      throw error;
    }

    // Get user data for the created component
    const { data: user, error: userError } = await supabase
      .from('users')
      .select('id, username, avatar_url')
      .eq('uid', componentData.user_id)
      .single();

    if (userError) {
      console.error('Error fetching user:', userError);
      // Return component without user data if user fetch fails
      return {
        ...data,
        user: {
          id: componentData.user_id,
          username: 'Unknown User',
          avatar_url: undefined
        }
      };
    }

    return {
      ...data,
      user: user || {
        id: componentData.user_id,
        username: 'Unknown User',
        avatar_url: undefined
      }
    };
  } catch (error) {
    console.error('Error in createComponent:', error);
    throw error;
  }
}
