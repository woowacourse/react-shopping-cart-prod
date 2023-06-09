import { rest } from 'msw';
import { MockProducts } from './fixtures/products';
import { MockCart } from './fixtures/cart';
import { getUUID } from '../utils/uuid';
import { getCart, getOrders, setCart, setOrders } from '../utils/localStorage';
import { CartItem } from '../types/cart';
import { coupons } from './fixtures/coupons';

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

export const postOrder = rest.post('/orders', async (req, res, ctx) => {
  const { cartItemIds, couponIds } = await req.json();
  const cart = getCart();
  const orders = getOrders([]);
  if (!cartItemIds) {
    return res(
      ctx.status(400),
      ctx.json({
        code: 101,
        message: '장바구니가 비어 있습니다.',
      })
    );
  }

  const selectedCart = cart.filter((cartItem) =>
    cartItemIds.find((selectId: number) => selectId === cartItem.id)
  );

  const orderItems = selectedCart.map((cartItem) => {
    return {
      orderItemId: cartItem.product.id,
      name: cartItem.product.name,
      price: cartItem.product.price,
      orderedPrice: cartItem.product.price - 1,
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

export const getOrderList = rest.get('/orders', (req, res, ctx) => {
  const orders = getOrders();

  return res(
    ctx.status(200),
    ctx.json({
      orders,
    })
  );
});

export const getOrderDetail = rest.get('/orders/:orderId', (req, res, ctx) => {
  const { orderId } = req.params;
  const orders = getOrders([]);
  const targetOrder = orders.find((order) => order.orderId === +orderId);

  if (!targetOrder) {
    return res(
      ctx.status(400),
      ctx.json({
        code: 101,
        message: '해당 상품이 존재하지 않습니다.',
      })
    );
  }

  return res(ctx.status(200), ctx.json(targetOrder));
});

export const getCoupons = rest.get('/coupons', (req, res, ctx) => {
  return res(ctx.status(200), ctx.json(coupons));
});
