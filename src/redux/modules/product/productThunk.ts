import { AppDispatch } from '@/redux/store';
import { loadProducts, loadProductsFailure, loadProductsSuccess } from './productAction';

import axios from 'axios';
import { getCookie } from '@/utils';

const loadProductsAPI = (): any => async (dispatch: AppDispatch) => {
  dispatch(loadProducts());

  try {
    const token = getCookie('accessToken');
    const { data: productList } = token
      ? await axios.get(`${process.env.REACT_APP_API_URL}/api/products`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
      : await axios.get(`${process.env.REACT_APP_API_URL}/api/products`);

    dispatch(loadProductsSuccess(productList));
  } catch (error: unknown) {
    if (error instanceof Error) {
      dispatch(loadProductsFailure(error));
    }
  }
};

export { loadProductsAPI };
