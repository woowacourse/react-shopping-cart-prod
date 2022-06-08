import apiClient from 'api';
import { getCookie } from 'utils';
import { AppDispatch, RootState } from '../store';

type Product = {
  name: string;
  price: number;
  imageUrl: string;
  id: number;
  cartId: number | null;
  quantity: number;
};

export type ProductState = {
  loading: boolean;
  error: Error | null;
  productList: Product[];
};

export type Action =
  | ReturnType<typeof loadProductsRequest>
  | ReturnType<typeof loadProductsSuccess>
  | ReturnType<typeof loadProductsFailure>
  | ReturnType<typeof addProductToCart>;

const initialState: ProductState = {
  loading: false,
  productList: [],
  error: null,
};

const LOAD_PRODUCTS_REQUEST = 'product/LOAD_REQUEST' as const;
const LOAD_PRODUCTS_SUCCESS = 'product/LOAD_SUCCESS' as const;
const LOAD_PRODUCTS_FAILURE = 'product/LOAD_FAILURE' as const;

const ADD_PRODUCT_TO_CART = 'product/ADD_TO_CART' as const;

const loadProductsRequest = () => ({ type: LOAD_PRODUCTS_REQUEST });
const loadProductsSuccess = (productList: Product[]) => ({
  type: LOAD_PRODUCTS_SUCCESS,
  payload: { productList },
});
const loadProductsFailure = (error: Error) => ({
  type: LOAD_PRODUCTS_FAILURE,
  payload: { error },
});
const addProductToCart = (id: number) => ({
  type: ADD_PRODUCT_TO_CART,
  payload: { id },
});

export const loadProductsAPI = (): any => async (dispatch: AppDispatch) => {
  dispatch(loadProductsRequest());
  const token = getCookie('accessToken');

  try {
    if (token === '') {
      const { data: productList } = await apiClient.get('/api/products');
      dispatch(loadProductsSuccess(productList));
    } else {
      const { data: productList } = await apiClient.get('/api/products', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch(loadProductsSuccess(productList));
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      dispatch(loadProductsFailure(error));
      console.log(error);
    }
  }
};

const productsReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case LOAD_PRODUCTS_REQUEST: {
      return { ...state, loading: true, error: null };
    }
    case LOAD_PRODUCTS_SUCCESS: {
      const { productList } = action.payload;

      return { ...state, loading: false, productList };
    }
    case LOAD_PRODUCTS_FAILURE: {
      const { error } = action.payload;

      return { ...state, loading: false, error };
    }
    case ADD_PRODUCT_TO_CART: {
      const { id } = action.payload;
      const targetIndex = state.productList.findIndex((product) => product.id === id);
      const newItems = [...state.productList];
      newItems[targetIndex].quantity = 1;

      return { ...state, productList: newItems };
    }
    default:
      return state;
  }
};

export const selectProductState = (state: RootState) => state.products;

export { loadProductsSuccess, loadProductsFailure, addProductToCart };

export default productsReducer;
