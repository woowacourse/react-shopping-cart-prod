import { rest } from 'msw';

import { API_ENDPOINT, HTTP_STATUS_CODE } from '../../constants/api';
import {
  addCartItem,
  changeCartItemQuantity,
  getCartData,
  removeCartItem,
  setCartData,
} from '../../domain/cart';
import { getMemberData } from '../../domain/member';
import { PatchCartItemRequestBody, PostCartItemRequestBody } from '../../types/api';
import { CartCostsData } from '../../types/cart';
import {
  getDiscountedTotalItemPrice,
  getShippingFee,
  getTotalItemDiscountAmount,
  getTotalItemPrice,
  getTotalMemberDiscountAmount,
} from '../../utils/costs';

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
      ctx.status(HTTP_STATUS_CODE.CREATED),
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

  rest.get(API_ENDPOINT.CART_COSTS, (req, res, ctx) => {
    const cartList = getCartData();
    const memberInformation = getMemberData();

    const totalItemDiscountAmount = getTotalItemDiscountAmount(cartList);
    const totalMemberDiscountAmount = getTotalMemberDiscountAmount(cartList, memberInformation);
    const totalItemPrice = getTotalItemPrice(cartList);
    const discountedTotalItemPrice = getDiscountedTotalItemPrice(
      totalItemDiscountAmount,
      totalMemberDiscountAmount,
      totalItemPrice
    );
    const shippingFee = getShippingFee(discountedTotalItemPrice);

    const order: CartCostsData = {
      totalItemDiscountAmount,
      totalMemberDiscountAmount,
      totalItemPrice,
      discountedTotalItemPrice,
      shippingFee,
      totalPrice: discountedTotalItemPrice + shippingFee,
    };

    return res(ctx.status(200), ctx.json(order));
  }),
];

export { cartHandlers };
