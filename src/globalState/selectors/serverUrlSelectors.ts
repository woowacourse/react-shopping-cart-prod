import { selector } from 'recoil';
import serverNameState from '../atoms/serverName';
import { BASE_URL, PRODUCTS_PATH_NAME } from '../../constant';

export const getProductsUrl = selector({
  key: 'getProductsUrl',

  get: ({ get }) => BASE_URL[get(serverNameState)] + PRODUCTS_PATH_NAME,
});

export const getCartItemsUrl = selector({
  key: 'getCartItemsUrl',

  get: ({ get }) => BASE_URL[get(serverNameState)] + PRODUCTS_PATH_NAME,
});
