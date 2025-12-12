import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { AuthState, UserInfo } from 'domain/entities/UserEntity';
import { loadAuthState, persistAuthState } from 'infrastructure/data/authStorage';

const initialState: AuthState = loadAuthState();

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (auth, action: PayloadAction<UserInfo>) => {
      auth.userInfo = action.payload;
      persistAuthState(auth);
    },

    clearCredentials: (auth) => {
      auth.userInfo = undefined;
      persistAuthState(auth);
    },
  },
});

export const { setCredentials, clearCredentials } = authSlice.actions;
export default authSlice;
