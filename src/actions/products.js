import { requestGetProductList, requestGetProduct } from 'api';
import asyncDispatchAction from 'utils/asyncDispatchAction';
import { 상품리스트_불러오기_액션, 상품_불러오기_액션 } from './types';

const getProductList = () => async (dispatch) => {
  dispatch({
    type: 상품리스트_불러오기_액션.PENDING,
  });

  const response = await requestGetProductList();

  asyncDispatchAction(dispatch, response, 상품리스트_불러오기_액션);
};

const getProduct = (id) => async (dispatch) => {
  dispatch({
    type: 상품_불러오기_액션.PENDING,
  });

  const response = await requestGetProduct(id);

  asyncDispatchAction(dispatch, response, 상품_불러오기_액션);
};

export { getProductList, getProduct };
