import { rest } from 'msw';
import { uuid } from '../utils/uuid';
import mockProductsData from './mockProductsData.json';
import mockCouponData from './mockCouponData.json';
import {
  CART_ITEMS_PATH_NAME,
  CART_LIST_KEY,
  COUPONS_PATH_NAME,
  ORDERS_PATH_NAME,
  PRODUCTS_PATH_NAME,
  USERS_COUPON_PATH_NAME,
} from '../constant/server';
import LocalStorage from '../utils/LocalStorage';
import type { CartProduct, Coupon, Order } from '../types/product';

const mockProducts = mockProductsData.products;
const mockCoupons = mockCouponData;

let usersCoupon: Coupon[] = [];
let cartList: CartProduct[] = LocalStorage.getItem(CART_LIST_KEY) || [];
const orders: Order[] = [];

const updateLocalStorage = () => {
  LocalStorage.setItem(CART_LIST_KEY, cartList);
};

interface PostAddCartRequestBody {
  productId: number;
}

interface PatchUpdateCartRequestBody {
  quantity: number;
}

interface PostCouponsMe {
  couponId: number;
}

interface PostOrders {
  cartItems: CartProduct[];
  couponIds: number[];
  deliveryFee: number;
}

export const productHandler = [
  rest.get(PRODUCTS_PATH_NAME, (req, res, ctx) => {
    return res(ctx.delay(1500), ctx.status(200), ctx.json(mockProducts));
  }),
];

export const cartHandler = [
  rest.get(CART_ITEMS_PATH_NAME, (req, res, ctx) => {
    return res(ctx.delay(1000), ctx.status(200), ctx.json(cartList));
  }),
  rest.post<PostAddCartRequestBody>(
    CART_ITEMS_PATH_NAME,
    async (req, res, ctx) => {
      const { productId } = await req.json();
      const product = mockProducts.find((product) => product.id === productId);
      if (!product) {
        return res(ctx.status(500));
      }
      const newCartItem = {
        id: uuid(),
        quantity: 1,
        product,
      };
      cartList.push(newCartItem);
      updateLocalStorage();
      return res(ctx.delay(500), ctx.status(201));
    },
  ),
  rest.patch<PatchUpdateCartRequestBody>(
    `${CART_ITEMS_PATH_NAME}/:cartItemId`,
    async (req, res, ctx) => {
      const { cartItemId } = req.params;
      const { quantity } = await req.json();
      const targetCartItemIndex = cartList.findIndex(
        (cartItem) => cartItem.id === cartItemId,
      );
      cartList[targetCartItemIndex].quantity = quantity;
      updateLocalStorage();
      return res(ctx.status(200));
    },
  ),
  rest.delete(`${CART_ITEMS_PATH_NAME}/:cartItemId`, (req, res, ctx) => {
    const { cartItemId } = req.params;
    const targetCartItemIndex = cartList.findIndex(
      (cartItem) => cartItem.id === cartItemId,
    );
    cartList.splice(targetCartItemIndex, 1);
    updateLocalStorage();
    return res(ctx.delay(500), ctx.status(204));
  }),
];

export const couponHandler = [
  rest.get(COUPONS_PATH_NAME, (req, res, ctx) => {
    const couponList = mockCoupons;

    return res(ctx.delay(1000), ctx.status(200), ctx.json(couponList));
  }),

  rest.get(USERS_COUPON_PATH_NAME, (req, res, ctx) => {
    return res(
      ctx.delay(1000),
      ctx.status(200),
      ctx.json({ coupons: usersCoupon }),
    );
  }),

  rest.post<PostCouponsMe>(USERS_COUPON_PATH_NAME, async (req, res, ctx) => {
    const { couponId } = await req.json();

    if (usersCoupon.some((coupon) => coupon.id === couponId)) {
      return res(ctx.delay(500), ctx.status(400));
    }

    const targetCoupon = mockCoupons.coupons.find(
      (coupon) => coupon.id === couponId,
    );

    usersCoupon.push(targetCoupon as Coupon);
    return res(ctx.delay(500), ctx.status(200));
  }),
];
export const orderHandler = [
  rest.get(ORDERS_PATH_NAME, (req, res, ctx) =>
    res(ctx.status(200), ctx.body(JSON.stringify({ orders: orders }))),
  ),

  rest.get(`${ORDERS_PATH_NAME}/:orderId`, (req, res, ctx) => {
    const { orderId: targetOrderId } = req.params;
    const orderInfo = orders.find(
      (order) => order.id === Number(targetOrderId),
    );

    if (!orderInfo) return res(ctx.status(404));
    return res(ctx.status(200), ctx.body(JSON.stringify(orderInfo)));
  }),

  rest.post<PostOrders>(ORDERS_PATH_NAME, async (req, res, ctx) => {
    const orderInfo: PostOrders = await req.json();

    const orderId = requestPostOrders(orderInfo);

    if (orderId === -1)
      return res(ctx.delay(1200), ctx.status(400, 'Order Failed'));
    return res(
      ctx.delay(1200),
      ctx.status(201),
      ctx.body(JSON.stringify({ orderId })),
    );
  }),
];

const requestPostOrders = ({
  cartItems: userCart,
  couponIds,
  deliveryFee,
}: PostOrders) => {
  const serverCartList = cartList;
  const serverUserCoupons = usersCoupon;
  const serverUserCouponIds = serverUserCoupons.map(({ id }) => id);

  if (!userCart.length) return -1;

  // 쿠폰 검증
  const isValidCouponIds = couponIds.every((id) =>
    serverUserCouponIds.includes(id),
  );
  if (!isValidCouponIds) return -1;

  // 장바구니 검증
  const orderingProducts: CartProduct[] = [];
  userCart.forEach((userCartProduct) => {
    const serverCartProduct = serverCartList.find(
      ({ id }) => id === userCartProduct.id,
    );

    if (!serverCartProduct) return;

    orderingProducts.push(serverCartProduct);
  });

  if (orderingProducts.length !== userCart.length) return -1;

  const originalPrice = orderingProducts.reduce(
    (prev, { quantity, product: { price } }) => prev + quantity * price,
    0,
  );

  const coupon = serverUserCoupons.find(({ id }) => id === couponIds[0]);
  const discountedPrice = (() => {
    if (!coupon) return 0;
    if (coupon.type === 'percent') return originalPrice * (coupon.amount / 100);
    return coupon.amount;
  })();

  const actualPrice = Math.max(originalPrice - discountedPrice, 0);

  // 주문 목록 생성
  const orderInfo: Order = {
    actualPrice,
    deliveryFee,
    originalPrice,
    cartItems: orderingProducts.sort(
      (one, another) => Number(one.id) - Number(another.id),
    ),
    id: orders.length,
  };

  // 장바구니 및 쿠폰 지우기
  const userCartIds = userCart.map((cart) => cart.id);
  cartList = serverCartList.filter((serverCart) => {
    return !userCartIds.includes(serverCart.id);
  });

  if (coupon) {
    usersCoupon = usersCoupon.filter((couponId) => {
      return !couponIds.includes(couponId.id);
    });
  }

  orders.push(orderInfo);

  return orderInfo.id;
};
