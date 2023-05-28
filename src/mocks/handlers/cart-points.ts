import cartItems from '../fixtures/cart-items';
import rest from '../rest';

export const SAVING_RATE = 10;

export const handlers = [
  rest.get('/cart-points', (req, res, ctx) => {
    const { user } = req;

    const points =
      (cartItems.reduce(
        (total, cartItem) => total + cartItem.product.price * cartItem.quantity,
        0,
      ) *
        SAVING_RATE) /
      100;

    return res(
      res.response(200, {
        savingRate: SAVING_RATE,
        points,
      }),
    );
  }),
];
