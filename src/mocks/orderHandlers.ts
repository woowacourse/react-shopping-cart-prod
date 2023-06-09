import { rest } from 'msw';
import {
  ORDER_LIST_KEY,
  POINT_KEY,
  getCartItems,
  getOrderList,
  getPoint,
} from '../utils/localStorage';
import { CartProductDetail } from '../recoil/atoms/cartAtom';

export const orderHandlers = [
  rest.get('/orders', (_, res, ctx) => {
    const orderList = getOrderList();

    return res(ctx.json(orderList), ctx.status(200), ctx.delay(500));
  }),
  rest.post('/orders', async (req, res, ctx) => {
    const requestData = await req.json();
    const cartItemIds = await requestData.cartItemIds;
    const originalPrice = await requestData.originalPrice;
    const usedPoint = await requestData.usedPoint;
    const pointToAdd = await requestData.pointToAdd;
    const cartItem = getCartItems();

    const findProductById = (
      ids: number[],
      productList: CartProductDetail[]
    ) => {
      return ids.map((id) => {
        const productItem = productList.find((product) => product.id === id);
        if (productItem)
          return {
            productId: productItem.product.id,
            price: productItem.product.price,
            name: productItem.product.name,
            imageUrl: productItem.product.imageUrl,
            quantity: productItem.quantity,
            pointAvailabe: productItem.product.pointAvailable,
            pointRatio: productItem.product.pointRatio,
          };
      });
    };

    const matchedProducts = findProductById(cartItemIds, cartItem);

    const point = getPoint();

    const orderId = Math.random();

    const orderList = getOrderList();

    localStorage.setItem(
      POINT_KEY,
      JSON.stringify({
        point: point.point - usedPoint + pointToAdd,
      })
    );

    localStorage.setItem(
      ORDER_LIST_KEY,
      JSON.stringify([
        ...orderList,
        {
          orderId: orderId,
          orderInfos: matchedProducts,
          originalPrice: originalPrice,
          usedPoint: usedPoint,
          pointToAdd: pointToAdd,
        },
      ])
    );

    return res(
      ctx.json('created'),
      ctx.status(201),
      ctx.set({ Location: `orders/${orderId}` }),
      ctx.delay(300)
    );
  }),
];
