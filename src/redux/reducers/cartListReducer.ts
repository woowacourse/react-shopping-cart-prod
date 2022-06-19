import { CartListAction, CartListActionType } from 'redux/actions/cartList';
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

export const cartListReducer = (state = initialState, action: CartListAction) => {
  switch (action.type) {
    case CartListActionType.GET_CART_LIST_START:
      return { loading: true, error: null, data: state.data };
    case CartListActionType.GET_CART_LIST_SUCCESS: {
      return { loading: false, error: null, data: action.payload };
    }
    case CartListActionType.GET_CART_LIST_FAILURE:
      return { loading: true, error: null, data: state.data };

    case CartListActionType.PATCH_CART_ITEM_START:
      return { loading: true, error: null, data: state.data };
    case CartListActionType.PATCH_CART_ITEM_SUCCESS: {
      const prevCartList = state.data;
      const targetItems = action.payload.cartItems;
      const targetItemIds = targetItems.map(item => item.productId);

      const newCartList = prevCartList.map(item => {
        const targetId = targetItemIds.find(id => id === item.productId);

        if (targetId) {
          return targetItems.find(item => item.productId === targetId);
        }

        return item;
      });

      return { loading: false, error: null, data: newCartList };
    }
    case CartListActionType.PATCH_CART_ITEM_FAILURE:
      return { loading: true, error: null, data: state.data };

    case CartListActionType.POST_CART_ITEM_START:
      return { loading: true, error: null, data: state.data };
    case CartListActionType.POST_CART_ITEM_SUCCESS:
      return { loading: false, error: null, data: [...state.data, action.payload] };
    case CartListActionType.POST_CART_ITEM_FAILURE:
      return { loading: true, error: null, data: state.data };

    case CartListActionType.REMOVE_CART_ITEM_START:
      return { loading: true, error: null, data: state.data };
    case CartListActionType.REMOVE_CART_ITEM_SUCCESS: {
      const deletedIds = action.payload.map(item => item.id);

      const itemDeletedCartList = state.data.filter(item => !deletedIds.includes(item.id));

      return {
        loading: false,
        error: null,
        data: itemDeletedCartList,
      };
    }
    case CartListActionType.REMOVE_CART_ITEM_FAILURE:
      return { loading: true, error: null, data: state.data };
    default:
      return state;
  }
};
