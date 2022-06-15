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

const patchCartItem = (state: CartItemState, action: CartListAction) => {
  switch (action.status) {
    case AsyncStatus.PENDING:
      return { loading: true, error: null, data: state.data };

    case AsyncStatus.SUCCESS: {
      const newCartList = state.data.map(
        cartItem =>
          action.payload.find(editedCartItem => editedCartItem.productId === cartItem.productId) ||
          cartItem
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

const deleteSelectedCartItem = (state: CartItemState, action: CartListAction) => {
  switch (action.status) {
    case AsyncStatus.PENDING:
      return { loading: true, error: null, data: state.data };

    case AsyncStatus.SUCCESS: {
      const targetIdList = action.payload.map(idData => idData.id);
      const newCartItemList = state.data.filter(item => !targetIdList.includes(item.id));

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

const deleteAllCartItem = (state: CartItemState, action: CartListAction) => {
  switch (action.status) {
    case AsyncStatus.PENDING:
      return { loading: true, error: null, data: state.data };

    case AsyncStatus.SUCCESS:
      return {
        loading: false,
        error: null,
        data: {},
      };

    case AsyncStatus.FAILURE:
      return { loading: true, error: action.payload, data: state.data };
  }
};

export const cartListReducer = createReducer(initialState, {
  [CART_LIST_ACTION_TYPE.GET_CART_LIST]: getCartList,
  [CART_LIST_ACTION_TYPE.PATCH_CART_ITEM]: patchCartItem,
  [CART_LIST_ACTION_TYPE.POST_CART_ITEM]: postCartItem,
  [CART_LIST_ACTION_TYPE.DELETE_SELECTED_CART_ITEM]: deleteSelectedCartItem,
  [CART_LIST_ACTION_TYPE.DELETE_ALL_CART_ITEM]: deleteAllCartItem,
});
