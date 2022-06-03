import { 상품_불러오기_액션 } from 'actions/types';

const initialState = {
  item: {},
  isLoading: false,
  errorMessage: null,
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case 상품_불러오기_액션.PENDING:
      return { ...state, isLoading: true };

    case 상품_불러오기_액션.SUCCESS:
      return { ...state, item: { ...state.item, ...payload }, isLoading: false };

    case 상품_불러오기_액션.FAILURE:
      return { ...state, errorMessage: payload, isLoading: false };

    default:
      return state;
  }
};
