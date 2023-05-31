import type { CartProduct } from '../types/product';

export const findTargetProduct = (
  cartProducts: CartProduct[],
  productId: number
) =>
  cartProducts.find(
    (cartProduct) => productId === cartProduct.product.productId
  );

export const deleteCartProduct = (
  cartProducts: CartProduct[],
  cartProductId: number
): CartProduct[] =>
  cartProducts.filter(
    (cartProduct) => cartProduct.product.productId !== cartProductId
  );
