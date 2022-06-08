import axios from 'configs/api';

import { Dispatch } from 'redux';
import { productActions } from 'redux/actions';

import PATH from 'constants/path';
import { Product } from 'types/index';

const getProducts = (dispatch: Dispatch) => {
  dispatch(productActions.getProductList());

  axios
    .get(`${PATH.REQUEST_PRODUCT}`)
    .then((res) => {
      dispatch(productActions.getProductListSuccess(res.data));
    })
    .catch((err) => {
      dispatch(productActions.getProductListError());
    });
};

const getProduct = (dispatch: Dispatch, id: Product['id']) => {
  dispatch(productActions.getProductDetail());

  axios
    .get(`${PATH.REQUEST_PRODUCT}/${id}`)
    .then((res) => {
      dispatch(productActions.getProductDetailSuccess(res.data));
    })
    .catch((err) => {
      dispatch(productActions.getProductDetailError());
    });
};

export { getProducts, getProduct };
