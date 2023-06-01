import { rest } from 'msw';
import mockProducts from './data/products.json';
import Cart from './storage/Cart';
import mockCoupons from './data/coupons.json';

interface PostAddCartRequestBody {
  productId: number;
}

interface PatchUpdateCartRequestBody {
  quantity: number;
}

const PRODUCTS_PATH_NAME = '/products';
const CART_ITEMS_PATH_NAME = '/cart-items';
const ALL_COUPONS_PATH_NAME = '/coupons';

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
