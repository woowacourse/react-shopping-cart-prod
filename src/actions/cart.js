import asyncDispatchAction from 'utils/asyncDispatchAction';
import { requestGetCartList, requestDeleteCartItems } from 'api/cart';
import { snackbar } from 'actions/snackbar';
import { 비동기_요청, 알림_메시지 } from 'constants/';
import { 장바구니_액션, 장바구니_불러오기_액션 } from './types';

const addCartList = (product, cartList) => {
  const targetProduct = cartList.find((item) => item.id === product.id);

  if (targetProduct) {
    return {
      type: 장바구니_액션.ADD_EXIST_PRODUCT,
      payload: { ...product, count: Number(targetProduct.count) + 1, isChecked: true },
    };
  }

  return {
    type: 장바구니_액션.ADD_NEW_PRODUCT,
    payload: { ...product, count: 1, isChecked: true },
  };
};

const deleteCartItem = (productId) => async (dispatch) => {
  dispatch({
    type: 장바구니_액션.PENDING,
  });

  const response = await requestDeleteCartItems(productId);

  if (response.status === 비동기_요청.FAILURE) {
    dispatch(snackbar.pushMessageSnackbar(알림_메시지.장바구니_삭제_실패));
    return {
      type: 장바구니_액션.FAILURE,
      payload: response.content,
    };
  }

  dispatch(snackbar.pushMessageSnackbar(알림_메시지.장바구니_다중_삭제));
  return { type: 장바구니_액션.DELETE_PRODUCT, payload: productId };
};

const modifyCartItemQuantity = (productId, quantity) => ({
  type: 장바구니_액션.MODIFY_PRODUCT_QUANTITY,
  payload: { productId, quantity },
});

const getCartList = () => async (dispatch) => {
  dispatch({
    type: 장바구니_불러오기_액션.PENDING,
  });

  const response = await requestGetCartList();

  asyncDispatchAction(dispatch, response, 장바구니_불러오기_액션);
};

export { addCartList, deleteCartItem, modifyCartItemQuantity, getCartList };
