import { selector } from 'recoil';
import { Cart, Order, Product } from '../types/responseData';
import { serverAtom } from './server';
import { BASE_URL } from '../constants/baseURL';
import fetchList from '../util/fetchList';
import { END_POINTS } from '../constants/endPoints';

export const fetchedProductListSelector = selector({
  key: 'async/product-list',
  get: async ({ get }) => {
    const serverName = get(serverAtom);
    const baseURL = BASE_URL[serverName];
    const data = await fetchList<Product[]>(baseURL, END_POINTS.PRODUCT);
    if (serverName === 'ERROR') throw new Error('');
    return data;
  },
});

export const fetchedCartListSelector = selector({
  key: 'async/cart-list',
  get: async ({ get }) => {
    const serverName = get(serverAtom);
    const baseURL = BASE_URL[serverName];
    const data = await fetchList<Cart[]>(baseURL, END_POINTS.CART_ITEMS);

    return data;
  },
});

export const fetchedOrderListSelector = selector({
  key: 'async/order-list',
  get: async ({ get }) => {
    const serverName = get(serverAtom);
    const baseURL = BASE_URL[serverName];
    const data = await fetchList<{ orders: Order[] }>(
      baseURL,
      END_POINTS.ORDERS
    );

    return data.orders;
  },
});
