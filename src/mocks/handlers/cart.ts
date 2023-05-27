import { rest } from 'msw';

import { API_ENDPOINT, HTTP_STATUS_CODE } from '../../constants/api';
import {
  addCartItem,
  changeCartItemQuantity,
  getCartData,
  removeCartItem,
  setCartData,
} from '../../domain/cart';
import { PostCartItemRequestBody } from '../../types';
import { PatchCartItemRequestBody } from '../../types/api';

const cartHandlers = [
  rest.get(API_ENDPOINT.CART_ITEMS, (req, res, ctx) => {
    const cartList = getCartData();

    return res(ctx.delay(400), ctx.status(HTTP_STATUS_CODE.OK), ctx.json(cartList));
  }),

  rest.post(API_ENDPOINT.CART_ITEMS, async (req, res, ctx) => {
    const { productId } = await req.json<PostCartItemRequestBody>();
    const currentCartData = getCartData();

    const newCartList = addCartItem(currentCartData, productId);

    if (!newCartList) {
      return res(ctx.status(HTTP_STATUS_CODE.NOT_FOUND));
    }

    setCartData(newCartList);

    return res(
      ctx.status(201),
      ctx.set('Location', `${API_ENDPOINT.CART_ITEMS}/${newCartList.at(-1)?.id}`)
    );
  }),

  rest.patch(`${API_ENDPOINT.CART_ITEMS}/:cartItemId`, async (req, res, ctx) => {
    const { cartItemId } = req.params;
    const { quantity } = await req.json<PatchCartItemRequestBody>();
    const currentCartData = getCartData();

    const newCartList = changeCartItemQuantity(currentCartData, Number(cartItemId), quantity);

    if (!newCartList) {
      return res(ctx.status(HTTP_STATUS_CODE.NOT_FOUND));
    }

    setCartData(newCartList);

    return res(ctx.status(HTTP_STATUS_CODE.OK), ctx.json(newCartList));
  }),

  rest.delete(`${API_ENDPOINT.CART_ITEMS}/:cartItemId`, (req, res, ctx) => {
    const { cartItemId } = req.params;
    const currentCartData = getCartData();
    const newCartList = removeCartItem(currentCartData, Number(cartItemId));

    if (currentCartData.length === 0 || !newCartList) {
      return res(ctx.status(HTTP_STATUS_CODE.NOT_FOUND));
    }

    setCartData(newCartList);

    return res(ctx.status(HTTP_STATUS_CODE.NO_CONTENT));
  }),
];

export { cartHandlers };
