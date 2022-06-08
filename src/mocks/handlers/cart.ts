import { rest, RestRequest } from 'msw';
import { SERVER_URL } from 'configs/api';
import * as db from 'mocks/db.js';

const cart = [...db.cart];

const TOKEN_PREFIX = 'lokbawoody';
const extractIdFromToken = (token: string) =>
  Number(token.replace(TOKEN_PREFIX, ''));

const extractIdFromHeader = <T>(
  req: RestRequest<T>
): {
  id?: number;
  isValidToken: boolean;
} => {
  const authorization = req.headers.get('Authorization');
  const accessToken = authorization?.trim().replace('Bearer', '');

  if (!accessToken) {
    return {
      isValidToken: false,
    };
  }

  return {
    id: extractIdFromToken(accessToken),
    isValidToken: true,
  };
};

const cartHandlers = [
  rest.get(`${SERVER_URL}/api/customers/cart`, (req, res, ctx) => {
    const { id: userId, isValidToken } = extractIdFromHeader(req);

    if (!isValidToken) {
      return res(
        ctx.status(401),
        ctx.json({ message: '유효하지 않은 토큰입니다.' })
      );
    }

    const cartItems = cart.filter(
      (cartItem) => cartItem['customer_id'] === userId
    );

    const joinedCart = cartItems.map(({ id, product_id, quantity }) => {
      const product = db.products.find((product) => product.id === product_id);

      return { cartItemId: id, product, quantity };
    });

    return res(ctx.delay(2000), ctx.status(200), ctx.json(joinedCart));
  }),
  rest.post<{ productId: number; quantity: number }>(
    `${SERVER_URL}/api/customers/cart`,
    (req, res, ctx) => {
      if (!req.body) {
        return res(ctx.status(400), ctx.json(new Error('body is required')));
      }

      const { id: userId, isValidToken } = extractIdFromHeader(req);

      if (!isValidToken) {
        return res(
          ctx.status(401),
          ctx.json({ message: '유효하지 않은 토큰입니다.' })
        );
      }

      const newCartItem = req.body;

      cart.push({
        id: cart.length,
        customer_id: userId as number,
        product_id: newCartItem.productId,
        quantity: newCartItem.quantity,
      });

      return res(ctx.status(200));
    }
  ),
  rest.put<{ productId: number; quantity: number }>(
    `${SERVER_URL}/api/customers/cart/:cartItemId`,
    (req, res, ctx) => {
      // const cartItemId = req.params;

      if (!req.body) {
        return res(ctx.status(400), ctx.json(new Error('body is required')));
      }

      const { isValidToken } = extractIdFromHeader(req);

      if (!isValidToken) {
        return res(
          ctx.status(401),
          ctx.json({ message: '유효하지 않은 토큰입니다.' })
        );
      }

      // const updatedCartItem = req.body;

      // cart = cart.map((cartItem) => {
      //   if (cartItem.id === Number(cartItemId)) {
      //     return {
      //       ...cartItem,
      //       quantity: updatedCartItem.quantity,
      //     };
      //   }

      //   return cartItem;
      // });

      return res(ctx.status(200));
    }
  ),
  rest.delete(
    `${SERVER_URL}/api/customers/cart/:cartItemId`,
    (req, res, ctx) => {
      // const cartItemId = req.params;
      const { isValidToken } = extractIdFromHeader(req);

      if (!isValidToken) {
        return res(
          ctx.status(401),
          ctx.json({ message: '유효하지 않은 토큰입니다.' })
        );
      }

      // cart = cart.filter(({ id }) => id !== Number(cartItemId));

      return res(ctx.status(200));
    }
  ),
  rest.get(`${SERVER_URL}/api/customers/cart/:productId`, (req, res, ctx) => {
    const { id: userId, isValidToken } = extractIdFromHeader(req);
    const productId = req.url.searchParams.get('productId');

    if (!isValidToken) {
      return res(
        ctx.status(401),
        ctx.json({
          message: '유효하지 않은 토큰입니다.',
        })
      );
    }

    const exists = !!cart.find(
      ({ customer_id, product_id }) =>
        customer_id === userId && product_id === Number(productId)
    );

    return res(ctx.status(200), ctx.json({ exists }));
  }),
];

export default cartHandlers;
