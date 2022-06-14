import { API_URL } from '@/api/constants';
import { generateNonDuplicatedId } from '@/util';
import { rest } from 'msw';
import { cartList } from '../data/cart';
import { productList } from '../data/product';

export const cartHanlders = [
  rest.post(`${API_URL}/cartItems`, (req, res, ctx) => {
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

  rest.get(`${API_URL}/cartItems`, (req, res, ctx) => {
    return res(ctx.json({ cartItems: cartList.current }));
  }),

  rest.delete(`${API_URL}/cartItems/:id`, (req, res, ctx) => {
    const {
      params: { id },
    } = req;

    cartList.current = cartList.current.filter(cart => id !== cart.id);

    return res(ctx.json());
  }),

  rest.patch(`${API_URL}/cartItems/:id`, (req, res, ctx) => {
    const {
      params: { id, quantity },
    } = req;

    cartList.current = cartList.current.map(cart => {
      if (cart.id === id) {
        return { ...cart, quantity };
      }
      return cart;
    });

    return res(ctx.json());
  }),
];
