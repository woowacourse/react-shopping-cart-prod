import { CartProduct } from '../../types/product';

export const getIsAllChecked = (
  cartProducts: CartProduct[],
  checked: CartProduct[]
) => checked.length > 0 && checked.length === cartProducts.length;

export const getIsAllUnchecked = (checked: CartProduct[]) =>
  checked.length === 0;

export const findTargetChecked = (checked: CartProduct[], id: number) =>
  checked.find((item) => item.id === id);

export const addCartProductChecked = (
  cartProducts: CartProduct[],
  newCartProduct: CartProduct
) => [...cartProducts, newCartProduct];

export const deleteCartProductChecked = (
  cartProducts: CartProduct[],
  id: number
) => cartProducts.filter((cartProduct) => cartProduct.id !== id);

export const getCheckedPrice = (cartProducts: CartProduct[]) =>
  cartProducts.reduce((acc, cur) => acc + cur.quantity * cur.product.price, 0);
