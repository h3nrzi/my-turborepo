import type { AuthState } from 'domain/entities/UserEntity';

const AUTH_STORAGE_KEY = 'userInfo';

export const loadAuthState = (): AuthState => {
  const persisted = localStorage.getItem(AUTH_STORAGE_KEY);

  if (!persisted) {
    return { userInfo: undefined };
  }

  try {
    return { userInfo: JSON.parse(persisted) };
  } catch (error) {
    console.warn('Failed to parse persisted auth state', error);
    return { userInfo: undefined };
  }
};

export const persistAuthState = (auth: AuthState) => {
  if (!auth.userInfo) {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    return;
  }

  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(auth.userInfo));
};
