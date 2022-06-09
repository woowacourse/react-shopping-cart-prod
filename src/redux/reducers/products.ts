import { Action, Product } from 'types';
import { TYPES } from 'redux/actions';

const initialState: {
  isLoading: boolean;
  error: any;
  productList: Product[];
} = {
  isLoading: false,
  error: null,
  productList: [],
};

const products = (state = initialState, action: Action) => {
  switch (action.type) {
    case `${TYPES.GET_PRODUCT_LIST}_PENDING`: {
      return { ...state, isLoading: true, error: null };
    }
    case `${TYPES.GET_PRODUCT_LIST}_FULFILLED`: {
      return {
        ...state,
        isLoading: false,
        productList: action.payload.data as Product[],
      };
    }
    case `${TYPES.GET_PRODUCT_LIST}_REJECTED`: {
      if ([401, 403].includes(action.payload.response.status)) {
        localStorage.removeItem('userId');
        localStorage.removeItem('accessToken');
      }

      return { ...state, isLoading: false, error: action.payload.data };
    }
    default:
      return state;
  }
};

export default products;
export { initialState };
