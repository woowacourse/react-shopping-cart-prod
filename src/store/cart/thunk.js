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
    const { status, content } = response;

    dispatch(
      status === REQUEST_STATUS.SUCCESS
        ? cartActions.updateList.success(content)
        : cartActions.updateList.error(content),
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
    const { status, content } = response;

    dispatch(
      status === REQUEST_STATUS.SUCCESS
        ? cartActions.addItem.success(content)
        : cartActions.addItem.error(content),
    );

    return response;
  };

const updateItem = (id, updatedItem) => async (dispatch) => {
  const response = await requestUpdateCartItem(id, updatedItem);
  const { status, content } = response;

  dispatch(
    status === REQUEST_STATUS.SUCCESS
      ? cartActions.updateItem.success(content)
      : cartActions.updateItem.error(content),
  );

  return response;
};

const removeItem = (targetId) => async (dispatch) => {
  const response = await requestRemoveCartItem(targetId);
  const { status, content } = response;

  dispatch(
    status === REQUEST_STATUS.SUCCESS
      ? cartActions.removeItem.success(targetId)
      : cartActions.removeItem.error(content),
  );

  return response;
};

const removeItems = (targetIdList) => async (dispatch) => {
  const response = await requestRemoveCartItemList(targetIdList);
  const { status, content } = response;

  dispatch(
    status === REQUEST_STATUS.SUCCESS
      ? cartActions.removeItems.success(targetIdList)
      : cartActions.removeItems.error(content),
  );

  return response;
};

const cartThunk = { updateList, addItem, updateItem, removeItem, removeItems };

export default cartThunk;
