import { CartListAction } from 'redux/cartList/action';
import { CartItem } from 'types/domain';

export interface CartListState {
  readonly loading:
    | 'getCartList'
    | 'postCartList'
    | 'putCartItem'
    | 'deleteCartItem'
    | 'deleteAllCartItem'
    | null;
  readonly error: Error | null;
  readonly data: CartItem[];
}

export const initialState: CartListState = {
  loading: 'getCartList',
  error: null,
  data: [],
};

export const cartListReducer = (state = initialState, action: CartListAction): CartListState => {
  switch (action.type) {
    case 'cart/GET_CART_LIST_REQUEST':
      return { ...state, loading: 'getCartList' };
    case 'cart/GET_CART_LIST_SUCCESS': {
      const cartList = action.payload.map(cart => ({ ...cart, isChecked: true }));

      return { ...state, loading: null, data: cartList };
    }
    case 'cart/GET_CART_LIST_FAILURE':
      return { ...state, loading: null, error: action.payload };

    case 'cart/PUT_CART_ITEM_REQUEST':
      return { ...state, loading: 'putCartItem' };
    case 'cart/PUT_CART_ITEM_SUCCESS': {
      const prevCartList = state.data;
      const isChecked = prevCartList.find(cart => cart.id === action.payload.id).isChecked;
      const targetItem = { ...action.payload, isChecked };
      const newCartList = prevCartList.map(cartItem =>
        cartItem.id === targetItem.id ? targetItem : cartItem
      );

      return { ...state, loading: null, data: newCartList };
    }
    case 'cart/PUT_CART_ITEM_FAILURE':
      return { ...state, loading: null, error: action.payload };

    case 'cart/POST_CART_ITEM_REQUEST':
      return { ...state, loading: 'postCartList' };
    case 'cart/POST_CART_ITEM_SUCCESS':
      return { ...state, loading: null, data: [...state.data, action.payload] };
    case 'cart/POST_CART_ITEM_FAILURE':
      return { ...state, loading: null, error: action.payload };

    case 'cart/DELETE_CART_ITEM_REQUEST':
      return { ...state, loading: 'deleteCartItem' };
    case 'cart/DELETE_CART_ITEM_SUCCESS': {
      const newCartList = state.data.filter(item => item.id !== action.payload);

      return { ...state, loading: null, data: newCartList };
    }
    case 'cart/DELETE_CART_ITEM_FAILURE':
      return { ...state, loading: null, error: action.payload };

    case 'cart/DELETE_ALL_CART_ITEM_REQUEST':
      return { ...state, loading: 'deleteCartItem' };
    case 'cart/DELETE_ALL_CART_ITEM_SUCCESS': {
      return { ...state, loading: null, data: [] };
    }
    case 'cart/DELETE_ALL_CART_ITEM_FAILURE':
      return { ...state, loading: null, error: action.payload };

    case 'cart/CHECK_CART_ITEM': {
      const cartList = [...state.data];

      const cartItem = cartList.find(cart => cart.id === action.payload);

      cartItem.isChecked = !cartItem.isChecked;

      return { ...state, data: cartList };
    }

    case 'cart/CHECK_ALL_CART_ITEM': {
      const cartList = state.data.map(cart => ({ ...cart, isChecked: !action.payload }));

      return { ...state, data: cartList };
    }
    default:
      return state;
  }
};
