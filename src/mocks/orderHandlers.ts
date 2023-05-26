import { rest } from 'msw';
import {
  ORDER_LIST_KEY,
  getCartItemsFromLocalStorage,
  getOrderListFromLocalStorage,
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

    console.log(await requestData);

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

    return res(
      ctx.json(''),
      ctx.status(200),
      ctx.set({ Location: `${randomOrderId}` })
    );
  }),
  rest.get('/orders', (_, res, ctx) => {
    const orderList = getOrderListFromLocalStorage();
    const cartItems = getCartItemsFromLocalStorage();

    const responseOrder = orderList.map((order) => {
      return {
        orderId: order.orderId,
        orderInfo: order.orderInfo.map((cartItemId: string) => {
          const cartItem = cartItems.find((item) => item.id === cartItemId);

          return {
            productId: cartItem.product.id,
            price: cartItem.product.price,
            name: cartItem.product.name,
            imageUrl: cartItem.product.imageUrl,
            quantity: cartItem.quantity,
          };
        }),
      };
    });

    return res(ctx.status(200), ctx.json(responseOrder));
  }),
  rest.get('/order/:id', (req, res, ctx) => {
    const orderId = Number(req.params.id);
    const orderList = getOrderListFromLocalStorage();

    const order = orderList.find((o) => o.orderId === orderId);

    return res(ctx.status(200), ctx.json(order));
  }),
];
