import type { PayloadAction } from '@reduxjs/toolkit';
import { createAppSlice } from '../../app/createAppSlice';
import { loginUser, signupUser } from './UserThunkApi';

export interface UserSliceState {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'vendor' | 'none';
  logged: boolean;
  token: string;
  loading: 'idle' | 'pending' | 'fulfilled' | 'rejected';
}

const initialState: UserSliceState = {
  id: '',
  name: '',
  email: '',
  role: 'none',
  logged: false,
  token: '',
  loading: 'idle',
};

export interface UserPayload {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'vendor' | 'none';
  token: string;
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
      state.token = action.payload.token;
      state.loading = 'fulfilled';
    }),
    logout: create.reducer(state => {
      state.id = '';
      state.name = '';
      state.email = '';
      state.role = 'none';
      state.logged = false;
      state.token = '';
      state.loading = 'idle';
    }),
    resetRequestStatus: create.reducer(state => {
      state.loading = 'idle';
    }),
  }),
  extraReducers: builder => {
    builder.addCase(loginUser.pending, (state, action) => {
      state.loading = 'pending';
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = 'fulfilled';
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.role = action.payload.role;
      state.logged = true;
      state.token = action.payload.token;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = 'rejected';
    });
    builder.addCase(signupUser.pending, (state, action) => {
      state.loading = 'pending';
    });
    builder.addCase(signupUser.fulfilled, (state, action) => {
      state.loading = 'fulfilled';
    });
    builder.addCase(signupUser.rejected, (state, action) => {
      state.loading = 'rejected';
    });
  },
  selectors: {
    selectUser: user => user,
    selectUserStatus: user => user.logged,
    selectRequestStatus: user => user.loading,
  },
});

export const { login, logout, resetRequestStatus } = userSlice.actions;
export const { selectUser, selectUserStatus, selectRequestStatus } =
  userSlice.selectors;

export default userSlice.reducer;
