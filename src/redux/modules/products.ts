import axios from 'axios';
import { AppDispatch, RootState } from '../store';

type Product = {
  name: string;
  price: number;
  img: string;
  id: number;
};

export type ProductState = {
  loading: boolean;
  error: Error | null;
  productList: Product[];
};

export type Action =
  | ReturnType<typeof loadProductsRequest>
  | ReturnType<typeof loadProductsSuccess>
  | ReturnType<typeof loadProductsFailure>;

const initialState: ProductState = {
  loading: false,
  productList: [],
  error: null,
};

const LOAD_PRODUCTS_REQUEST = 'product/LOAD_REQUEST' as const;
const LOAD_PRODUCTS_SUCCESS = 'product/LOAD_SUCCESS' as const;
const LOAD_PRODUCTS_FAILURE = 'product/LOAD_FAILURE' as const;

const loadProductsRequest = () => ({ type: LOAD_PRODUCTS_REQUEST });
const loadProductsSuccess = (productList: Product[]) => ({
  type: LOAD_PRODUCTS_SUCCESS,
  payload: { productList },
});
const loadProductsFailure = (error: Error) => ({
  type: LOAD_PRODUCTS_FAILURE,
  payload: { error },
});

export const loadProductsAPI = (): any => async (dispatch: AppDispatch) => {
  dispatch(loadProductsRequest());
  try {
    const { data: productList } = await axios.get(`${process.env.REACT_APP_API_URL}`);
    dispatch(loadProductsSuccess(productList));
  } catch (error: unknown) {
    if (error instanceof Error) {
      dispatch(loadProductsFailure(error));
    }
  }
};

const productsReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case LOAD_PRODUCTS_REQUEST: {
      return { ...state, loading: true };
    }
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

export const selectProductState = (state: RootState) => state.products;

export { loadProductsSuccess, loadProductsFailure };

export default productsReducer;
