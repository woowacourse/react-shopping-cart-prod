import apiClient from 'api';
import { AxiosError } from 'axios';
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
  updateCartLoading: boolean;
  error: Error | null;
  items: CartItem[];
};

type Action =
  | ReturnType<typeof deleteBySelectedItems>
  | ReturnType<typeof selectItem>
  | ReturnType<typeof selectAllItems>
  | ReturnType<typeof loadCartsRequest>
  | ReturnType<typeof loadCartsSuccess>
  | ReturnType<typeof loadCartsFailure>
  | ReturnType<typeof addCartRequest>
  | ReturnType<typeof addCartSuccess>
  | ReturnType<typeof addCartFailure>
  | ReturnType<typeof deleteCartRequest>
  | ReturnType<typeof deleteCartSuccess>
  | ReturnType<typeof deleteCartFailure>
  | ReturnType<typeof updateCartRequest>
  | ReturnType<typeof updateCartSuccess>
  | ReturnType<typeof updateCartFailure>
  | ReturnType<typeof resetCartError>;

const initialState: CartState = {
  loading: false,
  updateCartLoading: false,
  error: null,
  items: [],
};

const LOAD_CARTS_REQUEST = 'cart/LOAD_REQUEST' as const;
const LOAD_CARTS_SUCCESS = 'cart/LOAD_SUCCESS' as const;
const LOAD_CARTS_FAILURE = 'cart/LOAD_FAILURE' as const;

const ADD_CART_REQUEST = 'cart/ADD_REQUEST' as const;
const ADD_CART_SUCCESS = 'cart/ADD_SUCCESS' as const;
const ADD_CART_FAILURE = 'cart/ADD_FAILURE' as const;

const DELETE_CART_REQUEST = 'cart/DELETE_REQUEST' as const;
const DELETE_CART_SUCCESS = 'cart/DELETE_SUCCESS' as const;
const DELETE_CART_FAILURE = 'cart/DELETE_FAILURE' as const;

const UPDATE_CART_REQUEST = 'cart/UPDATE_REQUEST' as const;
const UPDATE_CART_SUCCESS = 'cart/UPDATE_SUCCESS' as const;
const UPDATE_CART_FAILURE = 'cart/UPDATE_FAILURE' as const;

const DELETE_BY_SELECTED = 'cart/DELETE_BY_SELECTED' as const;
const SELECT = 'cart/SELECT' as const;
const SELECT_ALL = 'cart/SELECT_ALL' as const;
const RESET_CART_ERROR = 'cart/RESET_ERROR' as const;

const loadCartsRequest = () => ({ type: LOAD_CARTS_REQUEST });
const loadCartsSuccess = (cartList: CartItem[]) => ({
  type: LOAD_CARTS_SUCCESS,
  payload: { cartList },
});
const loadCartsFailure = (error: Error) => ({ type: LOAD_CARTS_FAILURE, payload: { error } });

const addCartRequest = () => ({ type: ADD_CART_REQUEST });
const addCartSuccess = () => ({ type: ADD_CART_SUCCESS });
const addCartFailure = (error: Error) => ({ type: ADD_CART_FAILURE, payload: { error } });

const deleteCartRequest = () => ({ type: DELETE_CART_REQUEST });
const deleteCartSuccess = (cartId: number) => ({ type: DELETE_CART_SUCCESS, payload: { cartId } });
const deleteCartFailure = (error: Error) => ({ type: DELETE_CART_FAILURE, payload: { error } });

const updateCartRequest = () => ({ type: UPDATE_CART_REQUEST });
const updateCartSuccess = (cartId: number, quantity: number) => ({
  type: UPDATE_CART_SUCCESS,
  payload: { cartId, quantity },
});
const updateCartFailure = (error: Error) => ({ type: UPDATE_CART_FAILURE, payload: { error } });

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
const resetCartError = () => ({ type: RESET_CART_ERROR });

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
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      dispatch(loadCartsFailure(error.response?.data));
    }
  }
};

const addCartAPI =
  (
    item: { name: string; price: number; imageUrl: string; id: number },
    onSuccess?: () => void
  ): any =>
  async (dispatch: AppDispatch) => {
    dispatch(addCartRequest());
    try {
      await apiClient.post('/api/customers/me/carts', item, {
        headers: {
          Authorization: `Bearer ${getCookie('accessToken')}`,
        },
      });
      dispatch(addCartSuccess());
      onSuccess?.();
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        dispatch(addCartFailure(error.response?.data));
      }
    }
  };

const deleteCartAPI =
  (cartId: number, onSuccess?: () => void): any =>
  async (dispatch: AppDispatch) => {
    dispatch(deleteCartRequest());
    try {
      await apiClient.delete(`/api/customers/me/carts/${cartId}`, {
        headers: {
          Authorization: `Bearer ${getCookie('accessToken')}`,
        },
      });
      dispatch(deleteCartSuccess(cartId));
      onSuccess?.();
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        dispatch(deleteCartFailure(error.response?.data));
      }
    }
  };

const updateCartAPI =
  (cartId: number, quantity: number): any =>
  async (dispatch: AppDispatch) => {
    dispatch(updateCartRequest());
    try {
      await apiClient.patch(
        `/api/customers/me/carts/${cartId}`,
        { quantity },
        {
          headers: {
            Authorization: `Bearer ${getCookie('accessToken')}`,
          },
        }
      );
      dispatch(updateCartSuccess(cartId, quantity));
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        dispatch(updateCartFailure(error.response?.data));
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
    case ADD_CART_REQUEST: {
      return { ...state, loading: true, error: null };
    }
    case ADD_CART_SUCCESS: {
      return { ...state, loading: false };
    }
    case ADD_CART_FAILURE: {
      const { error } = action.payload;

      return { ...state, loading: false, error };
    }
    case DELETE_CART_REQUEST: {
      return { ...state, loading: true, error: null };
    }
    case DELETE_CART_SUCCESS: {
      const { cartId } = action.payload;
      const newItems = state.items.filter((item) => item.id !== cartId);

      return { ...state, loading: false, items: newItems };
    }
    case DELETE_CART_FAILURE: {
      const { error } = action.payload;

      return { ...state, loading: false, error };
    }
    case UPDATE_CART_REQUEST: {
      return { ...state, updateCartLoading: true, error: null };
    }
    case UPDATE_CART_SUCCESS: {
      const { cartId, quantity } = action.payload;
      const targetIndex = state.items.findIndex((item) => item.id === cartId);
      const newItems = [...state.items];
      newItems[targetIndex].quantity = quantity;

      return { ...state, updateCartLoading: false, items: newItems };
    }
    case UPDATE_CART_FAILURE: {
      const { error } = action.payload;

      return { ...state, updateCartLoading: false, error };
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
    case RESET_CART_ERROR: {
      return { ...state, error: null };
    }
    case DELETE_BY_SELECTED: {
      const newItems = state.items.filter((item) => !item.isSelected);

      return { ...state, items: newItems };
    }
    default:
      return state;
  }
};

export const selectCartState = (state: RootState) => state.cart;

export {
  deleteBySelectedItems,
  selectItem,
  selectAllItems,
  loadCartsAPI,
  addCartAPI,
  deleteCartAPI,
  updateCartAPI,
  resetCartError,
};

export default cartReducer;
