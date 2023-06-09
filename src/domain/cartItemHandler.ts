import type { CartItemType } from '../types/product';

export const findTargetProduct = (
  cartItems: CartItemType[],
  productId: number
) => cartItems.find((cartItem) => productId === cartItem.product.productId);

export const deleteCartProduct = (
  cartItems: CartItemType[],
  productId: number
): CartItemType[] =>
  cartItems.filter((cartItem) => cartItem.product.productId !== productId);
