import { rest } from 'msw';
import { createCartItem, removeCartItem, updateCartItemQuantity } from '@utils/cart/cart';
import {
  SERVER_NAME,
  getCartPath,
  getCouponPath,
  getOrderPath,
  getProductPath,
} from '@constants/serverUrlConstants';
import { CartItemType } from '@type/cartType';
import { CouponType } from '@type/couponType';
import { OrderType } from '@type/orderType';
import { ServerProductItemType } from '@type/productType';

export const MOCK_PRODUCT_LIST: ServerProductItemType[] = [
  {
    id: 1,
    name: '1) PET보틀-정사각(420ml) 정말 길고 긴 제목',
    price: 43400,
    imageUrl: 'http://placekitten.com/200/200',
  },
  {
    id: 2,
    name: '2) PET보틀-밀크티(370ml)',
    price: 73400,
    imageUrl: 'http://placekitten.com/200/200',
  },
  {
    id: 3,
    name: '3) PET보틀-정사각(370ml)',
    price: 41000,
    imageUrl: 'http://placekitten.com/200/200',
  },
  {
    id: 4,
    name: '4) PET보틀-납작(450ml)',
    price: 10000,
    imageUrl: 'http://placekitten.com/200/200',
  },
  {
    id: 5,
    name: '5) PET보틀-단지(480ml)',
    price: 41000,
    imageUrl: 'http://placekitten.com/200/200',
  },
  {
    id: 6,
    name: '6) PET보틀-납작(260ml)',
    price: 61800,
    imageUrl: 'http://placekitten.com/200/200',
  },
  {
    id: 7,
    name: '7) PET보틀-원형(500ml)',
    price: 42200,
    imageUrl: 'http://placekitten.com/200/200',
  },
  {
    id: 8,
    name: '8) PET보틀-원형(600ml)',
    price: 44500,
    imageUrl: 'http://placekitten.com/200/200',
  },
  {
    id: 9,
    name: '9) PET보틀-정사각(420ml)',
    price: 43400,
    imageUrl: 'http://placekitten.com/200/200',
  },
  {
    id: 10,
    name: '10) PET보틀-밀크티(370ml)',
    price: 73400,
    imageUrl: 'http://placekitten.com/200/200',
  },
  {
    id: 11,
    name: '11) PET보틀-정사각(370ml)',
    price: 41000,
    imageUrl: 'http://placekitten.com/200/200',
  },
  {
    id: 12,
    name: '12) PET보틀-납작(450ml)',
    price: 39900,
    imageUrl: 'http://placekitten.com/200/200',
  },
];

export const MOCK_ORDER_LIST: OrderType[] = [
  {
    id: 1,
    totalItemsPrice: 340000,
    discountPrice: 3000,
    deliveryFee: 3000,
    orderItems: [
      {
        orderItemId: 1,
        name: '치킨',
        price: 10000,
        imageUrl:
          'https://images.unsplash.com/photo-1578874557108-9fc2cfb1121e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
        quantity: 4,
      },
      {
        orderItemId: 3,
        name: '스테이크',
        price: 100000,
        imageUrl:
          'https://images.unsplash.com/photo-1432139555190-58524dae6a55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1776&q=80',
        quantity: 3,
      },
    ],
  },
  {
    id: 2,
    totalItemsPrice: 30000,
    discountPrice: 2000,
    deliveryFee: 3000,
    orderItems: [
      {
        orderItemId: 3,
        name: '치킨',
        price: 10000,
        imageUrl:
          'https://images.unsplash.com/photo-1578874557108-9fc2cfb1121e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80',
        quantity: 2,
      },
      {
        orderItemId: 5,
        name: '치킨',
        price: 10000,
        imageUrl:
          'https://images.unsplash.com/photo-1432139555190-58524dae6a55?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1776&q=80',
        quantity: 1,
      },
    ],
  },
];

export const MOCK_COUPON_LIST: CouponType[] = [
  {
    id: 1,
    name: '생일 쿠폰',
    type: 'percent',
    value: 10,
    minimumPrice: 0,
  },
  {
    id: 2,
    name: '40000원 이상 3000원 할인 쿠폰',
    type: 'price',
    value: 3000,
    minimumPrice: 40000,
  },
  {
    id: 3,
    name: '배달비 할인 쿠폰',
    type: 'delivery',
    value: 3000,
    minimumPrice: 0,
  },
  {
    id: 1,
    name: '생일 쿠폰',
    type: 'percent',
    value: 10,
    minimumPrice: 0,
  },
  {
    id: 2,
    name: '40000원 이상 3000원 할인 쿠폰',
    type: 'price',
    value: 3000,
    minimumPrice: 40000,
  },
  {
    id: 3,
    name: '배달비 할인 쿠폰',
    type: 'delivery',
    value: 3000,
    minimumPrice: 0,
  },
];

