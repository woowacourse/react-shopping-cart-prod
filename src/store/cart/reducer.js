import { createReducer, createAsyncState } from 'lib/redux-template';

import { findCartIdByIndex } from './utils';

const initialState = {
  items: [],
  listAsyncState: createAsyncState.initial(),
  curdAsyncState: createAsyncState.initial(),
};

const reducer = {
  // 장바구니 목록 초기화
  initCartList(state) {
    state.item = [];
    state.listAsyncState = createAsyncState.initial();
  },

  // 장바구니 전체 목록 갱신
  updateCartList(state, { itemList = [] }) {
    state.items = itemList.map((item) => ({ ...item, isChecked: true }));
    state.listAsyncState = createAsyncState.success();
  },

  updateCartList_Pending(state) {
    state.listAsyncState = createAsyncState.pending();
  },
  updateCartList_Error(state, { errorMessage = '' }) {
    state.listAsyncState = createAsyncState.error(errorMessage);
  },

  // 장바구니 상품 추가
  addCartItems(state, { items = [] }) {
    state.curdAsyncState = createAsyncState.success();

    items.forEach((item) => {
      const targetIndex = findCartIdByIndex(item.id, state.items);
      if (targetIndex > 0) {
        state.items[targetIndex] = { ...item, isChecked: true };
        return;
      }

      state.items.push({ ...item, isChecked: true });
    });
  },

  addCartItems_Error(state, { errorMessage }) {
    state.curdAsyncState = createAsyncState.error(errorMessage);
  },

  // 장바구니 아이템 정보(수량 등) 업데이트
  updateCartItem(state, { updatedItem }) {
    const targetIndex = findCartIdByIndex(updatedItem.id, state.items);

    state.items[targetIndex] = { ...state.items[targetIndex], ...updatedItem };
    state.curdAsyncState = createAsyncState.success();
  },

  updateCartItem_Error(state, { errorMessage = '' }) {
    state.curdAsyncState = createAsyncState.error(errorMessage);
  },

  // 장바구니 아이템 체크
  setCartItemCheck(state, { targetId = 0, isChecked = false }) {
    const targetIndex = findCartIdByIndex(targetId, state.items);

    state.items[targetIndex].isChecked = isChecked;
  },

  setAllCartItemCheck(state, { isChecked = false }) {
    state.items = state.items.map((item) => ({ ...item, isChecked }));
  },

  // 장바구니 아이템 제거
  removeCartItem(state, { targetId = 0 }) {
    state.items = state.items.filter(({ id }) => id !== targetId);
    state.curdAsyncState = createAsyncState.success();
  },

  removeCartItem_Error(state, { errorMessage = '' }) {
    state.curdAsyncState = createAsyncState.error(errorMessage);
  },

  removeCartItems(state, { targetIdList = [] }) {
    state.items = state.items.filter(({ id }) => !targetIdList.includes(id));
    state.curdAsyncState = createAsyncState.success();
  },

  removeCartItems_Error(state, { errorMessage = '' }) {
    state.curdAsyncState = createAsyncState.error(errorMessage);
  },
};

const cartReducer = createReducer(reducer, initialState);

export { cartReducer, reducer };
