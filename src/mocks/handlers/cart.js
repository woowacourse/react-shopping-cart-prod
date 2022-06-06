import { CART_API_URL } from '@/api/constants';
import { rest } from 'msw';
import { cartList } from '../data/cart';

export const cartHanlders = [
  rest.post(CART_API_URL.TO_CARTS, (req, res, ctx) => {
    const { body: product } = req;

    cartList.current.push(product);

    return res(res => {
      res.statusText = 'Created';
      return res;
    });
  }),

  rest.get(CART_API_URL.TO_CARTS, (req, res, ctx) => {
    return res(ctx.json(cartList.current));
  }),

  rest.delete(CART_API_URL.TO_PRODUCT_ID, (req, res, ctx) => {
    const {
      params: { productId },
    } = req;

    cartList.current = cartList.current.filter(cart => Number(productId) !== cart.id);

    return res(ctx.json());
  }),

  rest.patch(CART_API_URL.TO_PRODUCT_ID, (req, res, ctx) => {
    const {
      params: { productId },
      body: newCartProduct,
    } = req;

    cartList.current = cartList.current.map(cart => {
      if (cart.id === Number(productId)) {
        return newCartProduct;
      }
      return cart;
    });

    return res(ctx.json());
  }),
];
