const apiUrl = import.meta.env.VITE_API_URL;

export const BASE_URL = apiUrl || '';
export const PRODUCT_URL = apiUrl + '/api/products';
export const USERS_URL = apiUrl + '/api/users';
export const ORDER_URL = apiUrl + '/api/orders';
export const PAYPAL_URL = apiUrl + '/api/config/paypal';
export const UPLOAD_URL = apiUrl + '/api/upload';
