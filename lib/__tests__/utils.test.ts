import { formatDate, truncateText, validateEmail } from '../utils';

describe('utils', () => {
  describe('formatDate', () => {
    it('formats date correctly', () => {
      const date = new Date('2024-04-06T12:00:00Z');
      expect(formatDate(date)).toBe('April 6, 2024');
    });

    it('handles invalid date', () => {
      expect(formatDate(new Date('invalid'))).toBe('Invalid Date');
    });
  });

  describe('truncateText', () => {
    it('truncates text longer than maxLength', () => {
      const text = 'This is a very long text that needs to be truncated';
      expect(truncateText(text, 20)).toBe('This is a very long...');
    });

    it('does not truncate text shorter than maxLength', () => {
      const text = 'Short text';
      expect(truncateText(text, 20)).toBe('Short text');
    });

    it('handles empty string', () => {
      expect(truncateText('', 20)).toBe('');
    });
  });

  describe('validateEmail', () => {
    it('validates correct email format', () => {
      expect(validateEmail('test@example.com')).toBe(true);
    });

    it('invalidates incorrect email format', () => {
      expect(validateEmail('invalid-email')).toBe(false);
      expect(validateEmail('test@')).toBe(false);
      expect(validateEmail('@example.com')).toBe(false);
    });

    it('handles empty string', () => {
      expect(validateEmail('')).toBe(false);
    });
  });
}); 