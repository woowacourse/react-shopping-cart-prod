import { rest } from 'msw';
import { cart, couponList, orderList, productList } from './mockData';

let MOCK_PRODUCT_LIST = [...productList];
let MOCK_CART = [...cart];
let MOCK_ORDER_LIST = [...orderList];
let MOCK_COUPON_LIST = [...couponList];

const getNextId = (dataArr: any[]) => {
  return dataArr.reduce((max, item) => Math.max(max, item.id), 0);
};

export const handlers = [
  rest.get('msw/products', (req, res, ctx) => {
    return res(
      ctx.set('Content-Type', 'application/json'),
      ctx.delay(500),
      ctx.status(200),
      ctx.json(MOCK_PRODUCT_LIST)
    );
  }),

  rest.get('msw/cart-items', (req, res, ctx) => {
    return res(ctx.delay(500), ctx.status(200), ctx.json(MOCK_CART));
  }),

  rest.post('msw/cart-items', async (req, res, ctx) => {
    const { productId: data } = await req.json();
    const productId = Number(data);

    const product = productList.find((productItem) => productItem.id === productId);

    if (MOCK_CART.some((cartItem) => cartItem.id === productId)) return;

    const nextId = getNextId(MOCK_CART);

    if (product) {
      MOCK_CART.push({
        id: nextId,
        quantity: 1,
        product: product,
      });
    }

    return res(ctx.delay(500), ctx.status(201), ctx.set('Location', `/cart-items/${nextId}`));
  }),

  rest.delete('msw/cart-items/:cartId', async (req, res, ctx) => {
    const { cartId: idData } = req.params;
    const cartId = Number(idData);

    MOCK_CART = MOCK_CART.filter((cartItem) => cartItem.id !== cartId);

    return res(ctx.delay(500), ctx.status(204));
  }),

  rest.patch('msw/cart-items/', async (req, res, ctx) => {
    const reqArray: any[] = await req.json();
    const IdArray = reqArray.map((reqItem) => Number(reqItem.id));
    MOCK_CART = MOCK_CART.filter((cartItem) => IdArray.includes(cartItem.id));

    return res(ctx.delay(500), ctx.status(200), ctx.body('ok'));
  }),

  rest.patch('msw/cart-items/:cartId', async (req, res, ctx) => {
    const { cartId: idData } = req.params;
    const cartId = Number(idData);

    const { quantity: quantityData } = await req.json();
    const quantity: number = quantityData;

    MOCK_CART = MOCK_CART.map((cartItem) => {
      if (cartItem.id === cartId) {
        return {
          ...cartItem,
          quantity,
        };
      } else {
        return cartItem;
      }
    });

    return res(ctx.delay(500), ctx.status(200), ctx.body('OK'));
  }),

  rest.get('msw/orders', (req, res, ctx) => {
    return res(ctx.delay(500), ctx.status(200), ctx.json(MOCK_ORDER_LIST));
  }),

  rest.post('msw/orders', async (req, res, ctx) => {
    const { orderItems, couponId } = await req.json();

    const nextId = getNextId(MOCK_ORDER_LIST);

    MOCK_ORDER_LIST.push({
      id: nextId,
      totalItemsPrice: 30000,
      discountPrice: 2000,
      deliveryFee: 3000,
      orderItems: [
        {
          orderItemId: 3,
          name: '치킨',
          price: 10000,
          imageUrl: 'http://example.com/chicken.jpg',
          quantity: 2,
        },
        {
          orderItemId: 5,
          name: '치킨',
          price: 10000,
          imageUrl: 'http://example.com/chicken.jpg',
          quantity: 1,
        },
      ],
    });

    return res(ctx.delay(500), ctx.status(201), ctx.set('Location', `/orders/${nextId}`));
  }),

  rest.get('msw/orders/:orderId', (req, res, ctx) => {
    const { orderId: stringOrderId } = req.params;
    const orderId = Number(stringOrderId);

    const order = MOCK_ORDER_LIST.find((order) => order.id === orderId);

    if (order) {
      return res(ctx.delay(500), ctx.status(404));
    }

    return res(ctx.delay(500), ctx.status(200), ctx.json(order));
  }),

  rest.get('msw/coupons/', (req, res, ctx) => {
    return res(ctx.delay(500), ctx.status(200), ctx.json(MOCK_COUPON_LIST));
  }),
];
