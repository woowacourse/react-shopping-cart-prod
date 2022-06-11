import { 상품리스트_불러오기_액션 } from 'actions/types';

const initialState = {
  items: [],
  isLoading: false,
  errorMessage: null,
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 상품리스트_불러오기_액션.PENDING:
      return { ...state, isLoading: true, errorMessage: null };

    case 상품리스트_불러오기_액션.SUCCESS:
      return { ...state, items: [...state.items, ...payload.products], isLoading: false };

    case 상품리스트_불러오기_액션.FAILURE:
      return { ...state, isLoading: false, errorMessage: payload };

    default:
      return state;
  }
};
