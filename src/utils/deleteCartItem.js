import { requestDeleteCartItem } from 'api';
import { 비동기_요청 } from 'constants';
import { snackbar } from 'actions/snackbar';
import { deleteCartItem } from 'actions/cart';

export const handleRequestDeleteCartItem = async (productIdList, dispatch) => {
  const response = await requestDeleteCartItem({ productIds: productIdList });
  if (response.status === 비동기_요청.FAILURE) {
    dispatch(snackbar.pushMessageSnackbar('상품 제거에 실패하였습니다!'));
    return false;
  }
  dispatch(deleteCartItem(productIdList));
  return true;
};
