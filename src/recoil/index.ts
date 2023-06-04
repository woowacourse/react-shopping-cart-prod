import { AtomEffect, DefaultValue, atom, selector, selectorFamily } from 'recoil';
import { INITIAL_COUPON_STATE, KEY_SERVER, QUANTITY } from '../constants';
import { SERVERS } from '../constants/url';
import { CartItem, CouponState, Product } from '../types';

export const productListState = atom<Product[]>({
  key: 'productListState',
  default: [],
});

export const productSelector = selectorFamily({
  key: 'productSelector',
  get:
    (id) =>
    ({ get }) => {
      const productList = get(productListState);
      const selectedProduct = productList.find((product) => product.id === id);

      return selectedProduct;
    },
});

const logEffect: <T>(header: string) => AtomEffect<T> =
  (header: string) =>
  ({ onSet }) => {
    onSet((newValue) => {
      console.log(`[${header}]`, newValue);
    });
  };

export const cartState = atom<CartItem[]>({
  key: 'cartState',
  default: [],
  effects: [logEffect('cart')],
});

export const quantitySelector = selectorFamily({
  key: 'quantitySelector',
  get:
    (id) =>
    ({ get }) => {
      const cart = get(cartState);
      const selectedCartItem = cart.find((item) => item.product.id === id);

      if (!selectedCartItem) return QUANTITY.NONE;
      return selectedCartItem.quantity;
    },

  set:
    (id) =>
    ({ get, set }, newQuantity) => {
      const cart = get(cartState);
      const selectedCartItem = cart.find((item) => item.product.id === id);

      const quantity = newQuantity instanceof DefaultValue ? QUANTITY.INITIAL : newQuantity;

      const newCart = cart.map((cartItem) =>
        cartItem === selectedCartItem ? { ...cartItem, quantity } : cartItem
      );

      set(cartState, newCart);
    },
});

export const cartBadgeSelector = selector({
  key: 'cartBadgeSelector',
  get: ({ get }) => {
    const cart = get(cartState);
    const selectedProducts = new Set(cart);

    return selectedProducts;
  },
});

export const checkedItemList = atom<number[]>({
  key: 'checkedItemIdList',
  default: [],
});

export const totalPriceSelector = selector<number>({
  key: 'totalPriceSelector',
  get: ({ get }) => {
    const cart = get(cartState);
    const checkedItemIdList = get(checkedItemList);
    const checkedProductsInCart = cart.filter((item) => checkedItemIdList.includes(item.id));

    const totalPrice = checkedProductsInCart.reduce((acc, cur) => {
      return acc + cur.product.price * cur.quantity;
    }, 0);

    return totalPrice;
  },
});

export const serverState = atom({
  key: 'serverState',
  default: localStorage.getItem(KEY_SERVER) ?? `${SERVERS.준팍}`,
});

export const selectedCoupon = atom<CouponState>({
  key: 'selectedCoupon',
  default: INITIAL_COUPON_STATE,
  effects: [logEffect('coupon')],
});
