import { rest } from 'msw';
import mockProducts from './data/products.json';
import mockCart from './data/cart.json';

interface PostAddCartRequestBody {
  productId: number;
}

interface PatchUpdateCartRequestBody {
  quantity: number;
}

const PRODUCTS_PATH_NAME = `*/products`;
const CART_ITEMS_PATH_NAME = `*/cart-items`;
const ALL_COUPONS_PATH_NAME = '*/coupons';
const COUPON_DOWNLOAD_PATH_NAME = '*/members/coupon';

const storybookHandlers = [
  rest.get(PRODUCTS_PATH_NAME, (req, res, ctx) => res(ctx.status(200), ctx.json(mockProducts))),

  rest.get(CART_ITEMS_PATH_NAME, (req, res, ctx) => res(ctx.status(200), ctx.json(mockCart))),

  rest.post<PostAddCartRequestBody>(CART_ITEMS_PATH_NAME, async (req, res, ctx) => {
    const { productId } = await req.json();
    // 원래 cartItemId와 productId는 다르지만 편의성을 위해 여기서는 같게 설정함
    return res(ctx.status(201), ctx.body(JSON.stringify({ cartItemId: productId })));
  }),

  rest.patch<PatchUpdateCartRequestBody>(`${CART_ITEMS_PATH_NAME}/:cartItemId`, (req, res, ctx) =>
    res(ctx.status(200))
  ),

  rest.delete(`${CART_ITEMS_PATH_NAME}/:cartItemId`, (req, res, ctx) => res(ctx.status(204))),
];

export default storybookHandlers;
