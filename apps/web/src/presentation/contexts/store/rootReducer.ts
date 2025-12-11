import { combineReducers } from '@reduxjs/toolkit';
import authSlice from 'presentation/contexts/authSlice';
import cartSlice from 'presentation/contexts/cartSlice';
import baseApi from 'infrastructure/services/ApiService';

const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  [cartSlice.name]: cartSlice.reducer,
  [authSlice.name]: authSlice.reducer,
});

export default rootReducer;
