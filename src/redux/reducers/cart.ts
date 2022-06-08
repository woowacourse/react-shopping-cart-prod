import { CartAction, CartStoreState } from 'types/index';
import { Cart } from '../../types/cart';
import { cartTypes } from 'redux/actions';

const initialState: CartStoreState = {
  cart: [],
};

const cart = (state = initialState, action: CartAction) => {
  switch (action.type) {
    case cartTypes.SET_CART_ITEM_LIST: {
      const { payload } = action;

      return { cart: payload };
    }
    default:
      return state;
  }
};

export default cart;
