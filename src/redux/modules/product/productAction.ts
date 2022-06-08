import { ProductType } from '@/types';

const LOAD_PRODUCTS = 'LOAD_PRODUCTS' as const;
const LOAD_PRODUCTS_SUCCESS = 'LOAD_PRODUCTS_SUCCESS' as const;
const LOAD_PRODUCTS_FAILURE = 'LOAD_PRODUCTS_FAILURE' as const;

const loadProducts = () => ({ type: LOAD_PRODUCTS });

const loadProductsSuccess = (productList: ProductType[]) => ({
  type: LOAD_PRODUCTS_SUCCESS,
  payload: { productList },
});

const loadProductsFailure = (error: Error) => ({
  type: LOAD_PRODUCTS_FAILURE,
  payload: { error },
});

export { LOAD_PRODUCTS, LOAD_PRODUCTS_SUCCESS, LOAD_PRODUCTS_FAILURE };

export { loadProducts, loadProductsSuccess, loadProductsFailure };
