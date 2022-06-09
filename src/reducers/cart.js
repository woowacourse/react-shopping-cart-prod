/* eslint-disable no-param-reassign */
import produce from 'immer';

import { CARTS_ACTIONS } from 'actions/types';

import { createAsyncState } from 'lib/requestUtils';

const initialState = {
  items: [],
  listAsyncState: createAsyncState.initial(),
  curdAsyncState: createAsyncState.initial(),
};

export default (state = initialState, action) => {
  const { type, payload = {} } = action;

  switch (type) {
    case CARTS_ACTIONS.UPDATE_CART_LIST_SUCCESS:
      return produce(state, (draft) => {
        draft.items = payload.map((item) => ({ ...item, isChecked: true }));
        draft.listAsyncState = createAsyncState.success();
      });

    case CARTS_ACTIONS.UPDATE_CART_LIST_PENDING:
    case CARTS_ACTIONS.ADD_CART_LIST_PENDING:
      return produce(state, (draft) => {
        draft.listAsyncState = createAsyncState.pending();
      });

    case CARTS_ACTIONS.UPDATE_CART_LIST_ERROR:
    case CARTS_ACTIONS.ADD_CART_LIST_ERROR:
      return produce(state, (draft) => {
        draft.listAsyncState = createAsyncState.error(payload);
      });

    case CARTS_ACTIONS.ADD_CART_LIST_SUCCESS:
      return produce(state, (draft) => {
        const updatedItems = payload;
        updatedItems.forEach((item) => {
          const targetIndex = state.items.findIndex(({ id }) => id === item.id);
          if (targetIndex > 0) {
            draft[targetIndex] = { ...item, isChecked: true };
            return;
          }

          draft.items.push({ ...item, isChecked: true });
        });

        draft.curdAsyncState = createAsyncState.success();
      });

    case CARTS_ACTIONS.UPDATE_CART_ITEM_SUCCESS:
      return produce(state, (draft) => {
        const { id: updatedId, quantity: updateQuantity } = payload;
        const targetIndex = state.items.findIndex(({ id }) => id === updatedId);

        draft.items[targetIndex].quantity = updateQuantity;
        draft.curdAsyncState = createAsyncState.success();
      });

    case CARTS_ACTIONS.UPDATE_CART_ITEM_CHECKED:
      return produce(state, (draft) => {
        const { id: updatedId, isChecked } = payload;
        const targetIndex = state.items.findIndex(({ id }) => id === updatedId);

        draft.items[targetIndex].isChecked = isChecked;
      });

    case CARTS_ACTIONS.UPDATE_CART_ITEM_ALL_CHECKED:
      return produce(state, (draft) => {
        const { isChecked } = payload;
        draft.items = draft.items.map((item) => ({ ...item, isChecked }));
      });

    case CARTS_ACTIONS.REMOVE_CART_ITEM_PENDING:
      return produce(state, (draft) => {
        draft.curdAsyncState = createAsyncState.pending();
      });

    case CARTS_ACTIONS.REMOVE_CART_ITEM_SUCCESS:
      return produce(state, (draft) => {
        const { id: updatedId } = payload;
        draft.items = draft.items.filter(({ id }) => id !== updatedId);
        draft.curdAsyncState = createAsyncState.success();
      });

    case CARTS_ACTIONS.REMOVE_CART_ITEM_LIST_SUCCESS:
      return produce(state, (draft) => {
        const { idList } = payload;
        draft.items = draft.items.filter(({ id }) => !idList.includes(id));
        draft.curdAsyncState = createAsyncState.success();
      });

    default:
      return state;
  }
};
