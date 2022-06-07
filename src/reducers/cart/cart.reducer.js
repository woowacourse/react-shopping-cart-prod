import { actionTypes } from 'reducers/cart/cart.actions';

export const initialState = {
  data: null,
  isLoading: false,
  isError: false,
};

const cartReducer = (state = initialState, action) => {
  if (action.type === actionTypes.GET_CART_REQUEST) {
    return {
      ...state,
      isLoading: true,
      isError: false,
    };
  }

  if (action.type === actionTypes.GET_CART_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      data: action.data,
    };
  }

  if (action.type === actionTypes.GET_CART_ERROR) {
    return {
      ...state,
      isLoading: false,
      isError: true,
    };
  }

  if (action.type === actionTypes.DELETE_CART_ITEM) {
    const filteredData = state.data.filter(({ id }) => id !== action.id);
    return {
      ...state,
      data: filteredData,
    };
  }

  if (action.type === actionTypes.DELETE_CART_ITEMS) {
    const filteredData = state.data.filter(
      ({ id }) => action.idList.indexOf(id) === -1,
    );
    return {
      ...state,
      data: filteredData,
    };
  }

  if (action.type === actionTypes.UPDATE_CART_ITEM_QUANTITY) {
    const { id, quantity } = action.data;
    const updatedData = state.data.map((item) => {
      if (item.id === id) {
        return { ...item, quantity };
      }
      return item;
    });
    return {
      ...state,
      data: updatedData,
    };
  }

  return state;
};

export default cartReducer;
