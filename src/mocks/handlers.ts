import { rest } from 'msw';
import { products } from './mockData';
import { CartItem, OrderItem } from '../types';
import { CART_BASE_URL, ORDER_BASE_URL, PRODUCT_BASE_URL } from '../constants/url';
import { getLocalStorage, setDataInLocalStorage } from '../utils/localStorage';
import { CART_ITEM_INDEX } from '../constants';
import { serverUrlObj } from '../constants/url';

const getCart = () => getLocalStorage<CartItem[]>('cart', []);
const setCart = (updatedCart: CartItem[]) => setDataInLocalStorage<CartItem[]>('cart', updatedCart);
const getProduct = (id: number) => products.find((item) => item.id === id);

const getOrder = () => getLocalStorage<OrderItem[]>('order', []);
const setOrder = (updatedOrder: OrderItem[]) =>
  setDataInLocalStorage<OrderItem[]>('order', updatedOrder);

export const handlers = [
  // 상품 조회
  rest.get(`${serverUrlObj['주노']}${PRODUCT_BASE_URL}`, (req, res, ctx) =>
    res(ctx.delay(100), ctx.status(200), ctx.json(products)),
  ),

  // 장바구니 아이템 목록 조회
  rest.get(`${serverUrlObj['주노']}${CART_BASE_URL}`, (req, res, ctx) => {
    return res(ctx.delay(100), ctx.status(200), ctx.json(getCart()));
  }),

  // 장바구니 아이템 추가
  rest.post(`${serverUrlObj['주노']}${CART_BASE_URL}`, async (req, res, ctx) => {
    const { productId } = await req.json();

    if (getProduct(productId) === undefined) {
      return res(ctx.status(404));
    }

    const updatedItem = {
      id: productId,
      quantity: 1,
      product: getProduct(productId)!,
    };

    const updatedCart = [...getCart(), updatedItem];

    setCart(updatedCart);

    return res(ctx.status(201), ctx.json(updatedItem));
  }),

  // 장바구니 아이템 수량 변경
  rest.patch<CartItem>(`${serverUrlObj['주노']}${CART_BASE_URL}/:id`, async (req, res, ctx) => {
    const { productId, quantity } = await req.json();

    const cartItemIndex = getCart().findIndex((item) => item.product.id === productId);

    if (cartItemIndex === -1) {
      return res(ctx.status(404));
    }

    const updatedItem = {
      id: productId,
      quantity,
      product: getProduct(productId)!,
    };

    const updatedCart =
      cartItemIndex >= CART_ITEM_INDEX
        ? getCart().map((item, index) => (index === cartItemIndex ? updatedItem : item))
        : [...getCart(), updatedItem];

    setCart(updatedCart);

    const item = {
      id: productId,
      quantity: quantity,
    };

    return res(ctx.status(200), ctx.json(item));
  }),

  // 장바구니 아이템 삭제
  rest.delete(`${serverUrlObj['주노']}${CART_BASE_URL}/:id`, async (req, res, ctx) => {
    const { productId } = await req.json();

    const updatedCart = getCart().filter((item) => item.id !== productId);

    if (updatedCart === undefined) {
      return res(ctx.status(404));
    }

    setCart(updatedCart);

    return res(ctx.status(204));
  }),

  // 주문 조회
  rest.get(`${serverUrlObj['주노']}${ORDER_BASE_URL}`, (req, res, ctx) => {
    console.log(getOrder());

    return res(ctx.delay(100), ctx.status(200), ctx.json(getOrder()));
  }),

  // 주문하기
  rest.post(`${serverUrlObj['주노']}${ORDER_BASE_URL}`, async (req, res, ctx) => {
    const { cartIds, point } = await req.json();

    if (cartIds.length === 0) {
      return res(ctx.status(400));
    }

    const orderId = Math.random();

    const newOrder: OrderItem = {
      orderId,
      orderProducts: getCart().filter((item) => cartIds.includes(item.id)),
    };

    setOrder([...getOrder(), newOrder]);

    return res(ctx.status(201));
  }),
];
