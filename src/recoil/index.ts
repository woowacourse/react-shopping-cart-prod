import { AtomEffect, DefaultValue, atom, selector, selectorFamily } from 'recoil';
import { QUANTITY } from '../constants';
import { SERVER } from '../constants/url';
import { CartItem, Product, ServerName, ServerUrl } from '../types';

const logEffect: <T>(header: string) => AtomEffect<T> =
  (header: string) =>
  ({ onSet }) => {
    onSet((newValue) => {
      console.log(`[${header}]`, newValue);
    });
  };

export const productsState = atom<Product[]>({
  key: 'productsState',
  default: [],
  effects: [logEffect('PRODUCTS')],
});

export const productSelector = selectorFamily({
  key: 'productSelector',
  get:
    (id) =>
    ({ get }) => {
      const productList = get(productsState);

      return productList.find((product) => product.id === id);
    },
});

export const cartState = atom<CartItem[]>({
  key: 'cartState',
  default: [],
  effects: [logEffect('CART')],
});

export const quantitySelector = selectorFamily({
  key: 'quantitySelector',
  get:
    (id) =>
    ({ get }) => {
      const cart = get(cartState);
      const selectedCartItem = cart.find((item) => item.product.id === id);

      if (!selectedCartItem) {
        return QUANTITY.NONE;
      }
      return selectedCartItem.quantity;
    },

  set:
    (id) =>
    ({ get, set }, newQuantity) => {
      const cart = get(cartState);
      const selectedCartItem = cart.find((item) => item.product.id === id);
      const quantity = newQuantity instanceof DefaultValue ? QUANTITY.INITIAL : newQuantity;

      const newCart = cart.map((cartItem) => (cartItem === selectedCartItem ? { ...cartItem, quantity } : cartItem));

      set(cartState, newCart);
    },
});

export const cartBadgeSelector = selector({
  key: 'cartBadgeSelector',
  get: ({ get }) => {
    return get(cartState).length;
  },
});

export const selectedCartItems = selector({
  key: 'selectedCartItems',
  get: ({ get }) => {
    return get(cartState)
      .filter(({ isSelected }) => isSelected)
      .map(({ id }) => id);
  },
  set: ({ get, set }, newValue) => {
    if (newValue instanceof DefaultValue) return;

    const cartItems = get(cartState);
    const newCartItems = cartItems.map((cartItem) => {
      if (newValue.includes(cartItem.id)) {
        return { ...cartItem, isSelected: !cartItem.isSelected };
      }
      return cartItem;
    });

    set(cartState, newCartItems);
  },
});

export const totalPriceSelector = selector<number>({
  key: 'totalPriceSelector',
  get: ({ get }) => {
    const cart = get(cartState);
    const selectedProductsInCart = cart.filter(({ isSelected }) => isSelected);

    const totalPrice = selectedProductsInCart.reduce((total, { quantity, product: { price } }) => {
      return total + quantity * price;
    }, 0);

    return totalPrice;
  },
});

export const serverNameState = atom<ServerName>({
  key: 'serverNameState',
  default: 'MSW',
  effects: [logEffect('SERVER')],
});

export const serverState = selector<ServerUrl>({
  key: 'serverState',
  get: ({ get }) => {
    return SERVER[get(serverNameState)];
  },
});
