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
  // TODO 테스트 해볼 것!
  const deleteItemApi = async (payload) => {
    const { cartId } = payload;
    console.log('???', cartId);

    await apiClient
      .delete(`members/me/carts/${cartId}`, {
        headers: {
          Authorization: getAuthorizationToken(),
        },
      })
      .then(() => {
        // 하..이렇게 만들면 안되는데
        getUserCartsApi();
        showSuccessSnackBar({ text: '상품이 장바구니에서 제거 되었습니다.' });
      })
      .catch((err) => {
        console.log('err deleteItemApi', err);
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
    console.log('productId', productId);

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
        // ㅠㅠ 이렇게 만들면 안되는데 젠장 어쩔수 없나?
        getUserCartsApi();
        showSuccessSnackBar({ text: '상품이 장바구니에서 추가 되었습니다.' });
      })
      .catch((err) => {
        // TODO 이미 장바구니에 들어있는 상품 추가 시, error 반환 됨, 해당 이슈 처리 할 것
        console.log('err addItemApi', err);
        showErrorSnackBar({ text: err.message });
      });
  };

  // 내 장바구니 조회
  // TODO 테스트 해볼 것
  const getUserCartsApi = async () => {
    await apiClient
      .get(`members/me/carts`, {
        headers: {
          Authorization: getAuthorizationToken(),
        },
      })
      .then(({ data }) => {
        dispatch(setCart(data));
        // TODO 지울 것
        // showSuccessSnackBar({ text: '내 장바구니 조회' });
      })
      .catch((err) => {
        console.log('err', err);
      });
  };

  const getItems = () => {
    dispatch(getCartItemAsync);
  };

  const deleteItem = (id) => {
    // console.log('deleteItem id', id);
    deleteItemApi({ cartId: id });
  };

  const deleteItems = (idList) => {
    // console.log('idList', idList);
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
