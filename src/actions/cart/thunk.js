import {
  requestAddCart,
  requestGetCartList,
  requestRemoveCartItem,
  requestRemoveCartItemList,
  requestUpdateCartItem,
} from 'api/cart';
import { REQUEST_STATUS } from 'constants/';

import * as cartActions from './action';

const getList =
  (force = false) =>
  async (dispatch, getState) => {
    const { isLoading, isLoaded } = getState().cart.listAsyncState;
    if (force === false && (isLoading === true || isLoaded === true)) {
      return;
    }

    dispatch(cartActions.getList.pending());

    const response = await requestGetCartList();
    const { status, content } = response;

    (status === REQUEST_STATUS.SUCCESS && dispatch(cartActions.getList.success(content))) ||
      (status === REQUEST_STATUS.FAIL && dispatch(cartActions.getList.error(content)));

    return response;
  };

const addList =
  ({ id, image, name, price, quantity = 1 }) =>
  async (dispatch) => {
    dispatch(cartActions.addList.pending());

    const response = await requestAddCart({
      id,
      image,
      name,
      price,
      quantity,
    });
    const { status, content } = response;

    (status === REQUEST_STATUS.SUCCESS && dispatch(cartActions.addList.success(content))) ||
      (status === REQUEST_STATUS.FAIL && dispatch(cartActions.addList.error(content)));

    return response;
  };

const updateItem = (id, changedContent) => async (dispatch) => {
  const response = await requestUpdateCartItem(id, changedContent);
  const { status, content } = response;

  if (status === REQUEST_STATUS.FAIL) {
    return false;
  }

  dispatch(cartActions.updateItemSuccess(content));
  return response;
};

const removeItem = (id) => async (dispatch) => {
  const response = await requestRemoveCartItem(id);
  const { status } = response;

  if (status === REQUEST_STATUS.FAIL) {
    return false;
  }

  dispatch(cartActions.removeItemSuccess(id));
  return response;
};

const removeItemList = (idList) => async (dispatch) => {
  const response = await requestRemoveCartItemList(idList);
  const { status } = response;

  if (status === REQUEST_STATUS.FAIL) {
    return false;
  }

  dispatch(cartActions.removeItemListSuccess(idList));
  return response;
};

export { getList, addList, updateItem, removeItem, removeItemList };
