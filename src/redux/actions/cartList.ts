import { generateAsyncActionGroup } from 'redux/utils';
import { CartItem } from 'types/domain';

export const CART_LIST_ACTION_TYPE = {
  GET_CART_LIST: 'cart/GET_CART_LIST',
  PUT_CART_ITEM: 'cart/PUT_CART_ITEM',
  POST_CART_ITEM: 'cart/POST_CART_ITEM',
  DELETE_CART_ITEM: 'cart/DELETE_CART_ITEM',
};

const getCartList = generateAsyncActionGroup<CartItem[]>(CART_LIST_ACTION_TYPE.GET_CART_LIST);
const putCartItem = generateAsyncActionGroup<CartItem>(CART_LIST_ACTION_TYPE.PUT_CART_ITEM);
const postCartItem = generateAsyncActionGroup<CartItem>(CART_LIST_ACTION_TYPE.POST_CART_ITEM);
const deleteCartItem = generateAsyncActionGroup<null>(CART_LIST_ACTION_TYPE.DELETE_CART_ITEM);

export const cartListAction = {
  getCartList,
  putCartItem,
  postCartItem,
  deleteCartItem,
};

export type CartListAction = ReturnType<
  typeof cartListAction[keyof typeof cartListAction][keyof typeof cartListAction[keyof typeof cartListAction]]
>;
