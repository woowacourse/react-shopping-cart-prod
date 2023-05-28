import { rest } from 'msw';
import {
  CART_ITEMS_KEY,
  ORDER_LIST_KEY,
  USER_POINT_KEY,
  getCartItemsFromLocalStorage,
  getOrderListFromLocalStorage,
  getUserPointFromLocalStorage,
} from '../utils/localStorage';

export const orderHandlers = [
  rest.post('/orders', async (req, res, ctx) => {
    const cartItems = getCartItemsFromLocalStorage();

    const requestData = await req.json();

    const order = await requestData.order;
    const originalPrice = await requestData.originalPrice;
    const usedPoint = await requestData.usedPoint;
    const pointToAdd = await requestData.pointToAdd;

    const randomOrderId = Math.random();

    const orderList = getOrderListFromLocalStorage();
    const userPoint = getUserPointFromLocalStorage();

    localStorage.setItem(
      ORDER_LIST_KEY,
      JSON.stringify([
        ...orderList,
        {
          orderId: randomOrderId,
          orderInfo: order.map((cartItemId: string) => {
            const cartItem = cartItems.find((item) => item.id === cartItemId);

            return {
              productId: cartItem.product.id,
              price: cartItem.product.price,
              name: cartItem.product.name,
              imageUrl: cartItem.product.imageUrl,
              quantity: cartItem.quantity,
            };
          }),
          originalPrice,
          usedPoint,
          pointToAdd,
        },
      ])
    );

    localStorage.setItem(
      USER_POINT_KEY,
      JSON.stringify({
        point: userPoint.point - usedPoint + pointToAdd,
      })
    );

    localStorage.setItem(
      CART_ITEMS_KEY,
      JSON.stringify(
        cartItems.filter((cartItem) => !order.includes(cartItem.id))
      )
    );

    return res(
      ctx.json(''),
      ctx.status(200),
      ctx.set({ Location: `${randomOrderId}` }),
      ctx.delay(2000)
    );
  }),
  rest.get('/orders', (_, res, ctx) => {
    const orderList = getOrderListFromLocalStorage();

    return res(ctx.status(200), ctx.json(orderList));
  }),
  rest.get('/order/:id', (req, res, ctx) => {
    const orderId = Number(req.params.id);
    const orderList = getOrderListFromLocalStorage();

    const order = orderList.find((o) => o.orderId === orderId);

    return res(ctx.status(200), ctx.json(order));
  }),
];
