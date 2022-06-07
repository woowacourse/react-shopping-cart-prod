import { Cart } from 'types/index';

const cartTypes = {
  SET_CART: 'SET_CART_ITEMS',
} as const;

const cartActions = {
  setToCart: (data: Array<Cart>) => {
    return { type: cartTypes.SET_CART, payload: data };
  },
};

export { cartTypes, cartActions };
