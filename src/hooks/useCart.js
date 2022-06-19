import { useSelector, useDispatch } from 'react-redux';
import { getCartItemAsync } from 'reducers/cart/cart.thunk';
import { setCart } from 'reducers/cart/cart.actions';

import { getCookie } from 'utils/cookie';
import apiClient from 'api';
import useSnackBar from './useSnackBar';

const COOKIE_KEY = process.env.REACT_APP_AUTH_COOKIE_KEY;

const getAuthorizationToken = () => {
  const accessToken = getCookie(COOKIE_KEY);
  return `Bearer ${accessToken}`;
};

const useCart = () => {
  const dispatch = useDispatch();
  const { showSuccessSnackBar, showErrorSnackBar } = useSnackBar();
  const { isLoading, isError, data } = useSelector((state) => state.cart);

  // 장바구니 아이템 삭제
  const deleteItemApi = async (payload) => {
    const { cartId } = payload;

    await apiClient
      .delete(`members/me/carts/${cartId}`, {
        headers: {
          Authorization: getAuthorizationToken(),
        },
      })
      .then(() => {
        getUserCartsApi();
        showSuccessSnackBar({ text: '상품이 장바구니에서 제거 되었습니다.' });
      })
      .catch((err) => {
        showErrorSnackBar({ text: err.message });
      });
  };

  // 물품 개수 변경
  const updateItemApi = async (payload) => {
    const { cartId, quantity } = payload;

    await apiClient
      .put(
        `members/me/carts/${cartId}`,
        {
          quantity: Number(quantity),
        },
        {
          headers: {
            Authorization: getAuthorizationToken(),
          },
        },
      )
      .then(() => {
        getUserCartsApi();
        showSuccessSnackBar({ text: '수량이 변경 되었습니다.' });
      })
      .catch((err) => {
        showErrorSnackBar({ text: err.message });
      });
  };

  // 장바구니 물품 추가
  const addItemApi = async (payload) => {
    const { productId } = payload;

    await apiClient
      .post(
        `members/me/carts`,
        {
          productId: Number(productId),
        },
        {
          headers: {
            Authorization: getAuthorizationToken(),
          },
        },
      )
      .then(() => {
        getUserCartsApi();
        showSuccessSnackBar({ text: '상품이 장바구니에서 추가 되었습니다.' });
      })
      .catch((err) => {
        showErrorSnackBar({ text: err.message });
      });
  };

  // 내 장바구니 조회
  const getUserCartsApi = async () => {
    await apiClient
      .get(`members/me/carts`, {
        headers: {
          Authorization: getAuthorizationToken(),
        },
      })
      .then(({ data }) => {
        dispatch(setCart(data));
      });
  };

  const getItems = () => {
    dispatch(getCartItemAsync);
  };

  const deleteItem = (id) => {
    deleteItemApi({ cartId: id });
  };

  const deleteItems = (idList) => {
    Promise.all(idList.map((id) => deleteItemApi({ cartId: id })));
  };

  const updateItemQuantity = (id, quantity) => {
    updateItemApi({ cartId: id, quantity });
  };

  const addItem = (id) => {
    addItemApi({ productId: id });
  };

  return {
    isLoading,
    isError,
    getItems,
    deleteItem,
    deleteItems,
    updateItemQuantity,
    addItem,
    getUserCartsApi,
    cartItems: data,
  };
};

export default useCart;
