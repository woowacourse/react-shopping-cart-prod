import apiClient from 'api';
import { AppDispatch, RootState } from 'redux/store';
import { getCookie } from 'utils';

export type CartItem = {
  id: number;
  imageUrl: string;
  name: string;
  price: number;
  quantity: number;
  isSelected?: boolean;
};
export type CartState = {
  loading: boolean;
  error: Error | null;
  items: CartItem[];
};

type Action =
  | ReturnType<typeof deleteItem>
  | ReturnType<typeof deleteBySelectedItems>
  | ReturnType<typeof selectItem>
  | ReturnType<typeof selectAllItems>
  | ReturnType<typeof increment>
  | ReturnType<typeof decrement>
  | ReturnType<typeof incrementByNumber>
  | ReturnType<typeof loadCartsRequest>
  | ReturnType<typeof loadCartsSuccess>
  | ReturnType<typeof loadCartsFailure>
  | ReturnType<typeof addCartItemRequest>
  | ReturnType<typeof addCartItemSuccess>
  | ReturnType<typeof addCartItemFailure>;

const initialState: CartState = {
  loading: false,
  error: null,
  items: [],
};

const LOAD_CARTS_REQUEST = 'cart/LOAD_REQUEST' as const;
const LOAD_CARTS_SUCCESS = 'cart/LOAD_SUCCESS' as const;
const LOAD_CARTS_FAILURE = 'cart/LOAD_FAILURE' as const;

const ADD_CART_ITEM_REQUEST = 'cart/ADD_ITEM_REQUEST' as const;
const ADD_CART_ITEM_SUCCESS = 'cart/ADD_ITEM_SUCCESS' as const;
const ADD_CART_ITEM_FAILURE = 'cart/ADD_ITEM_FAILURE' as const;

// const ADD = 'cart/ADD' as const;
const DELETE = 'cart/DELETE' as const;
const DELETE_BY_SELECTED = 'cart/DELETE_BY_SELECTED' as const;
const SELECT = 'cart/SELECT' as const;
const SELECT_ALL = 'cart/SELECT_ALL' as const;
const INCREMENT = 'cart/INCREMENT' as const;
const DECREMENT = 'cart/DECREMENT' as const;
const INCREMENT_BY_NUMBER = 'cart/INCREMENT_BY_NUMBER' as const;

const loadCartsRequest = () => ({ type: LOAD_CARTS_REQUEST });
const loadCartsSuccess = (cartList: CartItem[]) => ({
  type: LOAD_CARTS_SUCCESS,
  payload: { cartList },
});
const loadCartsFailure = (error: Error) => ({ type: LOAD_CARTS_FAILURE, payload: { error } });
const addCartItemRequest = () => ({ type: ADD_CART_ITEM_REQUEST });
const addCartItemSuccess = () => ({ type: ADD_CART_ITEM_SUCCESS });
const addCartItemFailure = (error: Error) => ({ type: ADD_CART_ITEM_FAILURE, payload: { error } });

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

const loadCartsAPI = (): any => async (dispatch: AppDispatch) => {
  const token = getCookie('accessToken');
  if (!token) {
    return;
  }

  dispatch(loadCartsRequest());
  try {
    const { data: cartList } = await apiClient.get('/api/customers/me/carts', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(loadCartsSuccess(cartList));
    console.log('cartList', cartList);
  } catch (error: unknown) {
    if (error instanceof Error) {
      dispatch(loadCartsFailure(error));
    }
  }
};

const addCartAPI =
  (
    item: { name: string; price: number; imageUrl: string; id: number },
    onSuccess?: () => void
  ): any =>
  async (dispatch: AppDispatch) => {
    dispatch(addCartItemRequest());
    try {
      await apiClient.post('/api/customers/me/carts', item, {
        headers: {
          Authorization: `Bearer ${getCookie('accessToken')}`,
        },
      });
      dispatch(addCartItemSuccess());
      onSuccess?.();
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error);
        dispatch(addCartItemFailure(error));
      }
    }
  };

const cartReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case LOAD_CARTS_REQUEST: {
      return { ...state, loading: true, error: null };
    }
    case LOAD_CARTS_SUCCESS: {
      const { cartList } = action.payload;
      const newCartList = cartList.map((list) => {
        return { ...list, isSelected: false };
      });

      return { ...state, loading: false, items: newCartList };
    }
    case LOAD_CARTS_FAILURE: {
      const { error } = action.payload;

      return { ...state, loading: false, error };
    }
    case ADD_CART_ITEM_REQUEST: {
      return { ...state, loading: true, error: null };
    }
    case ADD_CART_ITEM_SUCCESS: {
      return { ...state, loading: false };
    }
    case ADD_CART_ITEM_FAILURE: {
      const { error } = action.payload;

      return { ...state, loading: false, error };
    }

    // case DELETE: {
    //   const { id } = action.payload;
    //   const newItems = state.items.filter((item) => item.id !== id);

    //   return { ...state, items: newItems };
    // }
    // case DELETE_BY_SELECTED: {
    //   const newItems = state.items.filter((item) => !item.isSelected);

    //   return { ...state, items: newItems };
    // }
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
    // case INCREMENT: {
    //   const { id } = action.payload;
    //   const targetIndex = state.items.findIndex((item) => item.id === id);
    //   const newItems = [...state.items];
    //   newItems[targetIndex].quantity++;

    //   return { ...state, items: newItems };
    // }
    // case DECREMENT: {
    //   const { id } = action.payload;
    //   const targetIndex = state.items.findIndex((item) => item.id === id);
    //   const newItems = [...state.items];
    //   newItems[targetIndex].quantity--;

    //   return { ...state, items: newItems };
    // }
    // case INCREMENT_BY_NUMBER: {
    //   const { id, number } = action.payload;
    //   const targetIndex = state.items.findIndex((item) => item.id === id);
    //   const newItems = [...state.items];
    //   newItems[targetIndex].quantity += number;

    //   return { ...state, items: newItems };
    // }
    default:
      return state;
  }
};

export const selectCartState = (state: RootState) => state.cart;

export {
  deleteItem,
  deleteBySelectedItems,
  selectItem,
  selectAllItems,
  increment,
  decrement,
  incrementByNumber,
  loadCartsAPI,
  addCartAPI,
};

export default cartReducer;
