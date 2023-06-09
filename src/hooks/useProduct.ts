import { ChangeEventHandler, FocusEventHandler } from 'react';
import { NONE_QUANTITY, base64 } from '../constants';
import { useRecoilCallback, useRecoilValue, useSetRecoilState } from 'recoil';
import {
  SelectorParams,
  updateCartSelector,
  removeProductItemFromCartSelector,
  getCartItemIdSelector,
} from '../store/CartSelector';
import { validateQuantityInput } from '../utils/validateQuantityInput';
import { CART_BASE_URL } from '../constants/url';
import { serverState } from '../store/ServerState';
import { CartItem } from '../types';
import { cartState } from '../store/CartState';
import useMutation from './useMutation';
import useToast from './useToast';

export const useProduct = (productId: number) => {
  const newQuantity = useRecoilValue(updateCartSelector({ id: productId }));
  const serverUrl = useRecoilValue(serverState);
  const setCart = useSetRecoilState(cartState);
  const findCartItemId = useRecoilValue(getCartItemIdSelector(productId));

  const updateCart = useRecoilCallback(({ set }) => ({ id, cartId, quantity }: SelectorParams) => {
    set(updateCartSelector({ id, cartId, quantity }), 0);
  });

  const removeProductItemFromCart = useRecoilCallback(({ set }) => (productId: number) => {
    set(removeProductItemFromCartSelector(productId), []);
  });

  const { mutate, isLoading, error } = useMutation<CartItem[]>(setCart);

  const { toast } = useToast();

  const addItemToCart = () => {
    mutate(
      {
        url: `${serverUrl}${CART_BASE_URL}`,
        method: 'POST',
        bodyData: { productId },
        headers: {
          Authorization: `basic ${base64}`,
          'Content-Type': 'application/json',
        },
      },
      CART_BASE_URL,
    );

    if (error) return;

    toast.success('🧺 상품이 장바구니에 담겼습니다.');
    updateCart({
      id: productId,
      cartId: findCartItemId,
      quantity: 1,
    });
  };

  const updateItem = (quantity: number) => {
    if (findCartItemId < 0) return;

    mutate(
      {
        url: `${serverUrl}${CART_BASE_URL}/${findCartItemId}`,
        method: 'PATCH',
        bodyData: { quantity },
        headers: {
          Authorization: `Basic ${base64}`,
          'Content-Type': 'application/json',
        },
      },
      CART_BASE_URL,
    );
    if (error) return;

    updateCart({ id: productId, cartId: findCartItemId, quantity });
  };

  const removeItem = () => {
    if (findCartItemId < 0) return;

    mutate(
      {
        url: `${serverUrl}${CART_BASE_URL}/${findCartItemId}`,
        method: 'DELETE',
        bodyData: { productId },
        headers: {
          Authorization: `Basic ${base64}`,
          'Content-Type': 'application/json',
        },
      },
      CART_BASE_URL,
    );
    if (error) return;

    toast.success('🥲 상품을 장바구니에서 꺼냈습니다.');
    removeProductItemFromCart(productId);
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
    isLoading,
  };
};
