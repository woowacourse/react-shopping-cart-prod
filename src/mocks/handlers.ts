import { rest } from 'msw';

import { CartItemType, CouponType, MemberCouponType } from '@Types/index';

import localStorageHelper from '@Utils/localStorageHelper';

import { SHOPPING_QUANTITY } from '@Constants/index';
import { FETCH_URL } from '@Constants/servers';

import mockCoupon from './mockCoupon.json';
import mockData from './mockData.json';

export const handlers = [
  rest.get(FETCH_URL.products, (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockData), ctx.delay(100));
  }),

  rest.get(FETCH_URL.cartItems, (req, res, ctx) => {
    if (!localStorageHelper.hasKey('cartItems')) localStorageHelper.setInitValue('cartItems', []);
    const cartItems = localStorageHelper.getValue<CartItemType[]>('cartItems');

    return res(ctx.status(200), ctx.json(cartItems), ctx.delay(100));
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

  rest.get(FETCH_URL.totalCoupon, (_, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockCoupon), ctx.delay(100));
  }),

  rest.get(FETCH_URL.memberCoupon, (req, res, ctx) => {
    if (!localStorageHelper.hasKey('memberCoupon')) localStorageHelper.setInitValue('memberCoupon', []);
    const memberCoupons = localStorageHelper.getValue<MemberCouponType[]>('memberCoupon');

    return res(ctx.status(200), ctx.json(memberCoupons), ctx.delay(100));
  }),

  rest.post(`${FETCH_URL.totalCoupon}/:couponId`, async (req, res, ctx) => {
    const productId = Number(req.params.couponId);

    const memberCoupons = localStorageHelper.getValue<MemberCouponType[]>('memberCoupon');
    const couponInfo = mockCoupon.find((coupon) => coupon.id === productId);
    const newCoupon = {
      id: Date.now(),
      name: couponInfo?.name,
      discountAmount: couponInfo?.discountAmount,
      description: couponInfo?.description,
      isUsed: false,
    };
    const newCoupons = [...memberCoupons, newCoupon];

    localStorageHelper.setValue('memberCoupon', newCoupons);

    return res(ctx.status(201));
  }),

  rest.delete(`${FETCH_URL.totalCoupon}/:couponId`, async (req, res, ctx) => {
    const couponId = Number(req.params.couponId);

    const coupons = localStorageHelper.getValue<MemberCouponType[]>('memberCoupon');
    const newCoupons = coupons.filter((coupon) => coupon.id !== couponId);
    localStorageHelper.setValue('memberCoupon', newCoupons);

    return res(ctx.status(204));
  }),

  rest.post(FETCH_URL.orderList, async (req, res, ctx) => {
    const body = (await req.json()) as { cartItemIds: number[]; couponId: number; price: number };
    const cartItemIds = body.cartItemIds;
    const couponId = body.couponId;
    const price = body.price;

    const cartItems = localStorageHelper.getValue<MemberCouponType[]>('cartItems');
    const coupons = localStorageHelper.getValue<MemberCouponType[]>('memberCoupon');

    if (couponId !== null) {
      const couponsDeletedUsed = coupons.filter((coupon) => coupon.id !== couponId);
      const couponInfo = coupons.find((coupon) => coupon.id === couponId);
      const updateCoupon = {
        id: couponInfo?.id,
        name: couponInfo?.name,
        discountAmount: couponInfo?.discountAmount,
        description: couponInfo?.description,
        isUsed: true,
      };
      const newCoupons = [...couponsDeletedUsed, updateCoupon];
      localStorageHelper.setValue('memberCoupon', newCoupons);
    }

    const newCartItems = cartItems.filter((item) => !cartItemIds.includes(item.id!));
    localStorageHelper.setValue('cartItems', newCartItems);

    const id = Date.now();
    console.log(cartItemIds, mockData);
    const orderCartItems = cartItems.filter((item) => cartItemIds.includes(item.id!));
    const date = new Date();
    const orderItems = localStorageHelper.getValue<any[]>('orderItems');
    const newOrderItem = [...orderItems, { id, price, date, orderItems: orderCartItems }];
    localStorageHelper.setValue('orderItems', newOrderItem);

    console.log(`${price}원 결제되었습니다.`);

    return res(ctx.status(201));
  }),

  rest.get(FETCH_URL.orderList, (req, res, ctx) => {
    if (!localStorageHelper.hasKey('orderItems')) localStorageHelper.setInitValue('orderItems', []);
    const orderItems = localStorageHelper.getValue<MemberCouponType[]>('orderItems');

    return res(ctx.status(200), ctx.json(orderItems), ctx.delay(100));
  }),
];
