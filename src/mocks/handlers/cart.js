import { CART_API_URL } from '@/api/constants';
import { generateNonDuplicatedId } from '@/utils';
import { rest } from 'msw';
import { cartList } from '../data/cart';
import { productList } from '../data/product';

export const cartHandlers = [
  rest.post(CART_API_URL.TO_CART_ITEMS, (req, res, ctx) => {
    const {
      body: { productId, quantity },
    } = req;

    const product = productList.find(product => product.id === productId);

    const cartItem = {
      id: generateNonDuplicatedId(),
      productId,
      name: product.name,
      price: product.price,
      imageURL: product.imageURL,
      quantity,
    };

    cartList.current.push(cartItem);

    return res(ctx.json({ cartItem }));
  }),

  rest.get(CART_API_URL.TO_CART_ITEMS, (req, res, ctx) => {
    return res(ctx.json({ cartItems: cartList.current }));
  }),

  rest.delete(CART_API_URL.TO_CART_ITEM_ID, (req, res, ctx) => {
    const {
      params: { id },
    } = req;

    cartList.current = cartList.current.filter(cart => Number(id) !== cart.id);

    return res(ctx.status(204));
  }),

  rest.patch(`${CART_API_URL.TO_CART_ITEM_ID}`, (req, res, ctx) => {
    const {
      params: { id },
      body: {
        params: { quantity },
      },
    } = req;

    cartList.current = cartList.current.map(cart => {
      if (cart.id === Number(id)) {
        return { ...cart, quantity };
      }
      return cart;
    });

    return res(ctx.status(200));
  }),
];
