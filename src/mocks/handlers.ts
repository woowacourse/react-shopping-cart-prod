import { rest } from 'msw';

import { CART_LIST_LOCAL_STORAGE_KEY } from '../constants';
import initialData from '../data/mockData.json';
import { CartItemType } from '../types';

interface PostCartItemId {
  itemId: string;
}

const storeKey = CART_LIST_LOCAL_STORAGE_KEY;

export const handlers = [
  rest.get('/products', (req, res, ctx) => {
    return res(ctx.status(200), ctx.delay(1500), ctx.json(initialData));
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

  // rest.delete('/cart-item-remove', async (req, res, ctx) => {
  //   const itemId = await req.url.searchParams.get('id');
  //   const savedValue = localStorage.getItem(storeKey);

  //   if (savedValue) {
  //     const initData = JSON.parse(savedValue) as CartItemType[];
  //     const resultData = initData.filter((item) => {
  //       return String(item.id) !== itemId;
  //     });
  //     return res(ctx.status(201), ctx.delay(500), ctx.json(resultData));
  //   }
  //   return res(
  //     ctx.status(404),
  //     ctx.delay(500),
  //     ctx.json({ message: '장바구니에 존재하지 않는 상품입니다.' })
  //   );
  // }),

  rest.delete('/cart-item/:id', async (req, res, ctx) => {
    return res(ctx.status(204), ctx.delay(500));
  }),

  // rest.patch('/checked-cart-item-remove', async (req, res, ctx) => {
  //   const savedValue = localStorage.getItem(storeKey);

  //   if (savedValue) {
  //     const initData = JSON.parse(savedValue) as CartItemType[];
  //     const resultData = initData.filter((item) => {
  //       return !item.isChecked;
  //     });

  //     return res(ctx.status(201), ctx.delay(500), ctx.json(resultData));
  //   }
  //   return res(
  //     ctx.status(404),
  //     ctx.delay(500),
  //     ctx.json({ message: '장바구니에 존재하지 않는 상품입니다.' })
  //   );
  // }),

  // rest.post('/cart-items', async (req, res, ctx) => {
  //   const { itemId, quantity } = await req.json();

  //   const savedValue = localStorage.getItem(storeKey);
  //   if (!savedValue) localStorage.setItem(storeKey, '[]');
  //   if (savedValue) {
  //     const initData = JSON.parse(savedValue) as Omit<CartItemType, 'isChecked'>[];

  //     const selectedCartItemIndex = initData.findIndex(
  //       (cartItem) => cartItem.product.id === itemId
  //     );
  //     const selectedCartItemData = initialData.find((item) => item.id === itemId);
  //     console.log(selectedCartItemData);
  //     if (selectedCartItemIndex === -1 && selectedCartItemData !== undefined) {
  //       const newCartId = Number(new Date());
  //       initData.push({
  //         id: newCartId,
  //         quantity,
  //         product: selectedCartItemData,
  //       });
  //       return res(ctx.status(201), ctx.delay(500), ctx.json(initData));
  //     } else {
  //       const updatedCartList = [...initData];
  //       updatedCartList[selectedCartItemIndex] = {
  //         ...updatedCartList[selectedCartItemIndex],
  //         quantity: updatedCartList[selectedCartItemIndex].quantity + quantity,
  //       };
  //       return res(ctx.status(201), ctx.delay(500), ctx.json(updatedCartList));
  //     }
  //   }
  //   return res(
  //     ctx.status(500),
  //     ctx.delay(500),
  //     ctx.json({ message: '장바구니에 상품 추가에 실패했습니다.' })
  //   );
  // }),

  rest.post('/cart-items', async (req, res, ctx) => {
    const { itemId } = await req.json();

    return res(ctx.status(201), ctx.delay(500));
  }),
];
