import * as actions from 'reducers/cart/cart.actions';
import apiClient from 'api';
import { getAuthorizedHeaders } from 'api/auth';

export const getCartItemAsync = async (dispatch) => {
  dispatch(actions.getCartRequest());
  try {
    const headers = getAuthorizedHeaders();
    const { data } = await apiClient.get('/api/members/me/carts', headers);
    dispatch(actions.getCartSuccess(data));
  } catch (error) {
    dispatch(actions.getCartError());
  }
};
