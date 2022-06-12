import { CartItem } from '@/types';

const LOAD_CART = 'LOAD_CART' as const;
const LOAD_CART_SUCCESS = 'LOAD_CART_SUCCESS' as const;

const ADD_ITEM = 'cart/ADD_ITEM' as const;
const DELETE_ITEM = 'cart/DELETE_ITEM' as const;
const UPDATE_QUANTITY = 'cart/UPDATE_QUANTITY' as const;
const SELECT = 'cart/SELECT' as const;
const SELECT_ALL = 'cart/SELECT_ALL' as const;
const DELETE_BY_SELECTED = 'cart/DELETE_BY_SELECTED' as const;

const loadCart = () => ({ type: LOAD_CART });

const loadCartSuccess = (items: CartItem[]) => ({
  type: LOAD_CART_SUCCESS,
  payload: { items },
});

const addItem = () => ({
  type: ADD_ITEM,
});

const deleteItem = (cartId: number) => ({
  type: DELETE_ITEM,
  payload: { cartId },
});

const updateQuantity = (cartId: number, quantity: number) => ({
  type: UPDATE_QUANTITY,
  payload: { cartId, quantity },
});

const selectItem = (id: number) => ({
  type: SELECT,
  payload: { id },
});

const selectAllItems = (isAllSelected: boolean) => ({
  type: SELECT_ALL,
  payload: { isAllSelected },
});

const deleteBySelectedItems = () => ({
  type: DELETE_BY_SELECTED,
});

export {
  LOAD_CART,
  LOAD_CART_SUCCESS,
  ADD_ITEM,
  DELETE_ITEM,
  UPDATE_QUANTITY,
  SELECT,
  SELECT_ALL,
  DELETE_BY_SELECTED,
};

export {
  loadCart,
  loadCartSuccess,
  addItem,
  deleteItem,
  updateQuantity,
  selectItem,
  selectAllItems,
  deleteBySelectedItems,
};
