import {CONFIRM_MESSAGE} from 'constant';
import {useCallback} from 'react';
import {useDispatch} from 'react-redux';

import {CART} from 'store/modules/cart';
import {SELECTED_ITEM} from 'store/modules/selectedItem';

import useFetch from './useFetch';

export default function useCartItem() {
  const dispatch = useDispatch();

  const {fetch: getCart} = useFetch('get');

  const {fetch: postCart} = useFetch('post');

  const {fetch: deleteCart} = useFetch('delete');

  const {fetch: patchCart} = useFetch('patch');

  const deleteCartItem = (payload) => {
    const deleteConfirm = window.confirm(CONFIRM_MESSAGE.DELETE_CART);

    if (deleteConfirm) {
      deleteCart({
        API_URL: `${process.env.REACT_APP_CART_API_URL}/${payload}`,
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
      onSuccess: (fetchedData) => {
        dispatch({type: CART.INITIALIZE, payload: fetchedData});
      },
    });
  }, [dispatch, getCart]);

  const addCartItem = (payload) => {
    postCart({
      API_URL: process.env.REACT_APP_CART_API_URL,
      body: payload,
      onSuccess: () => dispatch({type: CART.ADD, payload}),
    });
  };

  const increaseQuantity = (payload) => {
    const {quantity, id} = payload;

    patchCart({
      API_URL: `${process.env.REACT_APP_CART_API_URL}/${id}`,
      body: {
        quantity: quantity + 1,
      },
      onSuccess: () => dispatch({type: CART.INCREASE_QUANTITY, payload: id}),
    });
  };

  const decreaseQuantity = (payload) => {
    const {quantity, id} = payload;

    patchCart({
      API_URL: `${process.env.REACT_APP_CART_API_URL}/${id}`,
      body: {
        quantity: Math.max(quantity - 1, 1),
      },
      onSuccess: () => dispatch({type: CART.DECREASE_QUANTITY, payload: id}),
    });
  };

  const deleteSelectedCart = (payload) => {
    const deleteConfirm = window.confirm(CONFIRM_MESSAGE.DELETE_CART);

    if (deleteConfirm) {
      payload.forEach((id) =>
        deleteCart({
          API_URL: `${process.env.REACT_APP_CART_API_URL}/${id}`,
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
