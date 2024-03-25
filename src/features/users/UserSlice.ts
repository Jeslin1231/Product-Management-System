import type { PayloadAction } from '@reduxjs/toolkit';
import { createAppSlice } from '../../app/createAppSlice';
import {
  loginUser,
  signupUser,
  decreaseProduct,
  increaseProduct,
  removeProduct,
} from './UserThunkApi';

export interface UserSliceState {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'vendor' | 'none';
  numProductsInCart: number;
  totalPricesInCart: number;
  logged: boolean;
  token: string;
  loading: 'idle' | 'pending' | 'fulfilled' | 'rejected';
}

const initialState: UserSliceState = {
  id: '',
  name: '',
  email: '',
  role: 'none',
  numProductsInCart: 0,
  totalPricesInCart: 0,
  logged: false,
  token: '',
  loading: 'idle',
};

export interface UserPayload {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'vendor' | 'none';
  numProductsInCart: number;
  totalPricesInCart: number;
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
      state.numProductsInCart = action.payload.numProductsInCart;
      state.totalPricesInCart = action.payload.totalPricesInCart;
      state.logged = true;
      state.token = action.payload.token;
      state.loading = 'fulfilled';
    }),
    logout: create.reducer(state => {
      state.id = '';
      state.name = '';
      state.email = '';
      state.role = 'none';
      state.numProductsInCart = 0;
      state.totalPricesInCart = 0;
      state.logged = false;
      state.token = '';
      state.loading = 'idle';
    }),
    decreaseQuantity: create.reducer(
      (state, action: PayloadAction<UserPayload>) => {
        state.numProductsInCart = action.payload.numProductsInCart;
        state.totalPricesInCart = action.payload.totalPricesInCart;
        state.loading = 'fulfilled';
      },
    ),
    increaseQuantity: create.reducer(
      (state, action: PayloadAction<UserPayload>) => {
        state.numProductsInCart = action.payload.numProductsInCart;
        state.totalPricesInCart = action.payload.totalPricesInCart;
        state.loading = 'fulfilled';
      },
    ),
    removeProduct: create.reducer(
      (state, action: PayloadAction<UserPayload>) => {
        state.numProductsInCart = action.payload.numProductsInCart;
        state.totalPricesInCart = action.payload.totalPricesInCart;
        state.loading = 'fulfilled';
      },
    ),
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
      state.numProductsInCart = action.payload.numProductsInCart;
      state.totalPricesInCart = action.payload.totalPricesInCart;
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
    builder.addCase(decreaseProduct.pending, (state, action) => {
      state.loading = 'pending';
    });
    builder.addCase(decreaseProduct.fulfilled, (state, action) => {
      state.loading = 'fulfilled';
      state.numProductsInCart = action.payload.numProductsInCart;
      state.totalPricesInCart = action.payload.totalPricesInCart;
    });
    builder.addCase(decreaseProduct.rejected, (state, action) => {
      state.loading = 'rejected';
    });
    builder.addCase(increaseProduct.pending, (state, action) => {
      state.loading = 'pending';
    });
    builder.addCase(increaseProduct.fulfilled, (state, action) => {
      state.loading = 'fulfilled';
      state.numProductsInCart = action.payload.numProductsInCart;
      state.totalPricesInCart = action.payload.totalPricesInCart;
    });
    builder.addCase(increaseProduct.rejected, (state, action) => {
      state.loading = 'rejected';
    });
    builder.addCase(removeProduct.pending, (state, action) => {
      state.loading = 'pending';
    });
    builder.addCase(removeProduct.fulfilled, (state, action) => {
      state.loading = 'fulfilled';
      state.numProductsInCart = action.payload.numProductsInCart;
      state.totalPricesInCart = action.payload.totalPricesInCart;
    });
    builder.addCase(removeProduct.rejected, (state, action) => {
      state.loading = 'rejected';
    });
  },
  selectors: {
    selectUser: user => user,
    selectUserStatus: user => user.logged,
    selectRequestStatus: user => user.loading,
    selectUserRole: user => user.role,
    selectUserCartNumber: user => user.numProductsInCart,
    selectUserTotalCost: user => user.totalPricesInCart,
    selectToken: user => user.token,
  },
});

export const {
  login,
  logout,
  resetRequestStatus,
  decreaseQuantity,
  increaseQuantity,
} = userSlice.actions;
export const {
  selectUser,
  selectUserStatus,
  selectRequestStatus,
  selectUserRole,
  selectUserCartNumber,
  selectUserTotalCost,
  selectToken,
} = userSlice.selectors;

export default userSlice.reducer;