const cartIdGenerator = {
  value: 0,
  initValue: () => {
    cartIdGenerator.value = 0;
  },
  increase: () => {
    cartIdGenerator.value += 1;
  },
};

let cartServer: CartItemType[] = [];
const orderServer: OrderType[] = MOCK_ORDER_LIST;

const productFetchUrl = getProductPath(SERVER_NAME[0]);
const productFetchUrl2 = getProductPath(SERVER_NAME[1]);
const productFetchUrl3 = getProductPath(SERVER_NAME[2]);

const cartFetchUrl = getCartPath(SERVER_NAME[0]);

const orderFetchUrl = getOrderPath(SERVER_NAME[0]);
const couponFetchUrl = getCouponPath(SERVER_NAME[0]);

const productHandlers = [
  rest.get(productFetchUrl, (req, res, ctx) => {
    return res(
      ctx.set('Content-Type', 'application/json'),
      ctx.status(200),
      ctx.json(MOCK_PRODUCT_LIST)
    );
  }),

  rest.get(productFetchUrl2, (req, res, ctx) => {
    return res(
      ctx.set('Content-Type', 'application/json'),
      ctx.status(200),
      ctx.json(MOCK_PRODUCT_LIST)
    );
  }),

  rest.get(productFetchUrl3, (req, res, ctx) => {
    return res(
      ctx.set('Content-Type', 'application/json'),
      ctx.status(200),
      ctx.json(MOCK_PRODUCT_LIST)
    );
  }),
];

const cartHandlers = [
  rest.get(cartFetchUrl, (req, res, ctx) => {
    return res(ctx.set('Content-Type', 'application/json'), ctx.status(200), ctx.json(cartServer));
  }),

  rest.post(cartFetchUrl, async (req, res, ctx) => {
    const { productId }: { productId: number } = await req.json();

    const product = MOCK_PRODUCT_LIST.find((productItem) => productItem.id === productId);

    if (!product) throw new Error('id에 맞는 product item을 찾을 수 없습니다.');

    cartIdGenerator.increase();
    const cartItem = createCartItem({
      cartId: cartIdGenerator.value,
      product,
    });

    cartServer.push(cartItem);

    return res(ctx.status(201), ctx.set('Location', `/cart-items/${cartIdGenerator.value}`));
  }),

  rest.delete(`${cartFetchUrl}/:cartItemId`, (req, res, ctx) => {
    const { cartItemId } = req.params;

    cartServer = removeCartItem({
      cartId: Number(cartItemId.toString()),
      cart: cartServer,
    });

    return res(ctx.status(204));
  }),

  rest.patch(`${cartFetchUrl}/:cartItemId`, async (req, res, ctx) => {
    const { cartItemId } = req.params;
    const { quantity } = await req.json();

    cartServer = updateCartItemQuantity({
      cartId: Number(cartItemId),
      cart: cartServer,
      quantity,
    });

    return res(ctx.status(200), ctx.body('OK'));
  }),
];

const orderHandlers = [
  rest.get(orderFetchUrl, (req, res, ctx) => {
    return res(ctx.set('Content-Type', 'application/json'), ctx.status(200), ctx.json(orderServer));
  }),

  rest.get(`${orderFetchUrl}/:orderId`, (req, res, ctx) => {
    const { orderId } = req.params;

    const orderItem = orderServer.find((item) => item.id === Number(orderId));

    return res(ctx.set('Content-Type', 'application/json'), ctx.status(200), ctx.json(orderItem));
  }),

  rest.post(orderFetchUrl, async (req, res, ctx) => {
    return res(ctx.status(201));
  }),
];

const couponHandlers = [
  rest.get(couponFetchUrl, (req, res, ctx) => {
    return res(
      ctx.set('Content-Type', 'application/json'),
      ctx.status(200),
      ctx.json(MOCK_COUPON_LIST)
    );
  }),
];

export const handlers = [...productHandlers, ...cartHandlers, ...orderHandlers, ...couponHandlers];
