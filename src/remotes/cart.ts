import { httpRequestWithBase64 } from './http';
import type { CartItem } from '../types/cart';
import type { Product } from '../types/product';

export const fetchCartItems = async (url: string, base64: string) => {
  const { _get } = httpRequestWithBase64(base64);
  const response = await _get(url);

  if (!response.ok) {
    throw new Error('장바구니 목록을 불러올 수 없습니다.');
  }

  const cartItems = await response.json();

  return cartItems;
};

export const addCartItem = async (
  url: string,
  productId: Product['id'],
  base64: string,
) => {
  const { _post } = httpRequestWithBase64(base64, productId);
  const response = await _post(url);

  if (!response.ok) {
    throw new Error('장바구니 추가에 실패했습니다.');
  }
};

export const updateQuantity = async (
  url: string,
  quantity: CartItem['quantity'],
  base64: string,
) => {
  const { _patch } = httpRequestWithBase64(base64, quantity);
  const response = await _patch(url);

  if (!response.ok) {
    throw new Error('수량 업데이트에 실패했습니다.');
  }
};

export const removeCartItem = async (url: string, base64: string) => {
  const { _delete } = httpRequestWithBase64(base64);
  const response = await _delete(url);

  if (!response.ok) {
    throw new Error('장바구니에서 삭제하는 데 실패했습니다.');
  }
};
