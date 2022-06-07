export const actionTypes = {
  GET_CART_REQUEST: 'GET_CART_REQUEST',
  GET_CART_SUCCESS: 'GET_CART_SUCCESS',
  GET_CART_ERROR: 'GET_CART_ERROR',
  DELETE_CART_ITEM: 'DELETE_CART_ITEM',
  UPDATE_CART_ITEM_QUANTITY: 'UPDATE_CART_ITEM_QUANTITY',
};

export const getCartRequest = () => ({
  type: actionTypes.GET_CART_REQUEST,
});

export const getCartSuccess = (data) => ({
  type: actionTypes.GET_CART_SUCCESS,
  data,
});

export const getCartError = () => ({
  type: actionTypes.GET_CART_ERROR,
});

export const deleteCartItemAction = (id) => ({
  type: actionTypes.DELETE_CART_ITEM,
  id,
});

export const updateCartItemQuantityAction = (id, quantity) => ({
  type: actionTypes.UPDATE_CART_ITEM_QUANTITY,
  data: { id, quantity },
});
