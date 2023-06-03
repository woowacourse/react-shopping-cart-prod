import { MSWException } from '../exceptions';
import cartItems from '../fixtures/cart-items';
import orders from '../fixtures/orders';
import products from '../fixtures/products';
import rest from '../rest';
import { SAVING_RATE } from './cart-points';

export const handlers = [
  rest.get('/orders', (req, res) => {
    const { user } = req;

    return res(res.response(200, orders));
  }),

  rest.get('/orders/:orderId', (req, res) => {
    const { orderId } = req.params;
    const order = orders.find((order) => String(order.id) === orderId) ?? null;

    if (order === null) {
      return res(res.response(404, { message: '해당하는 주문을 찾을 수 없습니다.' }));
    }

    return res(res.response(200, order));
  }),

  rest.post('/orders', async (req, res) => {
    const { profile } = req;
    const body = await req.json<typeof req.body>();
    const { usedPoints, cartItems: requestCartItems } = body;

    if (profile.currentPoints < usedPoints) {
      return res(
        res.response(406, { message: '소유한 포인트보다 더 많은 포인트를 사용할 수 없습니다.' }),
      );
    }

    const cartItemsWithProduct = requestCartItems
      .map((requestCartItem) => {
        const foundCartItem = cartItems.find((cartItem) => cartItem.id === requestCartItem.id);
        if (!foundCartItem) throw new MSWException(400, '잘못된 CartItem을 주었습니다!');

        const product =
          products.find((product) => product.id === requestCartItem.productId) ?? null;
        if (product === null)
          throw new MSWException(400, '존재하지 않는 상품을 구매하려 했습니다.');

        return {
          ...foundCartItem,
          product,
        };
      })
      .filter((cartItem) => cartItem.checked);

    const prices = cartItemsWithProduct.map(
      (cartItem) => cartItem.product.price * cartItem.quantity,
    );

    if (prices.some((price) => price === null))
      return res(res.response(400, { message: '존재하지 않는 물품을 구매하려고 하였습니다.' }));

    const orderId = Math.max(1, ...orders.map((order) => order.id)) + 1;
    const points =
      ((prices as number[]).reduce((total, price) => total + price, 0) * SAVING_RATE) / 100;

    orders.push({
      id: orderId,
      cartItems: cartItemsWithProduct.map((cartItem) => ({
        name: cartItem.product.name,
        imageUrl: cartItem.product.imageUrl,
        price: cartItem.product.price,
        productId: cartItem.product.id,
        quantity: cartItem.quantity,
      })),
      usedPoints: points,
      savingRate: SAVING_RATE,
    });
    return res(res.response(201, undefined, { location: `/orders/${orderId}` }));
  }),
];
