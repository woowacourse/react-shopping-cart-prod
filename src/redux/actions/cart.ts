import { Cart } from 'types/index';

const cartTypes = {
  CHECK_CART_ITEM: 'CHECK_CART_ITEM',
  UNCHECK_CART_ITEM: 'UNCHECK_CART_ITEM',
  GET_CART_ITEMS: 'GET_CART_ITEMS',
  GET_CART_ITEMS_SUCCESS: 'GET_CART_ITEMS_SUECCESS',
  GET_CART_ITEMS_ERROR: 'GET_CART_ITEMS_ERROR',
  RESET_CART_ITEMS: 'RESET_CART_ITEMS',
} as const;

const cartActions = {
  checkCartItem: (cartItemId: number) => {
    return { type: cartTypes.CHECK_CART_ITEM, payload: cartItemId };
  },
  uncheckCartItem: (cartItemId: number) => {
    return { type: cartTypes.UNCHECK_CART_ITEM, payload: cartItemId };
  },
  getCartItems: () => {
    return { type: cartTypes.GET_CART_ITEMS };
  },
  getCartItemsSuccess: (data: Array<Cart>) => {
    return { type: cartTypes.GET_CART_ITEMS_SUCCESS, payload: data };
  },
  getCartItemsError: () => {
    return { type: cartTypes.GET_CART_ITEMS_ERROR };
  },
  resetCartItems: () => {
    return { type: cartTypes.RESET_CART_ITEMS };
  },
};

export { cartTypes, cartActions };
