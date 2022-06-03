import * as actions from 'reducers/cart/cart.actions';
import apiClient from 'api';

export const getCartItemAsync = async (dispatch) => {
  dispatch(actions.getCartRequest());
  try {
    const { data } = await apiClient.get('/cart');
    dispatch(actions.getCartSuccess(data));
  } catch (error) {
    dispatch(actions.getCartError());
  }
};
