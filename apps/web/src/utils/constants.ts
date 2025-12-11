const apiUrl = import.meta.env.VITE_API_URL ?? '';
const apiPrefix = apiUrl ? `${apiUrl}/api` : '/api';

export const BASE_URL = apiUrl;
export const PRODUCT_URL = `${apiPrefix}/products`;
export const USERS_URL = `${apiPrefix}/users`;
export const ORDER_URL = `${apiPrefix}/orders`;
export const PAYPAL_URL = `${apiPrefix}/config/paypal`;
export const UPLOAD_URL = `${apiPrefix}/upload`;
