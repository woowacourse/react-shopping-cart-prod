/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { rest } from 'msw';
import {
  CartItemType,
  CouponType,
  IssuableCouponType,
  OrderDetailType,
  ProductType,
} from '../types/types';
import productsData from './mockData.json';

const products = productsData as ProductType[];

let cartList = [] as CartItemType[];

const couponList: IssuableCouponType[] = [
  {
    issuable: true,
    id: 0,
    name: '썸머특집 20% 할인쿠폰',
    discountType: 'percentage',
    discountRate: 0.2,
    discountAmount: 0,
    minimumPrice: 30000,
  },
  {
    issuable: true,
    id: 1,
    name: '오픈기념 5,000원 할인쿠폰',
    discountType: 'deduction',
    discountRate: 0,
    discountAmount: 5000,
    minimumPrice: 10000,
  },
];

const myCouponList: CouponType[] = [];

const orderList: OrderDetailType[] = [];

const issueWhenOrderCoupon: CouponType = {
  id: Date.now(),
  name: '[주문 시 발급] 회원 감사 10% 할인 쿠폰',
  discountType: 'percentage',
  discountRate: 0.1,
  discountAmount: 0,
  minimumPrice: 3000,
};

export const handlers = [
  rest.get('/products', async (_, res, ctx) => {
    await delay(200);

    return res(ctx.status(200), ctx.json(products));
  }),

  rest.post('/products', async (req, res, ctx) => {
    const { product } = await req.json<{ product: ProductType }>();
    products.push(product);

    return res(ctx.status(200), ctx.text('Add Product Success'));
  }),

  rest.get('/cart-items', async (_, res, ctx) => {
    await delay(200);

    return res(ctx.status(200), ctx.json(cartList));
  }),

  rest.post('/cart-items', async (req, res, ctx) => {
    const { productId } = await req.json<{ productId: number }>();
    const foundProduct = products.find((product) => product.id === productId);
    if (foundProduct) {
      const newCartItem = {
        id: Date.now(),
        quantity: 1,
        product: foundProduct,
      };
      cartList.push(newCartItem);

      return res(ctx.status(201), ctx.text('Add Cart Item Success'));
    }
    return res(ctx.status(400, 'Product Does Not Found'));
  }),

  rest.patch('/cart-items/:cartItemId', async (req, res, ctx) => {
    const { cartItemId } = req.params;
    const { quantity } = await req.json<{ quantity: number }>();
    const foundCartItemIndex = cartList.findIndex((cart) => cart.id === Number(cartItemId));
    if (quantity && foundCartItemIndex !== -1) {
      const newCartList = cartList.map((cartItem, index) =>
        index === foundCartItemIndex ? { ...cartItem, quantity } : cartItem,
      );
      cartList = newCartList;
      return res(ctx.status(200), ctx.text('Cart Item Quantity Change Success'));
    }
    return res(ctx.status(400, 'CartItem Does Not Found'));
  }),

  rest.delete('/cart-items/:cartItemId', async (req, res, ctx) => {
    const { cartItemId } = req.params;
    const foundCartItemIndex = cartList.findIndex((cart) => cart.id === Number(cartItemId));
    if (foundCartItemIndex !== -1) {
      cartList.splice(foundCartItemIndex, 1);
      return res(ctx.status(200), ctx.text('Cart Item Delete Success'));
    }
    return res(ctx.status(400, 'CartItem Does Not Found'));
  }),
  rest.get('/coupons', async (_, res, ctx) => {
    await delay(200);

    return res(ctx.status(200), ctx.json(couponList));
  }),
  rest.get('/user/coupons', async (_, res, ctx) => {
    await delay(200);

    return res(ctx.status(200), ctx.json(myCouponList));
  }),
  rest.post('/user/coupons', async (req, res, ctx) => {
    const { couponId } = await req.json<{ couponId: number }>();
    const findCoupon = couponList.find((coupon) => coupon.id === couponId);

    if (findCoupon) {
      myCouponList.push(findCoupon);

      couponList[couponList.findIndex((coupon) => coupon.id === couponId)].issuable = false;

      return res(ctx.status(201), ctx.text('Coupon Add Success'));
    }

    return res(ctx.status(400, 'Coupon Does Not Found'));
  }),
  rest.post('/orders', async (req, res, ctx) => {
    const { selectCartIds, couponId } = await req.json<{
      selectCartIds: number[];
      couponId: number;
    }>();

    const findCarts = selectCartIds.map((id) => cartList.find((cart) => cart.id === id));

    const totalMoney = findCarts.reduce(
      (prev, curr) => (curr ? prev + curr.product.price * curr.quantity : prev),
      0,
    );

    const coupon = couponList.find((coupon) => coupon.id === couponId);

    let discount: number;
    if (coupon) {
      if (coupon.discountType === 'deduction') {
        discount = coupon.discountAmount;
      } else {
        discount = totalMoney * coupon.discountRate;
      }

      const newOrderId = Number(new Date());

      orderList.push({
        id: newOrderId,
        orderProducts: findCarts.map((cart) => ({
          product: cart!.product,
          quantity: cart!.quantity,
        })),
        confirmState: false,
        originalPrice: totalMoney,
        discountPrice: discount,
        coupon,
      });
      return res(
        ctx.status(201),
        ctx.text('Order Add Success'),
        ctx.set('Location', `/orders/${newOrderId}`),
      );
    }

    orderList.push({
      id: Number(new Date()),
      orderProducts: findCarts.map((cart) => ({
        product: cart!.product,
        quantity: cart!.quantity,
      })),
      confirmState: false,
      originalPrice: totalMoney,
      discountPrice: 0,
    });
    return res(ctx.status(201), ctx.text('Order Add Success'));
  }),
  rest.get('/orders', async (_, res, ctx) => {
    await delay(200);

    return res(ctx.status(200), ctx.json(orderList));
  }),
  rest.get('/orders/:orderId', async (req, res, ctx) => {
    const { orderId } = req.params;
    const foundOrderById = orderList.find((order) => order.id === Number(orderId));
    if (foundOrderById) {
      return res(ctx.status(200), ctx.json(foundOrderById));
    }

    return res(ctx.status(400), ctx.text('Order Not Found'));
  }),
  rest.patch('/orders/:orderId/confirm', async (req, res, ctx) => {
    const { orderId } = req.params;
    const foundOrderIndexById = orderList.findIndex((order) => order.id === Number(orderId));
    if (foundOrderIndexById !== -1) {
      orderList[foundOrderIndexById].confirmState = true;
      myCouponList.push(issueWhenOrderCoupon);

      return res(ctx.status(201), ctx.json({ coupon: issueWhenOrderCoupon }));
    }
    return res(ctx.status(400), ctx.text('Order Not Found'));
  }),
  rest.delete('/orders/:orderId', async (req, res, ctx) => {
    const { orderId } = req.params;
    const foundOrderIndexById = orderList.findIndex((order) => order.id === Number(orderId));

    if (foundOrderIndexById !== -1) {
      orderList.splice(foundOrderIndexById, 1);

      return res(ctx.status(204), ctx.text('Content Not Founc'));
    }
    return res(ctx.status(400), ctx.text('Order Not Found'));
  }),
];

async function delay(timeout: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}
