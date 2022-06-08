import {CONFIRM_MESSAGE} from 'constant';
import {BASE_SERVER_URL, SERVER_PATH} from 'constant/server';
import {useCallback} from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';

import {CART} from 'store/modules/cart';
import {SELECTED_ITEM} from 'store/modules/selectedItem';
import {ERROR_MESSAGE} from 'constant';

import useFetch from './useFetch';

export default function useCartItem(path = null) {
  const dispatch = useDispatch();
  const navigation = useNavigate();

  const {fetch: fetchCart} = useFetch('get');

  const {fetch: postCart} = useFetch('post');

  const {fetch: deleteCart} = useFetch('delete');

  const deleteCartItem = (payload) => {
    const response = JSON.parse(localStorage.getItem('accessToken'));
    const accessToken = response.accessToken;

    const deleteConfirm = window.confirm(CONFIRM_MESSAGE.DELETE_CART);
    if (deleteConfirm) {
      deleteCart({
        API_URL: `${BASE_SERVER_URL}${SERVER_PATH.CUSTOMERS}${SERVER_PATH.CART}`,
        headers: {Authorization: `Bearer ${accessToken}`},
        body: {productId: payload},

        onSuccess: () => {
          dispatch({type: CART.DELETE, payload});
          dispatch({type: SELECTED_ITEM.DELETE, payload});
        },

        onFail: (error) => {
          alert(error);
        },
      });
      return;
    }

    if (!path) {
      return;
    }
    navigation(path);
  };

  const initializeCart = useCallback(() => {
    const response = JSON.parse(localStorage.getItem('accessToken'));
    if (!response) {
      return;
    }

    const accessToken = response.accessToken;

    fetchCart({
      API_URL: `${BASE_SERVER_URL}${SERVER_PATH.CUSTOMERS}${SERVER_PATH.CART}`,
      headers: {Authorization: `Bearer ${accessToken}`},

      onSuccess: (fetchedData) => {
        dispatch({type: CART.INITIALIZE, payload: fetchedData.cart});
      },

      onFail: (error) => {
        alert(error);
      },
    });
  }, [dispatch, fetchCart]);

  const addCartItem = (payload) => {
    const response = JSON.parse(localStorage.getItem('accessToken'));

    if (!response) {
      alert(ERROR_MESSAGE.IS_LOGOUT);
      return;
    }

    const accessToken = response.accessToken;

    postCart({
      API_URL: `${BASE_SERVER_URL}${SERVER_PATH.CUSTOMERS}${SERVER_PATH.CART}`,
      headers: {Authorization: `Bearer ${accessToken}`},
      body: {productId: payload.id},

      onSuccess: () => {
        dispatch({type: CART.ADD, payload: {...payload, test: 'test', quantity: 1}});
      },

      onFail: (error) => {
        alert(error);
      },
    });
    if (!path) {
      return;
    }
    navigation(path);
  };

  const deleteSelectedCart = (payload) => {
    const response = JSON.parse(localStorage.getItem('accessToken'));
    const accessToken = response.accessToken;

    const deleteConfirm = window.confirm(CONFIRM_MESSAGE.DELETE_CART);

    if (deleteConfirm) {
      payload.forEach((id) =>
        deleteCart({
          API_URL: `${BASE_SERVER_URL}${SERVER_PATH.CUSTOMERS}${SERVER_PATH.CART}`,
          headers: {Authorization: `Bearer ${accessToken}`},
          body: {productId: id},

          onSuccess: () => {
            dispatch({type: CART.DELETE, payload: id});
            dispatch({type: SELECTED_ITEM.DELETE, payload: id});
          },

          onFail: (error) => {
            alert(error);
          },
        }),
      );
      return;
    }
  };

  return {
    deleteCartItem,
    addCartItem,
    deleteSelectedCart,
    initializeCart,
  };
}
