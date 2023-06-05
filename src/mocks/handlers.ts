import type {
  CartItemType,
  OrderType,
  ScheduledOrderType,
} from '../types/product';
import { rest } from 'msw';
import products from './data/products.json';
// import point from './data/point.json';
// import cart from './data/cart.json';
import { findTargetProduct } from '../domain/cartItemHandler';

import { getData, updateData } from '../utils/localStorage';

export const handlers = [
  rest.get('/products', (req, res, ctx) => {
    return res(ctx.delay(200), ctx.status(200), ctx.json(products));
  }),

  rest.get('/products/empty', (req, res, ctx) => {
    return res(ctx.delay(200), ctx.status(200), ctx.json([]));
  }),

  rest.get('/products/error', (req, res, ctx) => {
    return res(ctx.delay(200), ctx.status(400), ctx.json(products));
  }),

  rest.get('/cart-items', (req, res, ctx) => {
    return res(ctx.delay(200), ctx.status(200), ctx.json(getData('cart')));
  }),

  rest.get('/orderTypes', (req, res, ctx) => {
    return res(ctx.delay(200), ctx.status(200), ctx.json(getData('orderType')));
  }),

  rest.get('/points', (req, res, ctx) => {
    return res(ctx.delay(200), ctx.status(200), ctx.json(getData('point')));
  }),

  rest.get('/orderTypes/:orderTypeId', (req, res, ctx) => {
    const storedOrderTypes: OrderType[] = getData('orderType');
    const orderType = storedOrderTypes.find(
      (orderType) => orderType.orderId === Number(req.params.orderTypeId)
    );

    if (!orderType)
      return res(
        ctx.status(404),
        ctx.json({ message: '주문 내역이 없습니다' })
      );

    return res(ctx.delay(200), ctx.status(200), ctx.json(orderType));
  }),

  rest.post<{ productId: number }>('/cart-items', (req, res, ctx) => {
    const { productId } = req.body;

    const storedCart: CartItemType[] = getData('cart');

    if (findTargetProduct(storedCart, productId)) {
      return res(
        ctx.status(304),
        ctx.json({ message: '이미 상품이 있습니다' })
      );
    }

    const product = products.find((product) => product.productId === productId);

    if (!product)
      return res(ctx.status(404), ctx.json({ message: '상품이 없습니다' }));

    return res(ctx.status(201), ctx.json({ message: '상품이 추가되었습니다' }));
  }),

  rest.post<{ order: ScheduledOrderType }>('/orderTypes', (req, res, ctx) => {
    const { order } = req.body;
    const { cartItems, totalPrice } = order;
    const currentOrderTypes = getData('orderType');
    const updatedOrderTypes: OrderType[] = [
      ...currentOrderTypes,
      {
        orderTypeId: Date.now(),
        orderTypeDateTime: '2023-06-01 08:30:21',
        orderTypeItems: cartItems,
        totalPrice,
      },
    ];
    updateData('orderType', updatedOrderTypes);

    return res(ctx.status(201), ctx.json({ message: '상품이 추가되었습니다' }));
  }),

  rest.patch<{ quantity: number }>(
    '/cart-items/:cartItemId',
    (req, res, ctx) => {
      const { cartItemId } = req.params;

      const cartProductId = Number(cartItemId as string);

      const storedCart: CartItemType[] = getData('cart');

      if (
        !storedCart.find(
          (cartProduct) => cartProduct.cartItemId === cartProductId
        )
      ) {
        return res(
          ctx.status(304),
          ctx.json({ message: '카트에 상품이 없습니다' })
        );
      }

      return res(
        ctx.delay(200),
        ctx.status(200),
        ctx.json({ message: '업데이트가 완료되었습니다' })
      );
    }
  ),

  rest.delete('/cart-items/:cartItemTypeId', (req, res, ctx) => {
    const { cartItemId } = req.params;

    const cartProductId = Number(cartItemId as string);

    const storedCart = getData('cart');

    if (
      !storedCart.cartItemTypes.find(
        (cartProduct: CartItemType) => cartProduct.cartItemId === cartProductId
      )
    ) {
      return res(
        ctx.status(304),
        ctx.json({ message: '카트에 상품이 없습니다' })
      );
    }

    return res(ctx.delay(200), ctx.status(204));
  }),
];
