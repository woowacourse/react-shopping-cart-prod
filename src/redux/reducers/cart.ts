import { cartTypes } from 'redux/actions';
import { CartAction, CartStoreState } from 'types/index';

const initialState: CartStoreState = {
  cart: [],
};

const cart = (state = initialState, action: CartAction) => {
  switch (action.type) {
    case cartTypes.SET_CART: {
      return { cart: action.payload };
    }
    case cartTypes.RESET_CART: {
      return initialState;
    }
    default:
      return state;
  }
};

export default cart;
