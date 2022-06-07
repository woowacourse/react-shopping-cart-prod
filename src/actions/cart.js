import { requestGetCartList } from 'api';

import { 비동기_요청 } from 'constants/';
import { 장바구니_불러오기_액션, 장바구니_액션 } from './types';

import { hideSpinner, showSpinner } from './spinner';

const setCartList = () => async (dispatch) => {
  dispatch(showSpinner());
  dispatch({
    type: 장바구니_불러오기_액션.PENDING,
  });
  const response = await requestGetCartList();
  if (response.status === 비동기_요청.SUCCESS) {
    const cartListInfo = response.content.map((item) => {
      const { id, name, price, thumbnail } = item.product;
      const { quantity } = item;
      return {
        id,
        name,
        price,
        thumbnail,
        quantity,
      };
    });
    dispatch({ type: 장바구니_불러오기_액션.SUCCESS, payload: cartListInfo });
  }
  if (response.status === 비동기_요청.FAILURE) {
    dispatch({
      type: 장바구니_불러오기_액션.FAILURE,
      payload: { message: '장바구니 정보를 불러오는 데 실패하였습니다' },
    });
  }
  dispatch(hideSpinner());
};

const addCartList = (product) => {
  return {
    type: 장바구니_액션.ADD_NEW_PRODUCT,
    payload: { ...product, quantity: 1, isChecked: true },
  };
};

const deleteCartItem = (productId) => ({ type: 장바구니_액션.DELETE_PRODUCT, payload: productId });

const modifyCartItemQuantity = (productId, quantity) => ({
  type: 장바구니_액션.MODIFY_PRODUCT_QUANTITY,
  payload: { productId, quantity },
});

export { setCartList, addCartList, deleteCartItem, modifyCartItemQuantity };
