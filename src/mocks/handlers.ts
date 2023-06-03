import { rest } from 'msw';
import mockProducts from './data/products.json';
import Cart from './storage/Cart';
import mockCoupons from './data/coupons.json';
import {
  ALL_COUPONS_PATH_NAME,
  PRODUCTS_PATH_NAME,
  CART_ITEMS_PATH_NAME,
  USER_COUPONS_PATH_NAME,
} from '../constant';
import UserCoupon from './storage/UserCoupon';

interface PostAddCartRequestBody {
  productId: number;
}

interface PatchUpdateCartRequestBody {
  quantity: number;
}

interface PostDownloadCouponRequestBody {
  couponId: number;
}

export const productHandler = [
  rest.get(PRODUCTS_PATH_NAME, (req, res, ctx) => {
    return res(ctx.delay(3000), ctx.status(200), ctx.json(mockProducts));
  }),
];

export const cartHandler = [
  rest.get(CART_ITEMS_PATH_NAME, (req, res, ctx) => {
    const cartList = Cart.getList();
    return res(ctx.status(200), ctx.json(cartList));
  }),

  rest.post<PostAddCartRequestBody>(CART_ITEMS_PATH_NAME, async (req, res, ctx) => {
    const { productId } = await req.json();
    const product = mockProducts.find(({ id }) => id === productId);

    if (!product) {
      return res(ctx.status(500));
    }

    Cart.setItem(productId, 1);

    return res(ctx.status(201), ctx.body(JSON.stringify({ cartItemId: productId.toString() })));
  }),

  rest.patch<PatchUpdateCartRequestBody>(
    `${CART_ITEMS_PATH_NAME}/:cartItemId`,
    async (req, res, ctx) => {
      const { cartItemId } = req.params;
      const { quantity } = await req.json();

      Cart.setItem(Number(cartItemId), quantity);

      return res(ctx.status(200));
    }
  ),

  rest.delete(`${CART_ITEMS_PATH_NAME}/:cartItemId`, (req, res, ctx) => {
    const { cartItemId } = req.params;

    Cart.setItem(Number(cartItemId), 0);

    return res(ctx.status(204));
  }),
];

export const couponHandler = [
  rest.get(ALL_COUPONS_PATH_NAME, (req, res, ctx) =>
    res(ctx.delay(1000), ctx.status(200), ctx.json(mockCoupons))
  ),

  rest.post<PostDownloadCouponRequestBody>(USER_COUPONS_PATH_NAME, async (req, res, ctx) => {
    const { couponId } = await req.json();

    if (UserCoupon.add(couponId)) return res(ctx.status(200));

    return res(ctx.status(400));
  }),

  rest.get(USER_COUPONS_PATH_NAME, (req, res, ctx) => {
    const data = UserCoupon.getAll();
    return res(ctx.delay(2000), ctx.status(200), ctx.body(JSON.stringify(data)));
  }),
];
