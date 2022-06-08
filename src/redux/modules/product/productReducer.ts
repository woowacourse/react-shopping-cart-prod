import { ProductState } from '@/types';

import {
  loadProducts,
  loadProductsFailure,
  loadProductsSuccess,
  LOAD_PRODUCTS,
  LOAD_PRODUCTS_FAILURE,
  LOAD_PRODUCTS_SUCCESS,
} from './productAction';

const initialState: ProductState = {
  loading: false,
  productList: [],
  error: null,
};

type Action =
  | ReturnType<typeof loadProducts>
  | ReturnType<typeof loadProductsSuccess>
  | ReturnType<typeof loadProductsFailure>;

const productsReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case LOAD_PRODUCTS:
      return { ...state, loading: true };
    case LOAD_PRODUCTS_SUCCESS: {
      const { productList } = action.payload;

      return { ...state, loading: false, productList };
    }
    case LOAD_PRODUCTS_FAILURE: {
      const { error } = action.payload;

      return { ...state, loading: false, error };
    }
    default:
      return state;
  }
};

export default productsReducer;
