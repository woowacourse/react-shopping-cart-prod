import { ProductState } from '@/types';

import {
  loadProducts,
  loadProductsSuccess,
  LOAD_PRODUCTS,
  LOAD_PRODUCTS_SUCCESS,
} from './productAction';

const initialState: ProductState = {
  loading: false,
  productList: [],
  error: null,
};

type Action = ReturnType<typeof loadProducts> | ReturnType<typeof loadProductsSuccess>;

const productsReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case LOAD_PRODUCTS:
      return { ...state, loading: true };
    case LOAD_PRODUCTS_SUCCESS: {
      const { productList } = action.payload;

      return { ...state, loading: false, productList };
    }
    default:
      return state;
  }
};

export default productsReducer;
