import { renderHook, act } from '@testing-library/react-native';
import { useAuth } from '../useAuth';
import { supabase } from '../../lib/supabase';

jest.mock('../../lib/supabase', () => ({
  supabase: {
    auth: {
      signInWithPassword: jest.fn(),
      signUp: jest.fn(),
      signOut: jest.fn(),
      getSession: jest.fn(),
    },
  },
}));

describe('useAuth', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('signs in user successfully', async () => {
    const mockSignIn = supabase.auth.signInWithPassword as jest.Mock;
    mockSignIn.mockResolvedValueOnce({ data: { user: { id: '123' } }, error: null });

    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.signIn('test@example.com', 'password');
    });

    expect(mockSignIn).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password',
    });
    expect(result.current.user).toEqual({ id: '123' });
  });

  it('handles sign in error', async () => {
    const mockSignIn = supabase.auth.signInWithPassword as jest.Mock;
    mockSignIn.mockResolvedValueOnce({ data: null, error: new Error('Invalid credentials') });

    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.signIn('test@example.com', 'password');
    });

    expect(mockSignIn).toHaveBeenCalled();
    expect(result.current.error).toBeTruthy();
  });

  it('signs out user successfully', async () => {
    const mockSignOut = supabase.auth.signOut as jest.Mock;
    mockSignOut.mockResolvedValueOnce({ error: null });

    const { result } = renderHook(() => useAuth());

    await act(async () => {
      await result.current.signOut();
    });

    expect(mockSignOut).toHaveBeenCalled();
    expect(result.current.user).toBeNull();
  });
}); 