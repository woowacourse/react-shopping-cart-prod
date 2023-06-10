import { selector, selectorFamily } from 'recoil';
import { CartItem, Product } from '../types';
import { cartState } from './CartState';
import { CART_ITEM_INDEX, NONE_QUANTITY } from '../constants';
import { productListState } from './ProductListState';

export type SelectorParams = {
  id: number;
  cartId?: number;
  quantity?: number;
};

export type CheckedParams = {
  id: number;
  isChecked?: boolean;
};

export const productFindByIdSelector = selectorFamily<CartItem | undefined, number>({
  key: 'productFindByIdFamily',
  get:
    (id: number) =>
    ({ get }) => {
      const cart = get(cartState);
      return cart.find((item) => item.product.id === id);
    },
});

export const cartBadgeSelector = selector({
  key: 'cartBadgeSelector',
  get: ({ get }) => {
    const cart = get(cartState);

    return cart.length;
  },
});

export const isSelectedProductSelector = selectorFamily<boolean, number>({
  key: 'isSelectedProductSelector',
  get:
    (id: number) =>
    ({ get }) => {
      const cart = get(cartState);

      return cart.some((item) => item.product.id === id);
    },
});

export const getCartItemIdSelector = selectorFamily<number, number>({
  key: 'getCartItemIdSelector',
  get:
    (id: number) =>
    ({ get }) => {
      const cart = get(cartState);
      const findItem = cart.find((item) => item.product.id === id);
      if (findItem) return findItem.id;
      return -1;
    },
});

export const selectedProductSelector = selectorFamily<Product, number>({
  key: 'selectedProductSelector',
  get:
    (id: number) =>
    ({ get }) => {
      const productList = get(productListState);
      const selectedProduct = productList.find((item) => item.id === id)!;

      return selectedProduct;
    },
});

export const updateCartSelector = selectorFamily<number, SelectorParams>({
  key: 'addToCartSelector',
  get:
    ({ id }) =>
    ({ get }): number => {
      const cart = get(cartState);
      const product = cart.find((item) => item.product.id === id);
      if (!product) return NONE_QUANTITY;

      return product.quantity;
    },
  set:
    ({ id, cartId, quantity = 0 }) =>
    ({ get, set }) => {
      const cart = get(cartState);
      const productList = get(productListState);
      const cartItemIndex = cart.findIndex((item) => item.product.id === id);

      const updatedItem = {
        id: cartId!,
        quantity,
        product: productList.find((item) => item.id === id)!,
      };

      const updatedCart =
        cartItemIndex >= CART_ITEM_INDEX
          ? cart.map((item, index) => (index === cartItemIndex ? updatedItem : item))
          : [...cart, updatedItem];

      set(cartState, updatedCart);
    },
});

export const removeProductItemFromCartSelector = selectorFamily<CartItem[], number>({
  key: 'removeProductItemFromCartSelector',
  get:
    () =>
    ({ get }) =>
      get(cartState),
  set:
    (id: number) =>
    ({ get, set }) => {
      const updatedCart = get(cartState).filter((item) => item.id !== id);

      set(cartState, updatedCart);
    },
});

export const totalPriceSelector = selectorFamily<number, number[]>({
  key: 'totalPriceSelector',
  get:
    (selectedItems: number[]) =>
    ({ get }) => {
      const selectedProducts = get(cartState).filter((item) => selectedItems.includes(item.id));
      const subTotal = selectedProducts.reduce((total, item) => {
        const quantity = item.quantity;
        const price = item.product.price;

        return total + quantity * price;
      }, 0);

      return subTotal;
    },
});
