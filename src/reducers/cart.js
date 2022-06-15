import { 장바구니_불러오기_액션, 장바구니_액션 } from 'actions/types';

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
      return { ...state, items: payload, isLoading: false };

    case 장바구니_불러오기_액션.FAILURE:
      return { ...state, isLoading: false, errorMessage: payload };

    case 장바구니_액션.SET_CART_LIST:
      return { items: payload };

    case 장바구니_액션.ADD_NEW_PRODUCT:
      return { items: [...state.items, payload] };

    case 장바구니_액션.DELETE_PRODUCT:
      return {
        items: [...state.items].filter((item) =>
          payload.every((willDeleteItem) => item.id !== willDeleteItem),
        ),
      };

    case 장바구니_액션.MODIFY_PRODUCT_QUANTITY:
      return {
        items: state.items.map((item) => {
          if (item.id === payload.productId) {
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
