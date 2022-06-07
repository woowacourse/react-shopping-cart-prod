import { Routes } from 'types';

const BE_PAIR_SERVER_URL = {
  SKULL_SUDAL:
    'http://ec2-3-37-87-144.ap-northeast-2.compute.amazonaws.com:8080',
  HOODY_BAEKARA:
    'http://ec2-13-209-4-69.ap-northeast-2.compute.amazonaws.com:8080',
};
export const SERVER_URL = BE_PAIR_SERVER_URL.SKULL_SUDAL;
const JSON_SERVER_URL = 'https://json-server-shopping-cart.herokuapp.com';

const ROUTES = {
  CART: '/cart',
  PRODUCTS: '/products',
} as const;

const API = Object.entries(ROUTES).reduce<Record<string, string>>(
  (obj, [key, value]) => ({
    ...obj,
    [key]: `${JSON_SERVER_URL}${value}`,
  }),
  {}
) as Routes<typeof ROUTES>;

export default API;
