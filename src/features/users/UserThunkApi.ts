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

interface UserProductPayload {
  id: number;
  token: string;
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
      // console.log(data)
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

export const decreaseProduct = createAsyncThunk(
  'user/decreaseProduct',
  async (arg: UserProductPayload, thunkApi) => {
    try {
      const response = await post(
        `http://localhost:3000/user/decrease_product/${arg.id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': arg.token,
          },
        },
      );
      if (!response.ok) {
        alert('decrease failed');
        return thunkApi.rejectWithValue('request failed');
      }
      const data = await response.json();
      // console.log(data)
      return data;
    } catch (error) {
      alert('decrease failed');
      return thunkApi.rejectWithValue('decrease failed');
    }
  },
);

export const increaseProduct = createAsyncThunk(
  'user/increaseProduct',
  async (arg: UserProductPayload, thunkApi) => {
    try {
      const response = await post(
        `http://localhost:3000/user/add_product/${arg.id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': arg.token,
          },
        },
      );
      if (!response.ok) {
        if (response.status === 400) {
          alert('increase failed, product of out stock');
        } else {
          alert('increase failed');
        }
        return thunkApi.rejectWithValue('request failed');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      alert('increase failed');
      return thunkApi.rejectWithValue('increase failed');
    }
  },
);

export const removeProduct = createAsyncThunk(
  'user/removeProduct',
  async (arg: UserProductPayload, thunkApi) => {
    try {
      const response = await post(
        `http://localhost:3000/user/remove_product/${arg.id}`,
        {
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': arg.token,
          },
        },
      );
      if (!response.ok) {
        alert('remove failed');
        return thunkApi.rejectWithValue('request failed');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      alert('remove failed');
      return thunkApi.rejectWithValue('remove failed');
    }
  },
);
