import { Cart, Product } from 'types/index';

const cartTypes = {
  ADD_PRODUCT: 'ADD_PRODUCT_TO_CART',
  DELETE_PRODUCT: 'DELETE_PRODUCT_TO_CART',
  DELETE_CHECKED_PRODUCT: 'DELETE_CHECKED_PRODUCT_TO_CART',
  TOGGLE_CHECK_ONE: 'TOGGLE_CHECK_A_PRODUCT',
  TOGGLE_CHECK_ALL: 'TOGGLE_CHECK_ALL_PRODUCT',
  CHANGE_PRODUCT_STOCK: 'CHANGE_PRODUCT_STOCK',
  SET_CART_ITEM_LIST: 'SET_CART_ITEM_LIST',
  RESET: 'RESET',
} as const;

const cartActions = {
  setCartItemList: (data: Cart[]) => {
    return { type: cartTypes.SET_CART_ITEM_LIST, payload: data };
  },
  reset: () => {
    return { type: cartTypes.RESET };
  },
};

export { cartTypes, cartActions };
