import { CartState } from '@/types';
import { findElementIndex } from '@/utils';

import {
  addItem,
  ADD_ITEM,
  deleteBySelectedItems,
  deleteItem,
  DELETE_BY_SELECTED,
  DELETE_ITEM,
  loadCart,
  loadCartSuccess,
  LOAD_CART,
  LOAD_CART_SUCCESS,
  SELECT,
  selectAllItems,
  selectItem,
  SELECT_ALL,
  updateQuantity,
  UPDATE_QUANTITY,
} from './cartAction';

const initialState: CartState = {
  loading: false,
  items: [],
  error: null,
};

type Action =
  | ReturnType<typeof loadCart>
  | ReturnType<typeof loadCartSuccess>
  | ReturnType<typeof addItem>
  | ReturnType<typeof deleteItem>
  | ReturnType<typeof updateQuantity>
  | ReturnType<typeof selectItem>
  | ReturnType<typeof selectAllItems>
  | ReturnType<typeof deleteBySelectedItems>;

const cartReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case LOAD_CART:
      return { ...state, loading: true };
    case LOAD_CART_SUCCESS: {
      const { items } = action.payload;

      return { ...state, loading: false, items };
    }
    case ADD_ITEM:
      return { ...state, loading: false };
    case DELETE_ITEM: {
      const { cartId } = action.payload;
      const newItems = state.items.filter((item) => item.id !== cartId);

      return { ...state, loading: false, items: newItems };
    }
    case UPDATE_QUANTITY: {
      const { cartId, quantity } = action.payload;
      const targetIdx = findElementIndex(state.items, 'id', cartId);
      const newItems = [...state.items];

      newItems[targetIdx].quantity = quantity;

      return { ...state, loading: false, items: newItems };
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
    case DELETE_BY_SELECTED: {
      const newItems = state.items.filter((item) => !item.isSelected);

      return { ...state, loading: false, items: newItems };
    }
    default:
      return state;
  }
};

export default cartReducer;
