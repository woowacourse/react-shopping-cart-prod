// src/mocks/handlers.js
import { rest } from 'msw';
import { getLocalStorage, setLocalStorage } from '../utils/localStorage';
import type { CartItem, Order, OrdersResponses, OrderRequest, Point } from '../types/types';
import mockProductList from '../mocks/mockProductListData.json';
import mockMemberList from '../mocks/mockMemberListData.json';
import mockCouponList from '../mocks/mockCouponListData.json';
import { ProductItem } from '../types/types';
import { Coupon } from '../types/types';

const LOCAL_STORAGE_KEY = {
  CART_LIST: 'cartList',
  MEMBER_LIST: 'memberList',
  POINT: 'point',
  ORDER_LIST: 'orderList',
};

export const handlers = [
  rest.get('/products', (_, res, ctx) => {
    return res(ctx.delay(1000), ctx.status(200), ctx.json(mockProductList));
  }),

  rest.get('/cart-items', (_, res, ctx) => {
    const cartItems = getLocalStorage(LOCAL_STORAGE_KEY.CART_LIST, []);

    return res(ctx.delay(100), ctx.status(200), ctx.json(cartItems));
  }),

  rest.post('/cart-items', async (req, res, ctx) => {
    const { productId } = await req.json();

    const cartItems = getLocalStorage(LOCAL_STORAGE_KEY.CART_LIST, []);

    const newItemId = Date.now();

    const newItem = {
      id: newItemId,
      quantity: 1,
      product: mockProductList.find((product) => product.id === productId),
    };

    setLocalStorage(LOCAL_STORAGE_KEY.CART_LIST, [...cartItems, newItem]);
    return res(ctx.delay(100), ctx.status(201), ctx.json(true));
  }),

  rest.delete('/cart-items/:cartItemId', (req, res, ctx) => {
    const { cartItemId } = req.params;
    const cartItems = getLocalStorage<CartItem[]>(LOCAL_STORAGE_KEY.CART_LIST, []);

    setLocalStorage(
      LOCAL_STORAGE_KEY.CART_LIST,
      cartItems.filter((item) => item.id !== Number(cartItemId))
    );
    return res(ctx.delay(100), ctx.status(204));
  }),

  rest.patch('/cart-items/:cartItemId', async (req, res, ctx) => {
    const { cartItemId } = req.params;
    const { quantity } = await req.json();

    const cartItems = getLocalStorage<CartItem[]>(LOCAL_STORAGE_KEY.CART_LIST, []);
    const cartItemIndex = cartItems.findIndex((item) => item.id === Number(cartItemId));
    cartItems[cartItemIndex].quantity = quantity;

    setLocalStorage(LOCAL_STORAGE_KEY.CART_LIST, cartItems);

    return res(ctx.delay(100), ctx.status(200), ctx.json(true));
  }),

  // 멤버 조회 GET
  rest.get('/members', (_, res, ctx) => {
    return res(ctx.delay(1000), ctx.status(200), ctx.json(mockMemberList));
  }),

  // 쿠폰 조회 GET
  rest.get('/coupons', (_, res, ctx) => {
    return res(ctx.delay(1000), ctx.status(200), ctx.json(mockCouponList));
  }),

  // 포인트 조회 GET(로컬 스토리지 반영)
  rest.get('/point', (_, res, ctx) => {
    const point = getLocalStorage(LOCAL_STORAGE_KEY.POINT, { pointHistories: [], totalPoint: 0 });

    return res(ctx.delay(100), ctx.status(200), ctx.json(point));
  }),

  // 주문 목록 GET
  rest.get('/orders', (_, res, ctx) => {
    const orderList = getLocalStorage<OrdersResponses>(LOCAL_STORAGE_KEY.ORDER_LIST, { orderResponses: [] });

    return res(ctx.delay(1000), ctx.status(200), ctx.json(orderList));
  }),

  // 주문 상세 정보 GET
  rest.patch('/orders/:orderId', (req, res, ctx) => {
    const { orderId } = req.params;

    const orderList = getLocalStorage<OrdersResponses>(LOCAL_STORAGE_KEY.ORDER_LIST, { orderResponses: [] });
    const orderItem = orderList.orderResponses.find((order: Order) => order.orderId === Number(orderId));

    return res(ctx.delay(100), ctx.status(200), ctx.json(orderItem));
  }),

  // 주문하기 POST(/orders)
  rest.post('/orders', async (req, res, ctx) => {
    /** orderInfo
      {
      "orderItems": [
        {
          "cartItemId": 0,
          "productId": 0,
          "quantity": 0
        }
      ],
      "orderDiscounts": {
        "couponIds": [
          0
        ],
        "point": 0
      }
    }
     */
    const { orderInfo }: { orderInfo: OrderRequest } = await req.json();
    const uniqueId = Date.now();
    const orderList = getLocalStorage<OrdersResponses>(LOCAL_STORAGE_KEY.ORDER_LIST, { orderResponses: [] });
    const userPoint = getLocalStorage<Point>(LOCAL_STORAGE_KEY.POINT, { pointHistories: [], totalPoint: 0 });
    const currentCouponId = orderInfo.orderDiscounts.couponIds[0];
    const currentCoupon = mockCouponList.find((coupon) => coupon.id === currentCouponId) as Coupon;
    const totalPrice: number[] = [];
    let couponDiscountAmount = 0;

    const newOrderItem = {
      orderId: uniqueId,
      orderItems: orderInfo.orderItems.map((orderItem) => {
        const productItem = mockProductList.find((product) => product.id === orderItem.productId) as ProductItem;
        const paymentPrice =
          currentCoupon.discountAmount === 0
            ? productItem.price - Math.floor(productItem.price * (currentCoupon.discountPercent / 100))
            : productItem.price;

        totalPrice.push(paymentPrice);
        if (currentCoupon.discountPercent === 0) couponDiscountAmount = currentCoupon.discountAmount;

        return {
          id: orderItem.productId,
          productName: productItem.name,
          productPrice: productItem.price,
          productQuantity: orderItem.quantity,
          imageUrl: productItem?.imageUrl,
        };
      }),
      usedCoupons: [currentCoupon],
      usedPoint: orderInfo.orderDiscounts.point,
      paymentPrice:
        totalPrice.reduce((acc, cur) => acc + cur, 0) - orderInfo.orderDiscounts.point - couponDiscountAmount,
      createdAt: new Date(uniqueId + 9 * 60 * 60 * 1000).toISOString().replace('T', ' ').slice(0, -5),
      // 2021-08-05 09:51:31
    };

    const newOrderList: OrdersResponses = {
      orderResponses: [...orderList.orderResponses, newOrderItem],
    };

    setLocalStorage(LOCAL_STORAGE_KEY.CART_LIST, newOrderList);

    setLocalStorage(
      LOCAL_STORAGE_KEY.POINT,
      userPoint.totalPoint - orderInfo.orderDiscounts.point + newOrderItem.paymentPrice * 0.1
    );

    mockCouponList.filter((mockCoupon) => mockCoupon.id !== currentCoupon.id);

    return res(ctx.delay(100), ctx.status(201), ctx.json(true));
  }),

  // 결제 정보 POST(카트, 포인트, 쿠폰 넘겨주면 결제 금액 알려줌)
];
