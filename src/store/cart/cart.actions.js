import axios from 'axios';
import { SERVER_PATH, STORAGE_KEY } from '../../constants';

const actionTypes = {
  ADD_CART: 'ADD_CART',
  ADD_CART_SUCCESS: 'ADD_CART_SUCCESS',
  ADD_CART_ERROR: 'ADD_CART_ERROR',

  DELETE_CART: 'DELETE_CART',
  DELETE_CART_SUCCESS: 'DELETE_CART_SUCCESS',
  DELETE_CART_ERROR: 'DELETE_CART_ERROR',

  UPDATE_ITEM_QUANTITY: 'UPDATE_ITEM_QUANTITY',
  UPDATE_ITEM_QUANTITY_SUCCESS: 'UPDATE_ITEM_QUANTITY_SUCCESS',
  UPDATE_ITEM_QUANTITY_ERROR: 'UPDATE_ITEM_QUANTITY_ERROR',
};

const accessToken = JSON.parse(localStorage.getItem(STORAGE_KEY));

const addCartItemAsync = (id) => async (dispatch) => {
  console.log('accessToken', accessToken);
  try {
    dispatch({ type: actionTypes.ADD_CART });
    await axios.post(`${SERVER_PATH.CARTS}/products/${id}`, null, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const { data } = await axios.get(SERVER_PATH.CARTS, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log('data', data);
    dispatch({
      type: actionTypes.ADD_CART_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({ type: actionTypes.ADD_CART_ERROR });
    alert(error.response.data);
  }
};

const deleteCartItemAsync = (id) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.DELETE_CART });
    await axios.delete(`${SERVER_PATH.CARTS}/products/${id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const { data } = await axios.get(SERVER_PATH.CARTS, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log('delete', data);
    dispatch({
      type: actionTypes.DELETE_CART_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({ type: actionTypes.DELETE_CART_ERROR });
  }
};

const updateItemQuantityAsync = (id, quantity) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.UPDATE_ITEM_QUANTITY });
    await axios.patch(
      `${SERVER_PATH.CARTS}/products/${id}`,
      { quantity },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const { data } = await axios.get(SERVER_PATH.CARTS, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    console.log('quantity', data);
    dispatch({
      type: actionTypes.UPDATE_ITEM_QUANTITY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({ type: actionTypes.UPDATE_ITEM_QUANTITY_ERROR });
  }
};

export { addCartItemAsync, deleteCartItemAsync, updateItemQuantityAsync, actionTypes };
