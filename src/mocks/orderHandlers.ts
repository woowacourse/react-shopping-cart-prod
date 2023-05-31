import { rest } from 'msw';
import {
  ORDER_LIST_KEY,
  getCartItems,
  getOrderList,
} from '../utils/localStorage';
import { CartProductDetail } from '../recoil/atoms/cartAtom';

export const orderHandlers = [
  rest.get('/orders', (_, res, ctx) => {
    return res(ctx.json([]), ctx.status(200), ctx.delay(500));
  }),
  rest.post('/orders', async (req, res, ctx) => {
    const requestData = await req.json();
    const cartItemId = await requestData.order;
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
          };
      });
    };

    const matchedProducts = findProductById(cartItemId, cartItem);

    const orderId = Math.random();

    const orderList = getOrderList();

    localStorage.setItem(
      ORDER_LIST_KEY,
      JSON.stringify([
        ...orderList,
        {
          order: orderId,
          orderInfo: matchedProducts,
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
