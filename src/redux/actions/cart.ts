import { Cart } from 'types/index';

const cartTypes = {
  SET_CART: 'SET_CART_ITEMS',
  RESET_CART: 'RESET_CART_ITEMS',
} as const;

const cartActions = {
  setCart: (data: Array<Cart>) => {
    return { type: cartTypes.SET_CART, payload: data };
  },
  resetCart: () => {
    return { type: cartTypes.RESET_CART };
  },
};

export { cartTypes, cartActions };
