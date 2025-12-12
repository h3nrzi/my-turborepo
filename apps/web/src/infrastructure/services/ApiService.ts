import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from 'shared/utils/constants';

export const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: 'include',
});

const baseApi = createApi({
  baseQuery,
  tagTypes: ['Products', 'Orders', 'MyOrders', 'Users'] as const,
  endpoints: () => ({}),
  refetchOnFocus: false,
  refetchOnReconnect: false,
  refetchOnMountOrArgChange: 0,
  keepUnusedDataFor: 90,
});

export default baseApi;
