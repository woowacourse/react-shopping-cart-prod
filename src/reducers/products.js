/* eslint-disable no-param-reassign */
import produce from 'immer';

import { PRODUCTS_ACTIONS } from 'actions/types';

import { createAsyncState } from 'lib/requestUtils';

const initialState = {
  productList: [],
  listAsyncState: createAsyncState.initial(),
};

export default (state = initialState, action) => {
  const { type, payload = {} } = action;

  switch (type) {
    case PRODUCTS_ACTIONS.UPDATE_PRODUCT_LIST_PENDING:
      return produce(state, (draft) => {
        draft.listAsyncState = createAsyncState.pending();
      });

    case PRODUCTS_ACTIONS.UPDATE_PRODUCT_LIST_SUCCESS:
      return produce(state, (draft) => {
        draft.productList = payload;
        draft.listAsyncState = createAsyncState.success();
      });

    case PRODUCTS_ACTIONS.UPDATE_PRODUCT_LIST_ERROR:
      return produce(state, (draft) => {
        draft.listAsyncState = createAsyncState.error(payload);
      });

    default:
      return state;
  }
};
