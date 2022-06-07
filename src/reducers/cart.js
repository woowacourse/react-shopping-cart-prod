import { 장바구니_액션, 장바구니_불러오기_액션 } from 'actions/types';

const initialState = {
  items: [],
  isLoading: false,
  errorMessage: null,
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 장바구니_불러오기_액션.PENDING:
      return { ...state, isLoading: true };

    case 장바구니_불러오기_액션.SUCCESS:
      return { ...state, items: payload.cartItems, isLoading: false };

    case 장바구니_불러오기_액션.FAILURE:
      return { ...state, errorMessage: payload, isLoading: false };

    case 장바구니_액션.ADD_NEW_PRODUCT:
      return { ...state, items: [...state.items, payload] };

    case 장바구니_액션.ADD_EXIST_PRODUCT:
      return {
        ...state,
        items: state.items.map((item) => {
          if (item.id === payload.id) {
            return payload;
          }

          return item;
        }),
      };

    case 장바구니_액션.DELETE_PRODUCT:
      return {
        ...state,
        items: state.items.filter((item) =>
          payload.every((willDeleteItem) => item.id !== willDeleteItem),
        ),
      };

    case 장바구니_액션.MODIFY_PRODUCT_QUANTITY:
      return {
        ...state,
        items: state.items.map((item) => {
          if (item.product.id === payload.productId) {
            const modifiedItem = item;
            modifiedItem.quantity = payload.quantity;
            return modifiedItem;
          }

          return item;
        }),
      };

    default:
      return state;
  }
};
