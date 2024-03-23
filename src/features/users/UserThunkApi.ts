import { createAsyncThunk } from '@reduxjs/toolkit';
import { post } from '../../utils/network';

interface UserLoginPayload {
  email: string;
  password: string;
}

interface UserSignupPayload {
  email: string;
  password: string;
  role: 'customer' | 'vendor';
}

export const loginUser = createAsyncThunk(
  'user/login',
  async (arg: UserLoginPayload, thunkApi) => {
    try {
      const response = await post('http://localhost:3000/auth/login', {
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: arg.email, password: arg.password }),
      });
      if (!response.ok) {
        return thunkApi.rejectWithValue('request failed');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue('login failed');
    }
  },
);

export const signupUser = createAsyncThunk(
  'user/signup',
  async (arg: UserSignupPayload, thunkApi) => {
    try {
      const response = await post('http://localhost:3000/user/signup', {
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: arg.email,
          password: arg.password,
          role: arg.role,
        }),
      });
      if (!response.ok) {
        return thunkApi.rejectWithValue('request failed');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue('signup failed');
    }
  },
);
