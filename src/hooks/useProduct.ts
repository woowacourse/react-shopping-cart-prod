import { ChangeEventHandler, FocusEventHandler } from 'react';
import { NONE_QUANTITY } from '../constants';
import { useRecoilCallback, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  SelectorParams,
  updateCartSelector,
  removeProductItemFromCartSelector,
  getCartItemIdSelector,
} from '../store/CartSelector';
import { validateQuantityInput } from '../utils/validateQuantityInput';
import { CART_BASE_URL } from '../constants/url';
import { useFetchData } from './useFetchData';
import { serverState } from '../store/ServerState';

import { CartItem } from '../types';
import { cartState } from '../store/CartState';

export const useProduct = (productId: number) => {
  const newQuantity = useRecoilValue(updateCartSelector({ id: productId }));
  const serverUrl = useRecoilValue(serverState);
  const setCart = useSetRecoilState(cartState);

  const findCartItemId = useRecoilValue(getCartItemIdSelector(productId));

  const updateCart = useRecoilCallback(({ set }) => ({ id, quantity }: SelectorParams) => {
    set(updateCartSelector({ id, quantity }), 0);
  });

  const removeProductItemFromCart = useRecoilCallback(({ set }) => (productId: number) => {
    set(removeProductItemFromCartSelector(productId), []);
  });

  const { api } = useFetchData<CartItem[]>(setCart);

  const removeItem = () => {
    if (findCartItemId < 0) return;

    api.delete(`${serverUrl}${CART_BASE_URL}/${findCartItemId}`, CART_BASE_URL);
    removeProductItemFromCart(productId);
  };

  const updateItem = (quantity: number) => {
    if (findCartItemId < 0) return;

    api.patch(`${serverUrl}${CART_BASE_URL}/${findCartItemId}`, { quantity }, CART_BASE_URL);
    updateCart({ id: productId, cartId: findCartItemId, quantity });
  };
  const addItemToCart = () => {
    api.post(`${serverUrl}${CART_BASE_URL}`, { productId }, CART_BASE_URL);

    updateCart({
      id: productId,
      cartId: findCartItemId,
      quantity: 1,
    });
  };

  const handleNumberInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    event.preventDefault();
    alert('버튼으로 수량을 조절할 수 있습니다.');
  };

  const handleIncreaseItem = () => {
    const newValue = newQuantity + 1;
    if (!validateQuantityInput(newValue)) return;

    updateItem(newValue);
  };

  const handleDecreaseItem = () => {
    const newValue = newQuantity - 1;

    if (!validateQuantityInput(newValue)) return;

    if (newValue === NONE_QUANTITY) {
      removeItem();
      return;
    }

    updateItem(newValue);
  };

  const handleDecreaseCartItem = () => {
    if (newQuantity === 1) return;
    const newValue = newQuantity - 1;
    if (!validateQuantityInput(newValue)) return;

    updateItem(newValue);
  };

  const handleBlurItem: FocusEventHandler<HTMLInputElement> = ({ target }) => {
    const { value } = target;

    if (value === '0') {
      removeItem();
    }
  };

  return {
    newQuantity,
    handleNumberInputChange,
    handleIncreaseItem,
    handleDecreaseItem,
    handleDecreaseCartItem,
    addItemToCart,
    handleBlurItem,
    removeItem,
  };
};
