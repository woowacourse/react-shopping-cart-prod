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
    const { isLoaded } = getState().cart.listAsyncState;
    if (force === false && isLoaded === true) {
      return;
    }

    dispatch(cartActions.getList.pending());

    const response = await requestGetCartList();
    const { status, content } = response;

    if (status === REQUEST_STATUS.SUCCESS) {
      dispatch(cartActions.getList.success(content));
    } else if (status === REQUEST_STATUS.FAIL) {
      dispatch(cartActions.getList.error(content));
    }

    return response;
  };

const addList =
  (itemList = []) =>
  async (dispatch) => {
    dispatch(cartActions.addList.pending());

    const response = await requestAddCart(itemList);
    const { status, content } = response;

    const updatedItems = itemList.map((item, index) => {
      const { id, name, imageUrl, price } = item;
      return { productId: id, name, imageUrl, price, ...content[index] };
    });

    if (status === REQUEST_STATUS.SUCCESS) {
      dispatch(cartActions.addList.success(updatedItems));
    } else if (status === REQUEST_STATUS.FAIL) {
      dispatch(cartActions.addList.error(content));
    }

    return response;
  };

const updateItem = (id, changedContent) => async (dispatch) => {
  const response = await requestUpdateCartItem(id, changedContent);
  const { status } = response;
  const { quantity } = changedContent;

  if (status === REQUEST_STATUS.FAIL) {
    return false;
  }

  dispatch(cartActions.updateItemSuccess({ id, quantity }));
  return response;
};

const removeItem = (id) => async (dispatch) => {
  dispatch(cartActions.removeItemPending());

  const response = await requestRemoveCartItem(id);
  const { status } = response;

  if (status === REQUEST_STATUS.FAIL) {
    return false;
  }

  dispatch(cartActions.removeItemSuccess(id));
  return response;
};

const removeItemList = (idList) => async (dispatch) => {
  dispatch(cartActions.removeItemPending());

  const response = await requestRemoveCartItemList(idList);
  const { status } = response;

  if (status === REQUEST_STATUS.FAIL) {
    return false;
  }

  dispatch(cartActions.removeItemListSuccess(idList));
  return response;
};

export { getList, addList, updateItem, removeItem, removeItemList };
