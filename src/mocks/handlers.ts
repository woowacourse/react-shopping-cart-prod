import { setCart } from './../utils/localStorage';
import { getUUID } from './../utils/uuid';
import { rest } from 'msw';
import { MockCart } from './fixtures/cart';
import { MockProducts } from './fixtures/products';
import { CartItem } from '../types/cart';

const base64 = 'Basic IGFAYS5jb206MTIzNA==';

export const handlers = [
  rest.post('/cart-items', async (req, res, ctx) => {
    let cartId;
    const { productId } = await req.json();

    const authorization = req.headers.get('Authorization');

    if (authorization !== base64) return res(ctx.status(401));

    const product = MockProducts.find((product) => product.id === productId);
    const targetItemIndex = MockCart.cart.findIndex(
      ({ product }) => product.id === productId
    );

    if (!product) return res(ctx.status(404), ctx.json({}));

    if (targetItemIndex === -1) {
      const newCartItem = {
        id: getUUID(),
        quantity: 1,
        product,
      };

      cartId = newCartItem.id;
      MockCart.cart.push(newCartItem);
    } else {
      cartId = MockCart.cart[targetItemIndex].id;
    }

    setCart(MockCart.cart);

    return res(
      ctx.status(200),
      ctx.set('Location', `/cart-items/${cartId}`),
      ctx.json(MockCart)
    );
  }),

  rest.patch('/cart-items/:cartItemId', async (req, res, ctx) => {
    const { cartItemId } = req.params;
    const authorization = req.headers.get('Authorization');

    if (authorization !== base64) return res(ctx.status(401));

    const { quantity }: { quantity: CartItem['quantity'] } = await req.json();

    MockCart.cart = MockCart.cart.map((item) => {
      if (item.id === Number(cartItemId)) {
        return {
          ...item,
          quantity,
        };
      }

      return item;
    });

    setCart(MockCart.cart);

    return res(ctx.status(200), ctx.json({}));
  }),

  rest.get('/products', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(MockProducts));
  }),

  rest.get('/cart-items', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(MockCart));
  }),

  rest.delete('/cart-items/:cartItemId', async (req, res, ctx) => {
    const { cartItemId } = req.params;

    MockCart.cart = MockCart.cart.filter(
      (item) => item.id !== Number(cartItemId)
    );

    setCart(MockCart.cart);

    return res(ctx.status(200), ctx.json({}));
  }),
];
