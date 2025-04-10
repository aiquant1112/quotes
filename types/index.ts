export type Quote = {
  id: string;
  content: string;
  author: string;
  category: Category;
  created_at: string;
  user_id: string;
};

export type Category = 
  | 'inspiration'
  | 'motivation'
  | 'success'
  | 'wisdom'
  | 'leadership'
  | 'creativity'
  | 'happiness'
  | 'growth';

export type Tone = 
  | 'inspirational'
  | 'motivational'
  | 'philosophical'
  | 'humorous'
  | 'serious'
  | 'casual';

export type UserProfile = {
  id: string;
  email: string;
  full_name: string;
  subscription_tier: 'free' | 'premium';
  notification_preferences: {
    daily_quote: boolean;
    weekly_digest: boolean;
  };
  created_at: string;
}; 