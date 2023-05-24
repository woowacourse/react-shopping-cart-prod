import { CART_LIST_LOCAL_STORAGE_KEY } from '../constants';
import productListData from '../data/mockData.json';
import { CartItemData } from '../types';
import { getFromLocalStorage, saveToLocalStorage } from '../utils/localStorage';

const getCartData = () => {
  return getFromLocalStorage<CartItemData[]>(CART_LIST_LOCAL_STORAGE_KEY) ?? [];
};

const setCartData = (newCartList: CartItemData[]) => {
  saveToLocalStorage(CART_LIST_LOCAL_STORAGE_KEY, newCartList);
};

const checkItemInCart = (cartList: CartItemData[], cartItemId: number) => {
  return cartList.some((cartItem) => cartItem.id === cartItemId);
};

const addCartItem = (cartList: CartItemData[], productId: number) => {
  const newCartId = Number(new Date());
  const product = productListData.find((productItem) => productItem.id === productId);

  if (!product) return null;

  return [...cartList, { id: newCartId, quantity: 1, product }];
};

const changeCartItemQuantity = (cartList: CartItemData[], cartItemId: number, quantity: number) => {
  const hasItem = checkItemInCart(cartList, cartItemId);

  if (!hasItem) return null;

  return cartList.map((cartItem) => {
    if (cartItem.id === cartItemId) {
      return { ...cartItem, quantity };
    }

    return cartItem;
  });
};

const removeCartItem = (cartList: CartItemData[], cartItemId: number) => {
  const hasItem = checkItemInCart(cartList, cartItemId);

  if (!hasItem) return null;

  return cartList.filter((cartItem) => cartItem.id !== cartItemId);
};

export {
  getCartData,
  setCartData,
  checkItemInCart,
  addCartItem,
  changeCartItemQuantity,
  removeCartItem,
};
