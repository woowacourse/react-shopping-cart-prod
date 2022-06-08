import { client } from 'apis';
import type { Dispatch } from 'redux';
import { CartListAction, cartListActions } from 'redux/cartList/action';

export const getCartListRequest = () => async (dispatch: Dispatch<CartListAction>) => {
  const accessToken = localStorage.getItem('access-token');

  if (!accessToken) return;

  dispatch(cartListActions.getCartListActionGroup.request());
  try {
    const response = await client.get('/customers/carts', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    dispatch(cartListActions.getCartListActionGroup.success(response.data));
  } catch (e: unknown) {
    if (e instanceof Error) {
      dispatch(cartListActions.getCartListActionGroup.failure(e));
    }
  }
};

export const putCartItemRequest =
  (id: number, quantity: number) => async (dispatch: Dispatch<CartListAction>) => {
    const accessToken = localStorage.getItem('access-token');

    dispatch(cartListActions.putCartItemActionGroup.request());
    try {
      const response = await client.put(
        `/customers/carts/${id}`,
        {
          quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      dispatch(cartListActions.putCartItemActionGroup.success(response.data));
    } catch (e: unknown) {
      if (e instanceof Error) {
        dispatch(cartListActions.putCartItemActionGroup.failure(e));
      }
    }
  };

export const postCartItemRequest =
  (productId: number) => async (dispatch: Dispatch<CartListAction>) => {
    const accessToken = localStorage.getItem('access-token');

    dispatch(cartListActions.postCartItemActionGroup.request());
    try {
      const response = await client.post(
        '/customers/carts',
        { productId },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      dispatch(cartListActions.postCartItemActionGroup.success(response.data));
    } catch (e: unknown) {
      if (e instanceof Error) {
        dispatch(cartListActions.postCartItemActionGroup.failure(e));
      }
    }
  };

export const deleteCartItemRequest = (id: number) => async (dispatch: Dispatch<CartListAction>) => {
  const accessToken = localStorage.getItem('access-token');

  dispatch(cartListActions.deleteCartItemActionGroup.request());
  try {
    await client.delete(`/customers/carts/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    dispatch(cartListActions.deleteCartItemActionGroup.success(id));
  } catch (e: unknown) {
    if (e instanceof Error) {
      dispatch(cartListActions.deleteCartItemActionGroup.failure(e));
    }
  }
};

export const deleteAllCartItemRequest = () => async (dispatch: Dispatch<CartListAction>) => {
  const accessToken = localStorage.getItem('access-token');

  dispatch(cartListActions.deleteAllCartItemActionGroup.request());
  try {
    await client.delete('/customers/carts', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    dispatch(cartListActions.deleteAllCartItemActionGroup.success());
  } catch (e: unknown) {
    if (e instanceof Error) {
      dispatch(cartListActions.deleteAllCartItemActionGroup.failure(e));
    }
  }
};
