import { selector } from 'recoil';
import { fetchCartList } from '../api/cartList';
import fetchProductList from '../api/productList';
import { Cart, Order, Product } from '../types/responseData';
import { serverAtom } from './server';
import { BASE_URL } from '../constants/baseURL';
import { fetchOrderList } from '../api/orderList';

export const fetchedProductListSelector = selector({
  key: 'async/product-list',
  get: async ({ get }) => {
    const serverName = get(serverAtom);
    const baseURL = BASE_URL[serverName];
    const data = await fetchProductList<Product[]>(baseURL);

    return data;
  },
});

export const fetchedCartListSelector = selector({
  key: 'async/cart-list',
  get: async ({ get }) => {
    const serverName = get(serverAtom);
    const baseURL = BASE_URL[serverName];
    const data = await fetchCartList<Cart[]>(baseURL);

    return data;
  },
});

export const fetchedOrderListSelector = selector({
  key: 'async/order-list',
  get: async ({ get }) => {
    const serverName = get(serverAtom);
    const baseURL = BASE_URL[serverName];
    const data = await fetchOrderList<{ orders: Order[] }>(baseURL);

    return data.orders;
  },
});
