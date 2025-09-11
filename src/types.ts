export interface ComponentItem {
  id: string;
  title: string;
  category: string;
  date: string;
  tags: string[];
  component?: React.ReactNode;
  originLink?: string;
  html?: string;
  css?: string;
  js?: string;
  userId: string;
  user: {
    id: string;
    username: string;
    avatar_url?: string;
  };
  created_at: string;
  updated_at: string;
}