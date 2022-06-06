import {
  requestAddCart,
  requestGetCartList,
  requestRemoveCartItem,
  requestRemoveCartItemList,
  requestUpdateCartItem,
} from 'api/cart';
import { REQUEST_STATUS } from 'constants/';

import cartActions from './action';

const updateList =
  (force = false) =>
  async (dispatch, getState) => {
    const { isLoading, isLoaded } = getState().cart.listAsyncState;
    if (force === false && (isLoading === true || isLoaded === true)) {
      return;
    }

    dispatch(cartActions.updateList.pending());

    const response = await requestGetCartList();
    const { status, body } = response;

    dispatch(
      status === REQUEST_STATUS.SUCCESS
        ? cartActions.updateList.success(body)
        : cartActions.updateList.error(body.message),
    );

    return response;
  };

const addItem =
  ({ id, image, name, price, quantity = 1 }) =>
  async (dispatch) => {
    const response = await requestAddCart({
      id,
      image,
      name,
      price,
      quantity,
    });
    const { status, body } = response;

    dispatch(
      status === REQUEST_STATUS.SUCCESS
        ? cartActions.addItem.success(body)
        : cartActions.addItem.error(body.message),
    );

    return response;
  };

const updateItem = (id, updatedItem) => async (dispatch) => {
  const response = await requestUpdateCartItem(id, updatedItem);
  const { status, body } = response;

  dispatch(
    status === REQUEST_STATUS.SUCCESS
      ? cartActions.updateItem.success(body)
      : cartActions.updateItem.error(body.message),
  );

  return response;
};

const removeItem = (targetId) => async (dispatch) => {
  const response = await requestRemoveCartItem(targetId);
  const { status, body } = response;

  dispatch(
    status === REQUEST_STATUS.SUCCESS
      ? cartActions.removeItem.success(targetId)
      : cartActions.removeItem.error(body.message),
  );

  return response;
};

const removeItems = (targetIdList) => async (dispatch) => {
  const response = await requestRemoveCartItemList(targetIdList);
  const { status, body } = response;

  dispatch(
    status === REQUEST_STATUS.SUCCESS
      ? cartActions.removeItems.success(targetIdList)
      : cartActions.removeItems.error(body.message),
  );

  return response;
};

const cartThunk = { updateList, addItem, updateItem, removeItem, removeItems };

export default cartThunk;
