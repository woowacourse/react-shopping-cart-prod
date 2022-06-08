import { CartState } from '@/types';

import {
  ADD,
  addItem,
  decrement,
  DECREMENT,
  DELETE,
  deleteBySelectedItems,
  deleteItem,
  DELETE_BY_SELECTED,
  increment,
  INCREMENT,
  incrementByNumber,
  INCREMENT_BY_NUMBER,
  SELECT,
  selectAllItems,
  selectItem,
  SELECT_ALL,
} from './cartAction';

const initialState: CartState = {
  items: [],
};

type Action =
  | ReturnType<typeof addItem>
  | ReturnType<typeof deleteItem>
  | ReturnType<typeof deleteBySelectedItems>
  | ReturnType<typeof selectItem>
  | ReturnType<typeof selectAllItems>
  | ReturnType<typeof increment>
  | ReturnType<typeof decrement>
  | ReturnType<typeof incrementByNumber>;

const cartReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case ADD: {
      const { item } = action.payload;
      const newItems = [...state.items, item];

      return { ...state, items: newItems };
    }
    case DELETE: {
      const { id } = action.payload;
      const newItems = state.items.filter((item) => item.id !== id);

      return { ...state, items: newItems };
    }
    case DELETE_BY_SELECTED: {
      const newItems = state.items.filter((item) => !item.isSelected);

      return { ...state, items: newItems };
    }
    case SELECT: {
      const { id } = action.payload;
      const targetIndex = state.items.findIndex((item) => item.id === id);
      const newItems = [...state.items];

      newItems[targetIndex].isSelected = !newItems[targetIndex].isSelected;

      return { ...state, items: newItems };
    }
    case SELECT_ALL: {
      const { isAllSelected } = action.payload;
      const newItems = [...state.items].map((item) => {
        item.isSelected = isAllSelected ? false : true;
        return item;
      });

      return { ...state, items: newItems };
    }
    case INCREMENT: {
      const { id } = action.payload;
      const targetIndex = state.items.findIndex((item) => item.id === id);
      const newItems = [...state.items];

      newItems[targetIndex].quantity++;

      return { ...state, items: newItems };
    }
    case DECREMENT: {
      const { id } = action.payload;
      const targetIndex = state.items.findIndex((item) => item.id === id);
      const newItems = [...state.items];

      newItems[targetIndex].quantity--;

      return { ...state, items: newItems };
    }
    case INCREMENT_BY_NUMBER: {
      const { id, number } = action.payload;
      const targetIndex = state.items.findIndex((item) => item.id === id);
      const newItems = [...state.items];

      newItems[targetIndex].quantity += number;

      return { ...state, items: newItems };
    }
    default:
      return state;
  }
};

export default cartReducer;
