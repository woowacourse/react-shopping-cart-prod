import { actionTypes } from './cart.actions';

const initialState = {
  data: [],
  isLoading: false,
  isError: false,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_CART:
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case actionTypes.GET_CART_SUCCESS:
      return {
        ...state,
        data: action.payload,
        isLoading: false,
      };
    case actionTypes.GET_CART_ERROR:
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      return state;
  }
};

export default cartReducer;
