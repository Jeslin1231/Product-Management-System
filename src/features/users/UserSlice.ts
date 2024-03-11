import type { PayloadAction } from '@reduxjs/toolkit';
import { createAppSlice } from '../../app/createAppSlice';

export interface UserSliceState {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'vendor' | 'none';
  logged: boolean;
}

const initialState: UserSliceState = {
  id: '',
  name: '',
  email: '',
  role: 'none',
  logged: false,
};

export interface UserPayload {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'vendor' | 'none';
}

export const userSlice = createAppSlice({
  name: 'user',
  initialState,
  reducers: create => ({
    login: create.reducer((state, action: PayloadAction<UserPayload>) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.logged = true;
    }),
    logout: create.reducer(state => {
      state.id = '';
      state.name = '';
      state.email = '';
      state.role = 'none';
      state.logged = false;
    }),
  }),
  selectors: {
    selectUser: user => user,
    selectUserStatus: user => user.logged,
  },
});

export const { login, logout } = userSlice.actions;
export const { selectUser, selectUserStatus } = userSlice.selectors;

export default userSlice.reducer;
