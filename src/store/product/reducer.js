import { createReducer, createAsyncState } from 'lib/redux-template';

const initialState = {
  productList: [],
  listAsyncState: createAsyncState.initial(),
};

const reducer = {
  updateProductList(state, { productList = [] }) {
    state.productList = productList;
    state.listAsyncState = createAsyncState.success();
  },

  updateProductList_Pending(state) {
    state.listAsyncState = createAsyncState.pending();
  },

  updateProductList_Error(state, { errorMessage = '' }) {
    state.listAsyncState = createAsyncState.error(errorMessage);
  },
};

const productReducer = createReducer(reducer, initialState);

export { productReducer, reducer };
