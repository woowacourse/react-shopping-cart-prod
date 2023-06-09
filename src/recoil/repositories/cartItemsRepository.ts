import { selectorFamily } from 'recoil';
import type { Client } from '../../api';
import type { CartItem } from '../../types/CartItem';
import type { Product } from '../../types/Product';
import cartItemsState from '../atoms/cartItemsState';
import remoteCartItemsStorage from '../storages/remoteCartItemsStorage';

type CartItemsRepository = {
  getCartItems(): CartItem[];
  getCheckedCartItems(): CartItem[];
  getCartItemByProductId(productId: Product['id']): CartItem | null;
  addCartItem(cartItem: CartItem): void;
  addCartItemByProduct(product: Product): void;
  setQuantity(product: Product, quantity: CartItem['quantity']): void;
  setChecked(cartItem: CartItem, checked: CartItem['checked']): void;
  removeCartItem(cartItem: CartItem): void;
  removeCartItemByProductId(productId: Product['id']): void;
  removeCheckedCartItem(): void;
  doDownstreamSync(): void;
};

const cartItemsRepository = selectorFamily<CartItemsRepository, Client>({
  key: 'cartItemsRepository',
  get:
    (client) =>
    ({ get, getCallback }) => {
      const cartItems = get(cartItemsState(client));
      const storage = get(remoteCartItemsStorage(client));

      return {
        getCartItems() {
          return cartItems;
        },
        getCheckedCartItems() {
          return cartItems.filter((cartItem) => cartItem.checked);
        },
        getCartItemByProductId(productId) {
          return cartItems.find((cartItem) => cartItem.product.id === productId) ?? null;
        },
        addCartItem: getCallback(({ set }) => (cartItem) => {
          set(cartItemsState(client), (cartItems) => [...cartItems, cartItem]);
        }),
        addCartItemByProduct: getCallback(({ set }) => (product) => {
          set(cartItemsState(client), (cartItems) => [
            ...cartItems,
            {
              checked: true,
              product,
              quantity: 1,
            },
          ]);
        }),
        setQuantity: getCallback(({ set }) => (product, quantity) => {
          set(cartItemsState(client), (cartItems) => {
            const cartItem =
              cartItems.find((cartItem) => cartItem.product.id === product.id) ?? null;

            return cartItem === null
              ? [...cartItems, { product, quantity, checked: true }]
              : cartItems.map((it) =>
                  it.product.id === cartItem.product.id ? { ...it, quantity } : it,
                );
          });
        }),
        setChecked: getCallback(({ set }) => (cartItem, checked) => {
          set(cartItemsState(client), (cartItems) =>
            cartItems.map((it) =>
              it.product.id === cartItem.product.id ? { ...it, checked } : it,
            ),
          );
        }),
        removeCartItem: getCallback(({ set }) => (cartItem) => {
          set(cartItemsState(client), (cartItems) =>
            cartItems.filter((it) => it.product.id !== cartItem.product.id),
          );
        }),
        removeCartItemByProductId: getCallback(({ set }) => (productId) => {
          set(cartItemsState(client), (cartItems) =>
            cartItems.filter((cartItem) => cartItem.product.id !== productId),
          );
        }),
        removeCheckedCartItem: getCallback(({ set }) => () => {
          set(cartItemsState(client), (cartItems) =>
            cartItems.filter((cartItem) => !cartItem.checked),
          );
        }),
        doDownstreamSync: () => {
          storage.doDownstreamSync();
        },
      };
    },
});

export default cartItemsRepository;
