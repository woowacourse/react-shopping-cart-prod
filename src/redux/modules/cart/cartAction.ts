import { CartItem } from '@/types';

const ADD = 'cart/ADD' as const;
const DELETE = 'cart/DELETE' as const;
const DELETE_BY_SELECTED = 'cart/DELETE_BY_SELECTED' as const;
const SELECT = 'cart/SELECT' as const;
const SELECT_ALL = 'cart/SELECT_ALL' as const;
const INCREMENT = 'cart/INCREMENT' as const;
const DECREMENT = 'cart/DECREMENT' as const;
const INCREMENT_BY_NUMBER = 'cart/INCREMENT_BY_NUMBER' as const;

const addItem = (item: CartItem) => ({
  type: ADD,
  payload: { item },
});

const deleteItem = (id: number) => ({
  type: DELETE,
  payload: { id },
});

const deleteBySelectedItems = () => ({
  type: DELETE_BY_SELECTED,
});

const selectItem = (id: number) => ({
  type: SELECT,
  payload: { id },
});

const selectAllItems = (isAllSelected: boolean) => ({
  type: SELECT_ALL,
  payload: { isAllSelected },
});

const increment = (id: number) => ({
  type: INCREMENT,
  payload: { id },
});

const decrement = (id: number) => ({
  type: DECREMENT,
  payload: { id },
});

const incrementByNumber = (id: number, number: number) => ({
  type: INCREMENT_BY_NUMBER,
  payload: { id, number },
});

export {
  ADD,
  DELETE,
  DELETE_BY_SELECTED,
  SELECT,
  SELECT_ALL,
  INCREMENT,
  DECREMENT,
  INCREMENT_BY_NUMBER,
};

export {
  addItem,
  deleteItem,
  deleteBySelectedItems,
  selectItem,
  selectAllItems,
  increment,
  decrement,
  incrementByNumber,
};
