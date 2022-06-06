import { actionTypes } from 'reducers/cart/cart.actions';

export const initialState = {
  data: null,
  isLoading: false,
  isError: false,
};

const cartReducer = (state = initialState, action) => {
  // GET_CART_REQUEST
  if (action.type === `${actionTypes.GET_CART_REQUEST}_PENDING`) return state;
  if (action.type === `${actionTypes.GET_CART_REQUEST}_FULFILLED`) {
    return {
      ...state,
      isLoading: true,
      isError: false,
    };
  }
  if (action.type === `${actionTypes.GET_CART_REQUEST}_REJECTED`) return state;

  // GET_CART_SUCCESS
  if (action.type === `${actionTypes.GET_CART_SUCCESS}_PENDING`) return state;
  if (action.type === `${actionTypes.GET_CART_SUCCESS}_FULFILLED`) {
    return {
      ...state,
      isLoading: false,
      data: action.data,
    };
  }
  if (action.type === `${actionTypes.GET_CART_SUCCESS}_REJECTED`) return state;

  // GET_CART_ERROR
  if (action.type === `${actionTypes.GET_CART_ERROR}_PENDING`) return state;
  if (action.type === `${actionTypes.GET_CART_ERROR}_FULFILLED`) {
    return {
      ...state,
      isLoading: false,
      isError: true,
    };
  }
  if (action.type === `${actionTypes.GET_CART_ERROR}_REJECTED`) return state;

  // SET_CART
  if (action.type === `${actionTypes.SET_CART}_PENDING`) return state;
  if (action.type === `${actionTypes.SET_CART}_FULFILLED`) {
    return {
      ...state,
      data: action.data,
    };
  }
  if (action.type === `${actionTypes.SET_CART}_REJECTED`) return state;

  return state;
};

export default cartReducer;
