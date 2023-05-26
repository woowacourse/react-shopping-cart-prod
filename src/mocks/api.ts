import { rest } from 'msw';
import { MockProducts } from './fixtures/products';
import { MockCart } from './fixtures/cart';
import { getUUID } from '../utils/uuid';
import { getCart, getOrders, setCart, setOrders } from '../utils/localStorage';
import { CartItem } from '../types/cart';

const base64 = 'Basic YUBhLmNvbToxMjM0';

export const getCartItems = rest.get('/cart-items', (req, res, ctx) => {
  return res(ctx.status(200), ctx.json(getCart()));
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

    const authorization = req.headers.get('Authorization');
    if (authorization !== base64) return res(ctx.status(401));

    const newCart = MockCart.filter((item) => item.id !== Number(cartItemId));

    setCart(newCart);

    return res(ctx.status(200), ctx.json({}));
  }
);

export const getProducts = rest.get('/products', (req, res, ctx) => {
  return res(ctx.status(200), ctx.json(MockProducts));
});

export const postOrders = rest.post('/orders', async (req, res, ctx) => {
  const { cartItemIds } = await req.json();
  const cart = getCart();
  const orders = getOrders([]);

  if (!cartItemIds.length) {
    return res(
      ctx.status(400),
      ctx.json({
        code: 101,
        message: '장바구니가 비어 있습니다.',
      })
    );
  }

  // 장바구니와 선택된 id를 비교해 선택된 물품들을 가져온다.
  const selectedCart = cart.filter((cartItem) =>
    cartItemIds.find((selectId: number) => selectId === cartItem.id)
  );

  const orderItems = selectedCart.map((cartItem) => {
    return {
      orderItemId: cartItem.product.id,
      name: cartItem.product.name,
      price: cartItem.product.price,
      imageUrl: cartItem.product.imageUrl,
      quantity: cartItem.quantity,
    };
  });

  const newOrder = {
    orderId: getUUID(),
    orderItems,
    totalPrice: orderItems.reduce((acc, cur) => {
      const price = cur.price * cur.quantity;
      return acc + price;
    }, 0),
  };

  const newOrders = [...orders, newOrder];
  setOrders(newOrders);

  return res(
    ctx.status(201),
    ctx.set('Location', `orders/${newOrder.orderId}`),
    ctx.json({})
  );
});
