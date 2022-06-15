import { generateAsyncActionGroup } from 'redux/utils';
import { CartItem } from 'types/domain';

export const CART_LIST_ACTION_TYPE = {
  GET_CART_LIST: 'cart/GET_CART_LIST',
  PATCH_CART_ITEM: 'cart/PATCH_CART_ITEM',
  POST_CART_ITEM: 'cart/POST_CART_ITEM',
  DELETE_SELECTED_CART_ITEM: 'cart/DELETE_SELECTED_CART_ITEM',
  DELETE_ALL_CART_ITEM: 'cart/DELETE_ALL_CART_ITEM',
  CLEAR_CART_LIST: 'cart/CLEAR_CART_LIST',
};

const getCartList = generateAsyncActionGroup<CartItem[]>(CART_LIST_ACTION_TYPE.GET_CART_LIST);
const patchCartItem = generateAsyncActionGroup<CartItem>(CART_LIST_ACTION_TYPE.PATCH_CART_ITEM);
const postCartItem = generateAsyncActionGroup<CartItem>(CART_LIST_ACTION_TYPE.POST_CART_ITEM);
const deleteSelectedCartItem = generateAsyncActionGroup<{ id: number }[]>(
  CART_LIST_ACTION_TYPE.DELETE_SELECTED_CART_ITEM
);
const deleteAllCartItem = generateAsyncActionGroup<null>(
  CART_LIST_ACTION_TYPE.DELETE_ALL_CART_ITEM
);

export const clearCartList = () => {
  return {
    type: CART_LIST_ACTION_TYPE.CLEAR_CART_LIST,
  };
};

export const cartListAction = {
  getCartList,
  patchCartItem,
  postCartItem,
  deleteSelectedCartItem,
  deleteAllCartItem,
};

export type CartListAction = ReturnType<
  typeof cartListAction[keyof typeof cartListAction][keyof typeof cartListAction[keyof typeof cartListAction]]
>;
