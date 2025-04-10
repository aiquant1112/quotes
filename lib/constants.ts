export const CATEGORIES = [
  'inspiration',
  'motivation',
  'success',
  'wisdom',
  'leadership',
  'creativity',
  'happiness',
  'growth',
] as const;

export const TONES = [
  'inspirational',
  'motivational',
  'philosophical',
  'humorous',
  'serious',
  'casual',
] as const;

export const QUOTE_LIMITS = {
  FREE: 5,
  PREMIUM: Infinity,
} as const;

export const STORAGE_KEYS = {
  USER_PROFILE: 'user_profile',
  QUOTES: 'quotes',
} as const;

export const API_ENDPOINTS = {
  QUOTES: '/quotes',
  PROFILE: '/profile',
  AUTH: '/auth',
} as const; 