import { CARTS_ACTIONS } from '../types';

const getList = {
  pending: () => ({
    type: CARTS_ACTIONS.UPDATE_CART_LIST_PENDING,
  }),

  success: (payload) => ({
    type: CARTS_ACTIONS.UPDATE_CART_LIST_SUCCESS,
    payload,
  }),

  error: (payload) => ({
    type: CARTS_ACTIONS.UPDATE_CART_LIST_ERROR,
    payload,
  }),
};

const addList = {
  pending: () => ({
    type: CARTS_ACTIONS.ADD_CART_LIST_PENDING,
  }),

  success: (payload) => ({
    type: CARTS_ACTIONS.ADD_CART_LIST_SUCCESS,
    payload,
  }),

  error: (payload) => ({
    type: CARTS_ACTIONS.ADD_CART_LIST_ERROR,
    payload,
  }),
};

const updateItemSuccess = (payload) => ({
  type: CARTS_ACTIONS.UPDATE_CART_ITEM_SUCCESS,
  payload,
});

const updateItemCheck = (id, isChecked) => ({
  type: CARTS_ACTIONS.UPDATE_CART_ITEM_CHECKED,
  payload: { id, isChecked },
});

const updateItemAllCheck = (isChecked) => ({
  type: CARTS_ACTIONS.UPDATE_CART_ITEM_ALL_CHECKED,
  payload: { isChecked },
});

const removeItemSuccess = (id) => ({
  type: CARTS_ACTIONS.REMOVE_CART_ITEM_SUCCESS,
  payload: { id },
});

const removeItemListSuccess = (idList) => ({
  type: CARTS_ACTIONS.REMOVE_CART_ITEM_LIST_SUCCESS,
  payload: { idList },
});

export {
  getList,
  addList,
  updateItemSuccess,
  updateItemCheck,
  updateItemAllCheck,
  removeItemSuccess,
  removeItemListSuccess,
};
