import { requestAddCartItem } from 'api';
import { 비동기_요청 } from 'constants';
import { snackbar } from 'actions/snackbar';

export const checkIsLogin = (dispatch) => {
  const accessToken = sessionStorage.getItem('accessToken');
  if (!accessToken) {
    dispatch(snackbar.pushMessageSnackbar('로그인 후에 사용해주세요!'));
    return false;
  }
  return true;
};

export const handleRequestAddCartItem = async (id, dispatch) => {
  const response = await requestAddCartItem(id);
  if (response.status === 비동기_요청.REDIRECT) {
    dispatch(snackbar.pushMessageSnackbar('이미 장바구니에 담긴 상품입니다!'));
    navigator('/cart');
    return false;
  }
  if (response.status === 비동기_요청.FAILURE) {
    dispatch(snackbar.pushMessageSnackbar('장바구니에 상품을 담는 것에 실패하였습니다'));
    return false;
  }
  return true;
};
