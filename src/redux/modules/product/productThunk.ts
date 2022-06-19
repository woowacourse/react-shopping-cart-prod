import { AppDispatch } from '@/redux/store';
import { loadProducts, loadProductsSuccess } from './productAction';

import axios from 'axios';
import { getCookie } from '@/utils';
import { ERROR_MESSAGES } from '@/constants';

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
      alert(ERROR_MESSAGES.REQUEST.GET_PRODUCTS);
    }
  }
};

export { loadProductsAPI };
