import axios from 'axios';
import { SERVER_PATH } from '../../constants';

const actionTypes = {
  GET_CART: 'GET_CART',
  GET_CART_SUCCESS: 'GET_CART_SUCCESS',
  GET_CART_ERROR: 'GET_CART_ERROR',
};

const getCartItemAsync = (accessToken) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_CART });
    const { data } = await axios.get(SERVER_PATH.CARTS, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log('data', data);

    dispatch({
      type: actionTypes.GET_CART_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({ type: actionTypes.GET_CART_ERROR });
    alert(error.response.data);
  }
};

export { getCartItemAsync, actionTypes };
