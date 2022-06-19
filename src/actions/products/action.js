import { PRODUCTS_ACTIONS } from '../types';

const getList = {
  pending: () => ({
    type: PRODUCTS_ACTIONS.UPDATE_PRODUCT_LIST_PENDING,
  }),

  success: (payload) => ({
    type: PRODUCTS_ACTIONS.UPDATE_PRODUCT_LIST_SUCCESS,
    payload,
  }),

  error: (payload) => ({
    type: PRODUCTS_ACTIONS.UPDATE_PRODUCT_LIST_ERROR,
    payload,
  }),
};

export { getList };
