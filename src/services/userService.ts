import { supabase } from '../../supaClient';

export interface UserInfo {
  id: string;
  username: string;
  avatar_url?: string;
}

// 根据用户ID获取用户信息
export async function getUserInfo(userId: string): Promise<UserInfo | null> {
  try {
    const { data: user, error } = await supabase
      .from('users')
      .select('id, username, avatar_url')
      .eq('uid', userId)
      .single();
    
    if (error) {
      console.error('Error fetching user info:', error);
      return null;
    }
    
    return user;
  } catch (error) {
    console.error('Error in getUserInfo:', error);
    return null;
  }
}

// 批量获取用户信息（适用于需要获取多个用户信息的场景）
export async function getUsersInfo(userIds: string[]): Promise<UserInfo[]> {
  try {
    const { data: users, error } = await supabase
      .from('users')
      .select('id, username, avatar_url')
      .in('uid', userIds);
    
    if (error) {
      console.error('Error fetching users info:', error);
      return [];
    }
    
    return users || [];
  } catch (error) {
    console.error('Error in getUsersInfo:', error);
    return [];
  }
}
