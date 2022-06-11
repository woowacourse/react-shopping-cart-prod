import { CartState } from '@/types';
import { findElementIndex } from '@/utils';

import {
  addItem,
  addItemFailure,
  addItemSuccess,
  ADD_ITEM,
  ADD_ITEM_FAILURE,
  ADD_ITEM_SUCCESS,
  deleteBySelectedItems,
  deleteBySelectedItemsFailure,
  deleteBySelectedItemsSuccess,
  deleteItem,
  deleteItemFailure,
  deleteItemSuccess,
  DELETE_BY_SELECTED,
  DELETE_BY_SELECTED_FAILURE,
  DELETE_BY_SELECTED_SUCCESS,
  DELETE_ITEM,
  DELETE_ITEM_FAILURE,
  DELETE_ITEM_SUCCESS,
  loadCart,
  loadCartFailure,
  loadCartSuccess,
  LOAD_CART,
  LOAD_CART_FAILURE,
  LOAD_CART_SUCCESS,
  SELECT,
  selectAllItems,
  selectItem,
  SELECT_ALL,
  updateQuantity,
  updateQuantityFailure,
  updateQuantitySuccess,
  UPDATE_QUANTITY,
  UPDATE_QUANTITY_FAILURE,
  UPDATE_QUANTITY_SUCCESS,
} from './cartAction';

const initialState: CartState = {
  loading: false,
  items: [],
  error: null,
};

type Action =
  | ReturnType<typeof loadCart>
  | ReturnType<typeof loadCartSuccess>
  | ReturnType<typeof loadCartFailure>
  | ReturnType<typeof addItem>
  | ReturnType<typeof addItemSuccess>
  | ReturnType<typeof addItemFailure>
  | ReturnType<typeof deleteItem>
  | ReturnType<typeof deleteItemSuccess>
  | ReturnType<typeof deleteItemFailure>
  | ReturnType<typeof updateQuantity>
  | ReturnType<typeof updateQuantitySuccess>
  | ReturnType<typeof updateQuantityFailure>
  | ReturnType<typeof selectItem>
  | ReturnType<typeof selectAllItems>
  | ReturnType<typeof deleteBySelectedItems>
  | ReturnType<typeof deleteBySelectedItemsSuccess>
  | ReturnType<typeof deleteBySelectedItemsFailure>;

const cartReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case LOAD_CART:
      return { ...state, loading: true };
    case LOAD_CART_SUCCESS: {
      const { items } = action.payload;

      return { ...state, loading: false, items };
    }
    case LOAD_CART_FAILURE: {
      const { error } = action.payload;

      return { ...state, loading: false, error };
    }
    case ADD_ITEM:
      return { ...state, loading: true };
    case ADD_ITEM_SUCCESS:
      return { ...state, loading: false };
    case ADD_ITEM_FAILURE: {
      const { error } = action.payload;

      return { ...state, loading: false, error };
    }
    case DELETE_ITEM:
      return { ...state, loading: true };
    case DELETE_ITEM_SUCCESS: {
      const { cartId } = action.payload;
      const newItems = state.items.filter((item) => item.id !== cartId);

      return { ...state, loading: false, items: newItems };
    }
    case DELETE_ITEM_FAILURE: {
      const { error } = action.payload;

      return { ...state, loading: false, error };
    }
    case UPDATE_QUANTITY:
      return { ...state, loading: true };
    case UPDATE_QUANTITY_SUCCESS: {
      const { cartId, quantity } = action.payload;
      const targetIdx = findElementIndex(state.items, 'id', cartId);
      const newItems = [...state.items];

      newItems[targetIdx].quantity = quantity;

      return { ...state, loading: false, items: newItems };
    }
    case UPDATE_QUANTITY_FAILURE: {
      const { error } = action.payload;

      return { ...state, loading: false, error };
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
      return { ...state, loading: true };
    }
    case DELETE_BY_SELECTED_SUCCESS: {
      const newItems = state.items.filter((item) => !item.isSelected);

      return { ...state, loading: false, items: newItems };
    }
    case DELETE_BY_SELECTED_FAILURE: {
      const { error } = action.payload;

      return { ...state, loading: false, error };
    }
    default:
      return state;
  }
};

export default cartReducer;
