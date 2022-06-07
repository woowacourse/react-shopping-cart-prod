import {CONFIRM_MESSAGE} from 'constant';
import {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import {CART} from 'store/modules/cart';
import {SELECTED_ITEM} from 'store/modules/selectedItem';

import useFetch from './useFetch';

export default function useCartItem() {
  const accessToken = useSelector((state) => state.authReducer.accessToken);

  const dispatch = useDispatch();

  const {fetch: getCart} = useFetch('get');

  const {fetch: postCart} = useFetch('post');

  const {fetch: deleteCart} = useFetch('delete');

  const deleteCartItem = (payload) => {
    const deleteConfirm = window.confirm(CONFIRM_MESSAGE.DELETE_CART);

    if (deleteConfirm) {
      deleteCart({
        API_URL: process.env.REACT_APP_CART_API_URL,
        headers: {Authorization: `Bearer ${accessToken}`},
        body: {
          productId: Number.parseInt(payload),
        },
        onSuccess: () => {
          dispatch({type: CART.DELETE, payload});
          dispatch({type: SELECTED_ITEM.DELETE, payload});
        },
      });
    }
  };

  const initializeCart = useCallback(() => {
    getCart({
      API_URL: process.env.REACT_APP_CART_API_URL,
      headers: {Authorization: `Bearer ${accessToken}`},
      onSuccess: (fetchedData) => {
        dispatch({type: CART.INITIALIZE, payload: fetchedData});
      },
    });
  }, [dispatch, getCart, accessToken]);

  const addCartItem = (payload) => {
    const {id} = payload;
    postCart({
      API_URL: process.env.REACT_APP_CART_API_URL,
      headers: {Authorization: `Bearer ${accessToken}`},
      body: {productId: Number.parseInt(id)},
      onSuccess: () => dispatch({type: CART.ADD, payload: {...payload, quantity: 1}}),
    });
  };

  const increaseQuantity = (payload) => dispatch({type: CART.INCREASE_QUANTITY, payload});

  const decreaseQuantity = (payload) => dispatch({type: CART.DECREASE_QUANTITY, payload});

  const deleteSelectedCart = (payload) => {
    const deleteConfirm = window.confirm(CONFIRM_MESSAGE.DELETE_CART);

    if (deleteConfirm) {
      payload.forEach((id) =>
        deleteCart({
          API_URL: process.env.REACT_APP_CART_API_URL,
          headers: {Authorization: `Bearer ${accessToken}`},
          body: {productId: Number.parseInt(id)},
          onSuccess: () => {
            dispatch({type: SELECTED_ITEM.DELETE, payload: id});
            dispatch({type: CART.DELETE_SELECTED_CART, payload});
          },
        }),
      );

      return;
    }
  };

  return {
    deleteCartItem,
    addCartItem,
    increaseQuantity,
    decreaseQuantity,
    deleteSelectedCart,
    initializeCart,
  };
}
