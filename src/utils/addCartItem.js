import { requestAddCartItem } from 'api';
import { 비동기_요청 } from 'constants';
import { snackbar } from 'actions/snackbar';

export const checkIsLogin = () => {
  const accessToken = sessionStorage.getItem('accessToken');
  return accessToken;
};

export const handleRequestAddCartItem = async (id, dispatch) => {
  const response = await requestAddCartItem(id);
  if (response.content.redirect) {
    dispatch(snackbar.pushMessageSnackbar('이미 장바구니에 담긴 상품입니다!'));
    return 비동기_요청.REDIRECT;
  }
  if (response.status === 비동기_요청.FAILURE) {
    dispatch(snackbar.pushMessageSnackbar('장바구니에 상품을 담는 것에 실패하였습니다'));
    return 비동기_요청.FAILURE;
  }
  return 비동기_요청.SUCCESS;
};
