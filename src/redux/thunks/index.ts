import { Dispatch } from 'redux';
import PATH from 'constants/path';
import { Product } from 'types/index';
import { productActions } from 'redux/actions';
import { productAxios } from 'configs/api';

const getProducts = (dispatch: Dispatch) => {
  dispatch(productActions.getProductList());

  productAxios
    .get(`${PATH.REQUEST_PRODUCT}`)
    .then(res => {
      dispatch(productActions.getProductListSuccess(res.data));
    })
    .catch(err => {
      dispatch(productActions.getProductListError());
    });
};

const getProduct = (dispatch: Dispatch, id: Product['id']) => {
  dispatch(productActions.getProductDetail());

  productAxios
    .get(`${PATH.REQUEST_PRODUCT}/${id}`)
    .then(res => {
      dispatch(productActions.getProductDetailSuccess(res.data));
    })
    .catch(err => {
      dispatch(productActions.getProductDetailError());
    });
};

export { getProducts, getProduct };
