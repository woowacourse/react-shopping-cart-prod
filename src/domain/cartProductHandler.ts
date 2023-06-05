import type { CartItem } from '../types/product';

export const findTargetProduct = (cartItems: CartItem[], productId: number) =>
  cartItems.find((cartItem) => productId === cartItem.product.productId);

export const deleteCartProduct = (
  cartItems: CartItem[],
  productId: number
): CartItem[] =>
  cartItems.filter((cartItem) => cartItem.product.productId !== productId);
