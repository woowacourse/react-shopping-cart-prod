import { selector, selectorFamily } from 'recoil';
import {
  serverOriginState,
  checkedItemIdsState,
  cartState,
  pointsState,
} from '../atoms';
import {
  PRODUCTS_BASE_URL,
  ORDERS_BASE_URL,
  POINTS_BASE_URL,
} from '../../constants/api';
import { fetchProducts } from '../../remotes/product';
import type { Product } from '../../types/product';
import { Order } from '../../types/order';
import { fetchOrders, fetchOrderDetail } from '../../remotes/order';
import { fetchSavedPoints, fetchCurrentPoints } from '../../remotes/points';

export const productsQuery = selector<Product[]>({
  key: 'products',
  get: async ({ get }) => {
    return await fetchProducts(`${get(serverOriginState)}${PRODUCTS_BASE_URL}`);
  },
});

export const ordersQuery = selector<Order[]>({
  key: 'orderDetail',
  get: async ({ get }) => {
    return await fetchOrders(`${get(serverOriginState)}${ORDERS_BASE_URL}`);
  },
});

export const orderDetailQuery = selectorFamily<Order, string>({
  key: 'orderDetail',
  get:
    (orderId) =>
    async ({ get }) => {
      return await fetchOrderDetail(
        `${get(serverOriginState)}${ORDERS_BASE_URL}/${orderId}`,
      );
    },
});

export const savedPointsQuery = selectorFamily<number, string>({
  key: 'savedPoints',
  get:
    (orderId) =>
    async ({ get }) => {
      return await fetchSavedPoints(
        `${get(
          serverOriginState,
        )}${ORDERS_BASE_URL}/${orderId}${POINTS_BASE_URL}`,
      );
    },
});

export const currentPointsQuery = selector<number>({
  key: 'currentPoints',
  get: async ({ get }) => {
    return await fetchCurrentPoints(
      `${get(serverOriginState)}${POINTS_BASE_URL}`,
    );
  },
});

export const cartPriceSelector = selector<number>({
  key: 'cartPrice',
  get: ({ get }) => {
    const checkedItemIds = get(checkedItemIdsState);
    const cart = get(cartState);

    const checkedItems = cart.filter((cartItem) =>
      checkedItemIds.has(cartItem.id),
    );

    return checkedItems.reduce(
      (prev, item) => prev + item.product.price * item.quantity,
      0,
    );
  },
});

export const finalPriceSelector = selector<number>({
  key: 'finalPrice',
  get: ({ get }) => {
    const cartPrice = get(cartPriceSelector);
    const { selectedPoints } = get(pointsState);

    return cartPrice - selectedPoints;
  },
});
