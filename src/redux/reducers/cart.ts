import { cartTypes } from 'redux/actions';

import CONDITION from 'constants/condition';
import { CartAction, CartStoreState } from 'types/index';

const initialState: CartStoreState = {
  condition: CONDITION.NONE,
  cartItems: [],
  checkedCartItems: [],
};

const cart = (state = initialState, action: CartAction) => {
  switch (action.type) {
    case cartTypes.GET_CART_ITEMS: {
      return { ...state, condition: CONDITION.LOADING };
    }

    case cartTypes.GET_CART_ITEMS_SUCCESS: {
      return {
        ...state,
        condition: CONDITION.COMPLETE,
        cartItems: action.payload,
      };
    }

    case cartTypes.GET_CART_ITEMS_ERROR: {
      return {
        ...state,
        condition: CONDITION.ERROR,
        cartItems: [],
      };
    }

    case cartTypes.RESET_CART_ITEMS: {
      return {
        ...state,
        cartItems: [],
      };
    }

    case cartTypes.CHECK_CART_ITEM: {
      const newCheckedCartItems = [...state.checkedCartItems, action.payload];

      return {
        ...state,
        checkedCartItems: newCheckedCartItems,
      };
    }

    case cartTypes.UNCHECK_CART_ITEM: {
      const newCheckedCartItems = state.checkedCartItems.filter(
        (cartItemId) => cartItemId !== action.payload
      );

      return {
        ...state,
        checkedCartItems: newCheckedCartItems,
      };
    }

    default:
      return state;
  }
};

export default cart;
