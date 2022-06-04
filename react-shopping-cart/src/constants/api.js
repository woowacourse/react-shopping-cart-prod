export const BASE_URL = process.env.REACT_APP_API_HOST ?? '';

const CUSTOMERS = 'customers';
export const API_URL_PATH = {
  PRODUCTS: `products`,
  CUSTOMERS: `/${CUSTOMERS}`,
  LOGIN: `/${CUSTOMERS}/login`,
  EMAIL: `/${CUSTOMERS}/email`,
};
