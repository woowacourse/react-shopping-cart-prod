import { Action, CartItem } from 'types';
import { TYPES } from 'redux/actions';

const initialState: {
  isLoading: boolean;
  error: any;
  cart: CartItem[];
} = {
  isLoading: false,
  error: null,
  cart: [],
};

const cart = (state = initialState, action: Action) => {
  switch (action.type) {
    case `${TYPES.ADD_ITEM_TO_CART}_PENDING`: {
      return { ...state, isLoading: true, error: null };
    }
    case `${TYPES.ADD_ITEM_TO_CART}_FULFILLED`: {
      return { ...state, isLoading: false };
    }
    case `${TYPES.ADD_ITEM_TO_CART}_REJECTED`: {
      if ([401, 403].includes(action.payload.response.status)) {
        localStorage.removeItem('userId');
        localStorage.removeItem('accessToken');
      }

      return { ...state, isLoading: false, error: action.payload.data };
    }
    case `${TYPES.GET_CART}_PENDING`: {
      return { ...state, isLoading: true, error: null };
    }
    case `${TYPES.GET_CART}_FULFILLED`: {
      return { ...state, isLoading: false, cart: action.payload.data };
    }
    case `${TYPES.GET_CART}_REJECTED`: {
      if ([401, 403].includes(action.payload.response.status)) {
        localStorage.removeItem('userId');
        localStorage.removeItem('accessToken');
      }

      return { ...state, isLoading: false, error: action.payload.data };
    }
    case `${TYPES.UPDATE_QUANTITY}_PENDING`: {
      return { ...state, error: null };
    }
    case `${TYPES.UPDATE_QUANTITY}_FULFILLED`: {
      return { ...state };
    }
    case `${TYPES.UPDATE_QUANTITY}_REJECTED`: {
      if ([401, 403].includes(action.payload.response.status)) {
        localStorage.removeItem('userId');
        localStorage.removeItem('accessToken');
      }

      return { ...state, error: action.payload.data };
    }
    case `${TYPES.REMOVE_CART_ITEM}_PENDING`: {
      return { ...state, isLoading: true, error: null };
    }
    case `${TYPES.REMOVE_CART_ITEM}_FULFILLED`: {
      return { ...state, isLoading: false };
    }
    case `${TYPES.REMOVE_CART_ITEM}_REJECTED`: {
      if ([401, 403].includes(action.payload.response.status)) {
        localStorage.removeItem('userId');
        localStorage.removeItem('accessToken');
      }

      return { ...state, isLoading: true, error: action.payload.data };
    }
    default:
      return state;
  }
};

export default cart;
export { initialState };
