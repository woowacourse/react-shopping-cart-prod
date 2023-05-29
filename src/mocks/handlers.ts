import { rest } from 'msw';

import { CART_LIST_LOCAL_STORAGE_KEY } from '../constants';
import initialData from '../data/mockData.json';
import initialOrderData from '../data/mockOrderData.json';
import { CartItemType } from '../types';

interface PostCartItemId {
  itemId: string;
}

const storeKey = CART_LIST_LOCAL_STORAGE_KEY;

export const handlers = [
  rest.get('/products', (req, res, ctx) => {
    return res(ctx.status(200), ctx.delay(1500), ctx.json(initialData));
  }),

  rest.get('/order-items', (req, res, ctx) => {
    return res(ctx.status(200), ctx.delay(1500), ctx.json(initialOrderData));
  }),

  rest.get('/order-items/:id', (req, res, ctx) => {
    const { id } = req.params;

    const result = initialOrderData.find((order) => order.id === Number(id));

    if (!result)
      res(ctx.status(400), ctx.delay(1500), ctx.json('해당 주문 상품이 존재하지 않습니다.'));

    return res(ctx.status(200), ctx.delay(1500), ctx.json(result));
  }),

  rest.get('/cart-items', (req, res, ctx) => {
    const savedValue = localStorage.getItem(storeKey);

    if (savedValue !== null) {
      return res(ctx.status(200), ctx.delay(1000), ctx.json(JSON.parse(savedValue)));
    }
    return res(
      ctx.status(500),
      ctx.delay(1000),
      ctx.json([{ error: '카트 목록이 존재하지 않습니다.' }])
    );
  }),

  rest.get('/cart-items', (req, res, ctx) => {
    const savedValue = localStorage.getItem(storeKey);

    if (savedValue !== null) {
      return res(ctx.status(200), ctx.delay(1000), ctx.json(JSON.parse(savedValue)));
    }
    return res(
      ctx.status(500),
      ctx.delay(1000),
      ctx.json([{ error: '카트 목록이 존재하지 않습니다.' }])
    );
  }),

  rest.patch<PostCartItemId>('/cart-items/:cartItemId', async (req, res, ctx) => {
    const { cartItemId } = await req.params;

    const reqBody = await req.json();
    const savedValue = localStorage.getItem(storeKey);
    if (savedValue) {
      const initData = JSON.parse(savedValue) as CartItemType[];
      const quantity = reqBody.quantity;

      const newData = initData.map((item: CartItemType) => {
        if (item.id === Number(cartItemId)) {
          item.quantity = quantity;
          return item;
        }
        return item;
      });

      localStorage.setItem(CART_LIST_LOCAL_STORAGE_KEY, JSON.stringify(newData));
      return res(ctx.status(200), ctx.delay(500));
    }
    return res(
      ctx.status(404),
      ctx.delay(500),
      ctx.json({ message: '장바구니에 존재하지 않는 상품입니다.' })
    );
  }),

  rest.delete('/cart-item/:id', async (req, res, ctx) => {
    return res(ctx.status(204), ctx.delay(500));
  }),

  rest.post('/cart-items', async (req, res, ctx) => {
    return res(ctx.status(201), ctx.delay(500));
  }),
];
