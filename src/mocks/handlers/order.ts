import { rest } from 'msw';
import {
  CART_BASE_URL,
  ORDERS_BASE_URL,
  ORDERS_LOCAL_STORAGE_KEY,
  POINT_LOCAL_STORAGE_KEY,
} from '../../constants/api';
import { fetchCartItems, removeCartItem } from '../../remotes/cart';
import { setLocalStorage } from '../../utils/localStorage';
import { getBase64 } from '../../constants/auth';
import { POINT } from './point';
import type { Order } from '../../types/order';
import type { CartItem } from '../../types/cart';
import { SHIPPING_FEE } from '../../constants/cart';

const localStorageOrders = localStorage.getItem(ORDERS_LOCAL_STORAGE_KEY);
// eslint-disable-next-line prefer-const
let orders: Order[] = localStorageOrders ? JSON.parse(localStorageOrders) : [];

export const orderHandlers = [
  // 전체 주문 목록 조회
  rest.get(ORDERS_BASE_URL, (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(orders));
  }),

  // 단일 주문 조회
  rest.get(`${ORDERS_BASE_URL}/:id`, async (req, res, ctx) => {
    const orderId = Number(req.params.id);
    const order = orders.find((order) => order.id === orderId);

    if (order === undefined) {
      return res(ctx.status(404));
    }

    return res(ctx.status(200), ctx.json(order));
  }),

  // 주문하기
  rest.post(ORDERS_BASE_URL, async (req, res, ctx) => {
    const { cartItemIds, usePoint } = await req.json();
    const cart: CartItem[] = await fetchCartItems(
      CART_BASE_URL,
      getBase64('유스'),
    );

    const orderItems = cart.filter((cartItem) =>
      cartItemIds.includes(cartItem.id),
    );

    const _orders = orderItems.map((orderItem) => {
      const { id, quantity, product } = orderItem;
      const { price, name, imageUrl } = product;

      return {
        id,
        quantity,
        price,
        name,
        imageUrl,
      };
    });

    const totalPrice = orderItems.reduce((prev, orderItem) => {
      const { quantity, product } = orderItem;
      const { price } = product;

      return prev + quantity * price;
    }, 0);
    const totalOrderPrice =
      totalPrice >= 30000
        ? totalPrice - usePoint
        : totalPrice + SHIPPING_FEE - usePoint;

    const newOrder = {
      id: Date.now(),
      price: totalOrderPrice,
      orderDate: new Date().toISOString(),
      orders: _orders,
    } satisfies Order;

    console.log(totalOrderPrice, usePoint);
    const addedPoint = Math.floor(totalOrderPrice * 0.025);

    orders = [...orders, newOrder];
    POINT.points -= usePoint;
    POINT.points += addedPoint;
    cartItemIds.forEach((cartItemId: CartItem['id']) =>
      removeCartItem(`${CART_BASE_URL}/${cartItemId}`, getBase64('유스')),
    );

    setLocalStorage(ORDERS_LOCAL_STORAGE_KEY, orders);
    setLocalStorage(POINT_LOCAL_STORAGE_KEY, POINT);

    return res(
      ctx.status(201),
      ctx.json({
        addedPoint: Math.floor(totalPrice * 0.025),
        remainPoint: POINT.points,
      }),
      ctx.set('Location', `/orders/${orders.at(-1)?.id}`),
    );
  }),
];
