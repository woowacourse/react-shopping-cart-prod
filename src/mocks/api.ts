import { rest } from 'msw';
import { MockProducts } from './fixtures/products';
import { MockCart } from './fixtures/cart';
import { getUUID } from '../utils/uuid';
import { setCart } from '../utils/localStorage';
import { CartItem } from '../types/cart';

const base64 = 'Basic IGFAYS5jb206MTIzNA==';

export const getCartItems = rest.get('/cart-items', (req, res, ctx) => {
  return res(ctx.status(200), ctx.json(MockCart));
});

export const postCartItems = rest.post('/cart-items', async (req, res, ctx) => {
  let cartId;
  const { productId } = await req.json();

  const authorization = req.headers.get('Authorization');
  if (authorization !== base64) return res(ctx.status(401));

  const product = MockProducts.find((product) => product.id === productId);
  const targetItemIndex = MockCart.findIndex(
    ({ product }) => product.id === productId
  );

  if (!product) return res(ctx.status(404), ctx.json({}));

  // generate new Cart Item
  if (targetItemIndex === -1) {
    const newCartItem = {
      id: getUUID(),
      quantity: 1,
      product,
    };
    cartId = newCartItem.id;
    MockCart.push(newCartItem);
  } else {
    cartId = MockCart[targetItemIndex].id;
  }

  setCart(MockCart);

  return res(
    ctx.status(200),
    ctx.set('Location', `/cart-items/${cartId}`),
    ctx.json({})
  );
});

export const patchCartItems = rest.patch(
  '/cart-items/:cartItemId',
  async (req, res, ctx) => {
    const { cartItemId } = req.params;

    const authorization = req.headers.get('Authorization');
    if (authorization !== base64) return res(ctx.status(401));

    const { quantity }: { quantity: CartItem['quantity'] } = await req.json();

    const newCart = MockCart.map((item) => {
      if (item.id === Number(cartItemId)) {
        return {
          ...item,
          quantity,
        };
      }

      return item;
    });

    setCart(newCart);
    return res(ctx.status(200), ctx.json({}));
  }
);

export const deleteCartItems = rest.delete(
  '/cart-items/:cartItemId',
  async (req, res, ctx) => {
    const { cartItemId } = req.params;

    const newCart = MockCart.filter((item) => item.id !== Number(cartItemId));

    setCart(newCart);

    return res(ctx.status(200), ctx.json({}));
  }
);

export const getProducts = rest.get('/products', (req, res, ctx) => {
  return res(ctx.status(200), ctx.json(MockProducts));
});
