import {CONFIRM_MESSAGE, PATH} from 'constant';
import {useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';

import {CART} from 'store/modules/cart';
import {SELECTED_ITEM} from 'store/modules/selectedItem';

import useFetch from './useFetch';

export default function useCartItem() {
  const accessToken = useSelector((state) => state.authReducer.accessToken);
  const isLogin = useSelector((state) => state.authReducer.isLogin);

  const navigation = useNavigate();

  const dispatch = useDispatch();

  const {fetch: getCart} = useFetch('get');

  const {fetch: postCart} = useFetch('post');

  const {fetch: deleteCart} = useFetch('delete');

  const deleteCartItem = (payload, confirmMessage = true) => {
    const deleteConfirm = confirmMessage ? window.confirm(CONFIRM_MESSAGE.DELETE_CART) : true;

    if (!isLogin) {
      alert('먼저 로그인해주세요.');
      navigation(PATH.LOGIN);
      return;
    }

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
    if (!isLogin) {
      alert('먼저 로그인해주세요.');
      navigation(PATH.LOGIN);
      return;
    }

    getCart({
      API_URL: process.env.REACT_APP_CART_API_URL,
      headers: {Authorization: `Bearer ${accessToken}`},
      onSuccess: (fetchedData) => {
        dispatch({type: CART.INITIALIZE, payload: fetchedData});
      },
    });
  }, [dispatch, getCart, accessToken]);

  const addCartItem = (payload) => {
    if (!isLogin) {
      alert('먼저 로그인해주세요.');
      navigation(PATH.LOGIN);
      return;
    }

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
            dispatch({type: CART.DELETE_SELECTED_CART, payload});
            dispatch({type: SELECTED_ITEM.DELETE, payload: id});
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
