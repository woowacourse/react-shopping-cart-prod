import type { CartProduct } from '../types/product';

export const findTargetProduct = (
  cartProducts: CartProduct[],
  cartProductId: number
) =>
  cartProducts.find(
    (cartProduct) => cartProductId === cartProduct.product.productId
  );

export const deleteCartProduct = (
  cartProducts: CartProduct[],
  cartProductId: number
): CartProduct[] =>
  cartProducts.filter(
    (cartProduct) => cartProduct.product.productId !== cartProductId
  );
