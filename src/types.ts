export interface ComponentItem {
  id: string;
  title: string;
  category: string;
  desc?: string;
  tags?: string[];
  origin_link?: string;
  html?: string;
  css?: string;
  js?: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}