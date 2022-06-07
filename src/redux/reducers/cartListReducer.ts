import { CART_LIST_ACTION_TYPE, CartListAction } from 'redux/actions/cartList';
import { AsyncStatus, createReducer } from 'redux/utils';
import { CartItem } from 'types/domain';

interface CartItemState {
  data: CartItem[];
  loading: boolean;
  error: string | null;
}

const initialState: CartItemState = {
  data: [],
  loading: false,
  error: null,
};

const getCartList = (state: CartItemState, action: CartListAction) => {
  switch (action.status) {
    case AsyncStatus.PENDING:
      return { loading: true, error: null, data: state.data };

    case AsyncStatus.SUCCESS:
      return { loading: false, error: null, data: action.payload };

    case AsyncStatus.FAILURE:
      return { loading: true, error: action.payload, data: state.data };
  }
};

const putCartItem = (state: CartItemState, action: CartListAction) => {
  switch (action.status) {
    case AsyncStatus.PENDING:
      return { loading: true, error: null, data: state.data };

    case AsyncStatus.SUCCESS: {
      const newCartList = state.data.map(cartItem =>
        cartItem.id === action.payload.id ? action.payload : cartItem
      );

      return { loading: false, error: null, data: newCartList };
    }

    case AsyncStatus.FAILURE:
      return { loading: true, error: action.payload, data: state.data };
  }
};

const postCartItem = (state: CartItemState, action: CartListAction) => {
  switch (action.status) {
    case AsyncStatus.PENDING:
      return { loading: true, error: null, data: state.data };

    case AsyncStatus.SUCCESS:
      return {
        loading: false,
        error: null,
        data: [...state.data, action.payload],
      };

    case AsyncStatus.FAILURE:
      return { loading: true, error: action.payload, data: state.data };
  }
};

const deleteCartItem = (state: CartItemState, action: CartListAction) => {
  switch (action.status) {
    case AsyncStatus.PENDING:
      return { loading: true, error: null, data: state.data };

    case AsyncStatus.SUCCESS: {
      const newCartItemList = state.data.filter(item => item.id !== action.payload.id);

      return {
        loading: false,
        error: null,
        data: newCartItemList,
      };
    }

    case AsyncStatus.FAILURE:
      return { loading: true, error: action.payload, data: state.data };
  }
};

export const cartListReducer = createReducer(initialState, {
  [CART_LIST_ACTION_TYPE.GET_CART_LIST]: getCartList,
  [CART_LIST_ACTION_TYPE.PUT_CART_ITEM]: putCartItem,
  [CART_LIST_ACTION_TYPE.POST_CART_ITEM]: postCartItem,
  [CART_LIST_ACTION_TYPE.DELETE_CART_ITEM]: deleteCartItem,
});
