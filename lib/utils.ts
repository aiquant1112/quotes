import { Category, Tone } from '../types';

export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function capitalizeFirstLetter(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function generatePrompt(category: Category, tone: Tone, author: string): string {
  return `Generate a ${tone} quote about ${category} in the style of ${author}. The quote should be inspiring and memorable.`;
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePassword(password: string): boolean {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  return passwordRegex.test(password);
}

export function getCategoryEmoji(category: Category): string {
  const emojis: Record<Category, string> = {
    inspiration: '✨',
    motivation: '💪',
    success: '🏆',
    wisdom: '🧠',
    leadership: '👑',
    creativity: '🎨',
    happiness: '😊',
    growth: '🌱',
  };
  return emojis[category];
} 