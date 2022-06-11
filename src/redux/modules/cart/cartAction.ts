import { CartItem } from '@/types';

const LOAD_CART = 'LOAD_CART' as const;
const LOAD_CART_SUCCESS = 'LOAD_CART_SUCCESS' as const;
const LOAD_CART_FAILURE = 'LOAD_CART_FAILURE' as const;

const ADD_ITEM = 'cart/ADD_ITEM' as const;
const ADD_ITEM_SUCCESS = 'cart/ADD_ITEM_SUCCESS' as const;
const ADD_ITEM_FAILURE = 'cart/ADD_ITEM_FAILURE' as const;

const DELETE_ITEM = 'cart/DELETE_ITEM' as const;
const DELETE_ITEM_SUCCESS = 'cart/DELETE_ITEM_SUCCESS' as const;
const DELETE_ITEM_FAILURE = 'cart/DELETE_ITEM_FAILURE' as const;

const UPDATE_QUANTITY = 'cart/UPDATE_QUANTITY' as const;
const UPDATE_QUANTITY_SUCCESS = 'cart/UPDATE_QUANTITY_SUCCESS' as const;
const UPDATE_QUANTITY_FAILURE = 'cart/UPDATE_QUANTITY_FAILURE' as const;

const SELECT = 'cart/SELECT' as const;
const SELECT_ALL = 'cart/SELECT_ALL' as const;

const DELETE_BY_SELECTED = 'cart/DELETE_BY_SELECTED' as const;
const DELETE_BY_SELECTED_SUCCESS = 'cart/DELETE_BY_SELECTED_SUCCESS' as const;
const DELETE_BY_SELECTED_FAILURE = 'cart/DELETE_BY_SELECTED_FAILURE' as const;

const loadCart = () => ({ type: LOAD_CART });

const loadCartSuccess = (items: CartItem[]) => ({
  type: LOAD_CART_SUCCESS,
  payload: { items },
});

const loadCartFailure = (error: Error) => ({
  type: LOAD_CART_FAILURE,
  payload: { error },
});

const addItem = () => ({
  type: ADD_ITEM,
});

const addItemSuccess = () => ({
  type: ADD_ITEM_SUCCESS,
});

const addItemFailure = (error: Error) => ({
  type: ADD_ITEM_FAILURE,
  payload: { error },
});

const deleteItem = () => ({
  type: DELETE_ITEM,
});

const deleteItemSuccess = (cartId: number) => ({
  type: DELETE_ITEM_SUCCESS,
  payload: { cartId },
});

const deleteItemFailure = (error: Error) => ({
  type: DELETE_ITEM_FAILURE,
  payload: { error },
});

const updateQuantity = () => ({
  type: UPDATE_QUANTITY,
});

const updateQuantitySuccess = (cartId: number, quantity: number) => ({
  type: UPDATE_QUANTITY_SUCCESS,
  payload: { cartId, quantity },
});

const updateQuantityFailure = (error: Error) => ({
  type: UPDATE_QUANTITY_FAILURE,
  payload: { error },
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

const deleteBySelectedItemsSuccess = () => ({
  type: DELETE_BY_SELECTED_SUCCESS,
});

const deleteBySelectedItemsFailure = (error: Error) => ({
  type: DELETE_BY_SELECTED_FAILURE,
  payload: { error },
});

export {
  LOAD_CART,
  LOAD_CART_SUCCESS,
  LOAD_CART_FAILURE,
  ADD_ITEM,
  ADD_ITEM_SUCCESS,
  ADD_ITEM_FAILURE,
  DELETE_ITEM,
  DELETE_ITEM_SUCCESS,
  DELETE_ITEM_FAILURE,
  UPDATE_QUANTITY,
  UPDATE_QUANTITY_SUCCESS,
  UPDATE_QUANTITY_FAILURE,
  SELECT,
  SELECT_ALL,
  DELETE_BY_SELECTED,
  DELETE_BY_SELECTED_SUCCESS,
  DELETE_BY_SELECTED_FAILURE,
};

export {
  loadCart,
  loadCartSuccess,
  loadCartFailure,
  addItem,
  addItemSuccess,
  addItemFailure,
  deleteItem,
  deleteItemSuccess,
  deleteItemFailure,
  updateQuantity,
  updateQuantitySuccess,
  updateQuantityFailure,
  selectItem,
  selectAllItems,
  deleteBySelectedItems,
  deleteBySelectedItemsSuccess,
  deleteBySelectedItemsFailure,
};
