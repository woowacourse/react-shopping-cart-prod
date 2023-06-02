import { rest } from 'msw';
import { CartProduct } from '../types/product';
import { uuid } from '../utils/uuid';
import mockData from './mockData.json';
import { CART_LIST_KEY } from '../constant';
import LocalStorage from '../utils/LocalStorage';

const mockProducts = mockData.products;
const cartList: CartProduct[] = LocalStorage.getItem(CART_LIST_KEY) || [];

const updateLocalStorage = () => {
  LocalStorage.setItem(CART_LIST_KEY, cartList);
};

interface PostAddCartRequestBody {
  productId: number;
}

interface PatchUpdateCartRequestBody {
  quantity: number;
}

const PRODUCTS_PATH_NAME = `/products`;
const CART_ITEMS_PATH_NAME = `/cart-items`;
const COUPON_PATH_NAME = `/coupons`;

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

export const couponHander = [
  rest.get(COUPON_PATH_NAME, (req, res, ctx) => {
    const couponList = {
      coupons: [
        {
          id: 1,
          type: 'percent',
          amount: 10,
          name: '신규 회원 환영 쿠폰',
        },
        {
          id: 2,
          type: 'amount',
          amount: 1000,
          name: '천원 할인 쿠폰',
        },
        {
          id: 2,
          type: 'amount',
          amount: 1000,
          name: '천원 할인 쿠폰',
        },
        {
          id: 2,
          type: 'amount',
          amount: 1000,
          name: '천원 할인 쿠폰',
        },
        {
          id: 2,
          type: 'amount',
          amount: 1000,
          name: '천원 할인 쿠폰',
        },
        {
          id: 2,
          type: 'amount',
          amount: 1000,
          name: '천원 할인 쿠폰',
        },
      ],
    };

    return res(ctx.delay(1000), ctx.status(200), ctx.json(couponList));
  }),
];
