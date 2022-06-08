import { AppDispatch } from '@/redux/store';
import { loadProducts, loadProductsFailure, loadProductsSuccess } from './productAction';

import axios from 'axios';

const loadProductsAPI = (): any => async (dispatch: AppDispatch) => {
  dispatch(loadProducts());

  try {
    const { data: productList } = await axios.get(`${process.env.REACT_APP_API_URL}/api/products`);

    dispatch(loadProductsSuccess(productList));
  } catch (error: unknown) {
    if (error instanceof Error) {
      dispatch(loadProductsFailure(error));
    }
  }
};

export { loadProductsAPI };
