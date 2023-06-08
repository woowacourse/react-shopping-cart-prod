import { rest } from 'msw';

import { CartItemType, CouponType, OrderItemType } from '@Types/index';

import localStorageHelper from '@Utils/localStorageHelper';

import { SHOPPING_QUANTITY } from '@Constants/index';
import { FETCH_URL } from '@Constants/servers';

import mockCouponData from './mockCouponData.json';
import mockData from './mockData.json';

const DELAY_TIME = 300;

export const handlers = [
  rest.get(FETCH_URL.products, (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockData), ctx.delay(DELAY_TIME));
  }),

  rest.get(FETCH_URL.cartItems, (req, res, ctx) => {
    if (!localStorageHelper.hasKey('cartItems')) localStorageHelper.setInitValue('cartItems', []);
    const cartItems = localStorageHelper.getValue<CartItemType[]>('cartItems');

    return res(ctx.status(200), ctx.json(cartItems), ctx.delay(DELAY_TIME));
  }),

  rest.post(FETCH_URL.cartItems, async (req, res, ctx) => {
    const body = (await req.json()) as { productId: number };
    const productId = body.productId;

    const cartItems = localStorageHelper.getValue<CartItemType[]>('cartItems');

    const newShoppingItem = {
      id: Date.now(),
      quantity: SHOPPING_QUANTITY.DEFAULT,
      product: mockData.find((product) => product.id === productId),
    };
    const newCartItems = [...cartItems, newShoppingItem];

    localStorageHelper.setValue('cartItems', newCartItems);

    return res(ctx.status(201));
  }),

  rest.delete(`${FETCH_URL.cartItems}/:cartItemId`, async (req, res, ctx) => {
    const cartItemId = Number(req.params.cartItemId);

    const cartItems = localStorageHelper.getValue<CartItemType[]>('cartItems');
    const newCartItems = cartItems.filter((cartItem) => cartItem.id !== cartItemId);
    localStorageHelper.setValue('cartItems', newCartItems);

    return res(ctx.status(204));
  }),

  rest.patch(`${FETCH_URL.cartItems}/:cartItemId`, async (req, res, ctx) => {
    const cartItemId = Number(req.params.cartItemId);
    const { quantity } = (await req.json()) as { quantity: number };

    const cartItems = localStorageHelper.getValue<CartItemType[]>('cartItems');
    const newCartItems = cartItems.map((item) => {
      if (item.id !== cartItemId) return item;
      return {
        ...item,
        quantity,
      };
    });

    localStorageHelper.setValue('cartItems', newCartItems);

    return res(ctx.status(200));
  }),

  // 주문 목록 불러오기
  rest.get(FETCH_URL.orders, async (req, res, ctx) => {
    if (!localStorageHelper.hasKey('orderItems')) localStorageHelper.setInitValue('orderItems', []);
    const orderItems = localStorageHelper.getValue<CartItemType[]>('orderItems');

    return res(ctx.status(200), ctx.json(orderItems), ctx.delay(DELAY_TIME));
  }),

  // 주문하기
  rest.post(FETCH_URL.orders, async (req, res, ctx) => {
    const { cartItemIds, price, couponId } = (await req.json()) as {
      cartItemIds: number[];
      price: number;
      couponId: number | null;
    };

    const cartList = localStorageHelper.getValue<CartItemType[]>('cartItems');
    const orderList = localStorageHelper.getValue<OrderItemType[]>('orderItems');
    const myCoupons = localStorageHelper.getValue<CouponType[]>('myCoupons');

    const orderItems = cartList.filter((cartItem) => cartItemIds.includes(cartItem.id));

    const newOrderItem = {
      id: Date.now(),
      orderItems,
      date: new Date(),
      price,
    };

    if (couponId) {
      const newMyCoupons = myCoupons.map((coupon) => {
        if (coupon.id !== couponId) return coupon;
        return { ...coupon, isUsed: true };
      });

      localStorageHelper.setValue('myCoupons', newMyCoupons);
    }

    orderList.push(newOrderItem);

    localStorageHelper.setValue('orderItems', orderList);
    localStorageHelper.setValue(
      'cartItems',
      cartList.filter((cartItem) => !cartItemIds.includes(cartItem.id)),
    );

    return res(ctx.status(201));
  }),

  // 나의 쿠폰 불러오기
  rest.get(FETCH_URL.myCoupon, async (req, res, ctx) => {
    if (!localStorageHelper.hasKey('myCoupons')) localStorageHelper.setInitValue('myCoupons', []);
    const myCoupons = localStorageHelper.getValue<CouponType[]>('myCoupons');

    return res(ctx.status(200), ctx.json(myCoupons), ctx.delay(DELAY_TIME));
  }),

  // 전체 쿠폰 불러오기
  rest.get(FETCH_URL.allCoupon, async (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockCouponData), ctx.delay(DELAY_TIME));
  }),

  // 쿠폰 삭제하기
  rest.delete(`${FETCH_URL.allCoupon}/:couponId`, (req, res, ctx) => {
    const couponId = Number(req.params.couponId);

    const myCoupons = localStorageHelper.getValue<CouponType[]>('myCoupons');
    const newMyCoupons = myCoupons.filter((coupon) => coupon.id !== couponId);

    localStorageHelper.setValue('myCoupons', newMyCoupons);

    return res(ctx.status(204));
  }),

  // 쿠폰 발급
  rest.post(`${FETCH_URL.allCoupon}/:couponId`, (req, res, ctx) => {
    const couponId = Number(req.params.couponId);

    const myCoupons = localStorageHelper.getValue<CouponType[]>('myCoupons');
    const newCoupon = mockCouponData.find((coupon) => coupon.id === couponId);

    if (myCoupons.find((coupon) => coupon.id === couponId)) return res(ctx.status(500));
    if (!newCoupon) return res(ctx.status(500));

    myCoupons.push(newCoupon);
    myCoupons.sort((a, b) => a.id - b.id);

    localStorageHelper.setValue('myCoupons', myCoupons);

    return res(ctx.status(201));
  }),
];
