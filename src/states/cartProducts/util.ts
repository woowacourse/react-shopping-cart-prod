import type { CartProduct, Product } from '../../types/product';

export const findTargetProduct = (
  cartProducts: CartProduct[],
  productId: number,
  cartItemId?: number
) =>
  cartProducts.find((cartProduct) =>
    cartItemId
      ? cartItemId === cartProduct.id
      : productId === cartProduct.product.id
  );

export const addTargetProduct = (
  cartProducts: CartProduct[],
  cartItemId: number,
  product: Product
) => [...cartProducts, { id: cartItemId, quantity: 1, product }];

export const deleteTargetProduct = (cartProducts: CartProduct[], id: number) =>
  cartProducts.filter((cartProduct) => cartProduct.id !== id);

export const updateTargetQuantity = (
  cartProducts: CartProduct[],
  id: number,
  quantity: number
) =>
  cartProducts.map((cartProduct) => {
    if (cartProduct.id === id) {
      return { ...cartProduct, quantity };
    }
    return cartProduct;
  });
