// src/mocks/handlers.js
import { rest } from 'msw';
import { getLocalStorage, setLocalStorage } from '../utils/localStorage';
import type { Order, OrdersResponses, OrderRequest, Point, CartItemResponses } from '../types/types';
import mockProductList from '../mocks/mockProductListData.json';
import mockMemberList from '../mocks/mockMemberListData.json';
import mockCouponList from '../mocks/mockCouponListData.json';
import { ProductItem } from '../types/types';

let couponList = [...mockCouponList];
const LOCAL_STORAGE_KEY = {
  CART_LIST: 'mockCartList',
  MEMBER_LIST: 'mockMemberList',
  POINT: 'mockPoint',
  ORDER_LIST: 'mockOrder',
};

export const handlers = [
  rest.get('/products', (_, res, ctx) => {
    return res(ctx.delay(1000), ctx.status(200), ctx.json(mockProductList));
  }),

  rest.get('/cart-items', (_, res, ctx) => {
    const cartItems = getLocalStorage<CartItemResponses>(LOCAL_STORAGE_KEY.CART_LIST, { cartItems: [], totalPrice: 0 });

    return res(ctx.delay(100), ctx.status(200), ctx.json(cartItems));
  }),

  rest.post('/cart-items', async (req, res, ctx) => {
    const { productId } = await req.json();

    const cartItems = getLocalStorage<CartItemResponses>(LOCAL_STORAGE_KEY.CART_LIST, { cartItems: [], totalPrice: 0 });

    const newItemId = Date.now();

    const newItem = {
      id: newItemId,
      quantity: 1,
      product: mockProductList.find((product) => product.id === productId),
    };

    setLocalStorage(LOCAL_STORAGE_KEY.CART_LIST, { cartItems: [...cartItems.cartItems, newItem], totalPrice: 0 });
    return res(ctx.delay(100), ctx.status(201), ctx.json(true));
  }),

  rest.delete('/cart-items/:cartItemId', (req, res, ctx) => {
    const { cartItemId } = req.params;
    const cartItems = getLocalStorage<CartItemResponses>(LOCAL_STORAGE_KEY.CART_LIST, { cartItems: [], totalPrice: 0 });

    setLocalStorage(LOCAL_STORAGE_KEY.CART_LIST, {
      cartItems: cartItems.cartItems.filter((item) => item.id !== Number(cartItemId)),
      totalPrice: 0,
    });
    return res(ctx.delay(100), ctx.status(204));
  }),

  rest.patch('/cart-items/:cartItemId', async (req, res, ctx) => {
    const { cartItemId } = req.params;
    const { quantity } = await req.json();

    const cartItems = getLocalStorage<CartItemResponses>(LOCAL_STORAGE_KEY.CART_LIST, { cartItems: [], totalPrice: 0 });

    const cartItemIndex = cartItems.cartItems.findIndex((item) => item.id === Number(cartItemId));
    cartItems.cartItems[cartItemIndex].quantity = quantity;

    setLocalStorage(LOCAL_STORAGE_KEY.CART_LIST, cartItems);

    return res(ctx.delay(100), ctx.status(200), ctx.json(true));
  }),

  // 멤버 조회 GET
  rest.get('/members', (_, res, ctx) => {
    return res(ctx.delay(1000), ctx.status(200), ctx.json(mockMemberList));
  }),

  // 쿠폰 조회 GET
  rest.get('/coupons', (_, res, ctx) => {
    return res(ctx.delay(1000), ctx.status(200), ctx.json(couponList));
  }),

  // 포인트 조회 GET(로컬 스토리지 반영)
  rest.get('/point', (_, res, ctx) => {
    const point = getLocalStorage(LOCAL_STORAGE_KEY.POINT, { pointHistories: [], totalPoint: 1000 });

    setLocalStorage(LOCAL_STORAGE_KEY.POINT, point);
    return res(ctx.delay(100), ctx.status(200), ctx.json(point));
  }),

  // 주문 목록 GET
  rest.get('/orders', (_, res, ctx) => {
    const orderList = getLocalStorage<OrdersResponses>(LOCAL_STORAGE_KEY.ORDER_LIST, { orderResponses: [] });

    return res(ctx.delay(1000), ctx.status(200), ctx.json(orderList));
  }),

  // 주문 상세 정보 GET
  rest.get('/orders/:orderId', (req, res, ctx) => {
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

    const orderInfo = (await req.json()) as OrderRequest;
    const uniqueId = Date.now();
    const orderList = getLocalStorage<OrdersResponses>(LOCAL_STORAGE_KEY.ORDER_LIST, { orderResponses: [] });
    const userPoint = getLocalStorage<Point>(LOCAL_STORAGE_KEY.POINT, { pointHistories: [], totalPoint: 0 });
    const totalPrice: number[] = [];
    const orderItemId: number[] = [];
    const currentCouponId =
      orderInfo.orderDiscounts.couponIds.length === 0 ? -1 : orderInfo.orderDiscounts.couponIds[0];
    const currentCoupon = couponList.find((coupon) => coupon.id === currentCouponId);
    let couponDiscountAmount = 0;

    const newOrderItem = {
      orderId: uniqueId,
      orderItems: orderInfo.orderItems.map((orderItem) => {
        const productItem = mockProductList.find((product) => product.id === orderItem.productId) as ProductItem;
        const paymentPrice =
          currentCoupon?.discountAmount === 0
            ? productItem.price - Math.floor(productItem.price * (currentCoupon.discountPercent / 100))
            : productItem.price;

        totalPrice.push(paymentPrice);
        orderItemId.push(orderItem.cartItemId);
        if (currentCoupon?.discountPercent === 0) couponDiscountAmount = currentCoupon.discountAmount;

        return {
          id: orderItem.productId,
          productName: productItem.name,
          productPrice: productItem.price,
          productQuantity: orderItem.quantity,
          imageUrl: productItem?.imageUrl,
        };
      }),
      usedCoupons: currentCoupon ? [currentCoupon] : [],
      usedPoint: orderInfo.orderDiscounts.point,
      paymentPrice:
        totalPrice.reduce((acc, cur) => acc + cur, 0) - orderInfo.orderDiscounts.point - couponDiscountAmount,
      createAt: new Date(uniqueId + 9 * 60 * 60 * 1000).toISOString().replace('T', ' ').slice(0, -5),
    };

    const newOrderList: OrdersResponses = {
      orderResponses: [...orderList.orderResponses, newOrderItem],
    };

    setLocalStorage(LOCAL_STORAGE_KEY.ORDER_LIST, newOrderList);

    setLocalStorage(LOCAL_STORAGE_KEY.POINT, {
      totalPoint: userPoint.totalPoint - orderInfo.orderDiscounts.point + Math.floor(newOrderItem.paymentPrice * 0.01),
      pointHistories: [],
    });

    const cartList = getLocalStorage<CartItemResponses>(LOCAL_STORAGE_KEY.CART_LIST, { cartItems: [], totalPrice: 0 });
    const newCartList = cartList.cartItems.filter((items) => !orderItemId.includes(items.id));

    setLocalStorage(LOCAL_STORAGE_KEY.CART_LIST, {
      cartItems: newCartList,
      totalPrice: 0,
    });

    if (currentCoupon) couponList = couponList.filter((mockCoupon) => mockCoupon.id !== currentCoupon.id);

    return res(ctx.delay(100), ctx.status(201), ctx.json(true));
  }),
];
