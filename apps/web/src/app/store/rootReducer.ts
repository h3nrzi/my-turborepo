import { combineReducers } from '@reduxjs/toolkit';
import authSlice from '../../modules/auth/application/authSlice';
import cartSlice from '../../modules/cart/application/cartSlice';
import baseApi from '../../shared/api/baseApi';

const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  [cartSlice.name]: cartSlice.reducer,
  [authSlice.name]: authSlice.reducer,
});

export default rootReducer;
