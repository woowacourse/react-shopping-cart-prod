import { ProductType } from '@/types';

const LOAD_PRODUCTS = 'LOAD_PRODUCTS' as const;
const LOAD_PRODUCTS_SUCCESS = 'LOAD_PRODUCTS_SUCCESS' as const;

const loadProducts = () => ({ type: LOAD_PRODUCTS });

const loadProductsSuccess = (productList: ProductType[]) => ({
  type: LOAD_PRODUCTS_SUCCESS,
  payload: { productList },
});

export { LOAD_PRODUCTS, LOAD_PRODUCTS_SUCCESS };

export { loadProducts, loadProductsSuccess };
