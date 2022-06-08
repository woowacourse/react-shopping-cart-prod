import { Action, Product } from 'types';
import { TYPES } from 'redux/actions';

const initialState: {
  isLoading: boolean;
  error: any;
  productDetail: Product | null;
  isAddedToCart: boolean;
} = {
  isLoading: false,
  error: null,
  productDetail: null,
  isAddedToCart: false,
};

const productDetail = (state = initialState, action: Action) => {
  switch (action.type) {
    case `${TYPES.GET_PRODUCT_DETAIL}_PENDING`: {
      return { ...state, isLoading: true, error: null };
    }
    case `${TYPES.GET_PRODUCT_DETAIL}_FULFILLED`: {
      return {
        ...state,
        isLoading: false,
        productDetail: action.payload as Product,
      };
    }
    case `${TYPES.GET_PRODUCT_DETAIL}_REJECTED`: {
      return { ...state, isLoading: false, error: action.payload };
    }
    case `${TYPES.CHECK_IS_PRODUCT_ADDED_TO_CART}_PENDING`: {
      return { ...state, isLoading: true, error: null };
    }
    case `${TYPES.CHECK_IS_PRODUCT_ADDED_TO_CART}_FULFILLED`: {
      const { exists } = action.payload;

      return {
        ...state,
        isLoading: false,
        isAddedToCart: exists,
      };
    }
    case `${TYPES.CHECK_IS_PRODUCT_ADDED_TO_CART}_REJECTED`: {
      return { ...state, isLoading: false, error: action.payload };
    }
    case `${TYPES.ADD_ITEM_TO_CART}_FULFILLED`: {
      return {
        ...state,
        isAddedToCart: true,
      };
    }
    default:
      return state;
  }
};

export default productDetail;
