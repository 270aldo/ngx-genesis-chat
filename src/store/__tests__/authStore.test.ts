import { describe, it, expect, beforeEach } from 'vitest';
import { useAuthStore } from '../authStore';

beforeEach(() => {
  useAuthStore.setState({
    user: null,
    isAuthenticated: false,
    isLoading: false,
  });
  localStorage.clear();
});

describe('authStore', () => {
  it('sets user and authenticates', () => {
    useAuthStore.getState().setUser({
      id: '1',
      email: 'test@example.com',
      name: 'Test',
      tokens: 10,
      createdAt: new Date(),
    });
    const state = useAuthStore.getState();
    expect(state.isAuthenticated).toBe(true);
    expect(state.user?.email).toBe('test@example.com');
  });

  it('handles token usage', () => {
    useAuthStore.getState().setUser({
      id: '1',
      email: 'test@example.com',
      name: 'Test',
      tokens: 5,
      createdAt: new Date(),
    });
    const success = useAuthStore.getState().useTokens(3);
    expect(success).toBe(true);
    expect(useAuthStore.getState().getTokens()).toBe(2);
  });
});
