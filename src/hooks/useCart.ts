import { useErrorBoundary } from 'react-error-boundary';
import { useRecoilState, useRecoilValue } from 'recoil';
import { cartListState, selectedHostState } from '../recoil/atoms';
import { CartItemInfo } from '../types';
import { CART_BASE_URL } from '../constants';
import APIHandler from '../api/APIHandler';

export const useCart = () => {
  const { showBoundary } = useErrorBoundary();
  const host = useRecoilValue(selectedHostState);
  const CART_URL = `${host}${CART_BASE_URL}`;
  const [cartList, setCartList] = useRecoilState(cartListState);

  const initCartList = async () => {
    const newCartList = await getCartList();
    if (newCartList) setCartList(newCartList);
  };

  const getCartList = async () => {
    try {
      const responseResult = await APIHandler.get<CartItemInfo[]>(CART_URL);

      if (responseResult.statusCode !== 200) throw new Error(responseResult.errorMessage);

      return responseResult.result;
    } catch (error) {
      showBoundary(error);
    }
  };

  const getCartItem = (productId: number) => {
    return cartList.find((cartItem) => cartItem.product.id === productId);
  };

  const addToCart = async (productId: number) => {
    try {
      const responseResult = await APIHandler.post(CART_URL, { productId: productId });

      if (responseResult.statusCode !== 201) throw new Error(responseResult.errorMessage);

      initCartList();
    } catch (error) {
      showBoundary(error);
    }
  };

  const updateProductQuantity = async (productId: number, quantity: number) => {
    try {
      const currentCartItem = getCartItem(productId);

      if (!currentCartItem) throw new Error('[ERROR] 장바구니에 상품 정보가 없습니다.');

      if (quantity <= 0) {
        deleteFromCart(currentCartItem.id);
        return;
      }

      const responseResult = await APIHandler.patch(`${CART_URL}/${currentCartItem.id}`, {
        quantity: quantity,
      });

      if (responseResult.statusCode !== 200) throw new Error(responseResult.errorMessage);

      initCartList();
    } catch (error) {
      showBoundary(error);
    }
  };

  const deleteFromCart = async (cartId: number) => {
    try {
      const responseResult = await APIHandler.delete(`${CART_URL}/${cartId}`);

      if (responseResult.statusCode !== 204) throw new Error(responseResult.errorMessage);

      initCartList();
    } catch (error) {
      showBoundary(error);
    }
  };

  return { cartList, initCartList, getCartItem, addToCart, updateProductQuantity, deleteFromCart };
};
