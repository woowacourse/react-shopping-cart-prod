import { requestGetProductList, requestGetProduct } from 'api';
import { 비동기_요청 } from 'constants/';
import { 상품리스트_불러오기_액션, 상품_불러오기_액션 } from './types';

const getProductList = () => async (dispatch) => {
  dispatch({
    type: 상품리스트_불러오기_액션.PENDING,
  });

  const response = await requestGetProductList();
  const currentType =
    response.status === 비동기_요청.SUCCESS
      ? 상품리스트_불러오기_액션.SUCCESS
      : 상품리스트_불러오기_액션.FAILURE;
  dispatch({
    type: currentType,
    payload: response.content,
  });
};

const getProduct = (id) => async (dispatch) => {
  dispatch({
    type: 상품_불러오기_액션.PENDING,
  });

  const response = await requestGetProduct(id);
  const currentType =
    response.status === 비동기_요청.SUCCESS
      ? 상품_불러오기_액션.SUCCESS
      : 상품_불러오기_액션.FAILURE;

  dispatch({
    type: currentType,
    payload: response.content,
  });
};

export { getProductList, getProduct };
