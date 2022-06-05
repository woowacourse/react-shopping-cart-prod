import queryState from "@redux/utils/queryState";
import ACTION_TYPE from "./productActions";

const initialState = {
  productList: queryState.init([]),
  productDetail: queryState.init(null),
};

const productReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ACTION_TYPE.UPDATE_PRODUCT_LIST_PENDING: {
      const newState = structuredClone(state);
      newState.productList = queryState.pending(newState.productList);
      return newState;
    }

    case ACTION_TYPE.UPDATE_PRODUCT_LIST_FULLFILLED: {
      const newState = structuredClone(state);
      newState.productList = queryState.fullfilled(payload);
      return newState;
    }

    case ACTION_TYPE.UPDATE_PRODUCT_LIST_REJECTED: {
      const newState = structuredClone(state);
      newState.productList = queryState.rejected(newState.productList, payload);
      return state;
    }

    case ACTION_TYPE.UPDATE_PRODUCT_DETAIL_PENDING: {
      const newState = structuredClone(state);
      newState.productDetail = queryState.pending(newState.productDetail);
      return newState;
    }

    case ACTION_TYPE.UPDATE_PRODUCT_DETAIL_FULLFILLED: {
      const newState = structuredClone(state);
      newState.productDetail = queryState.fullfilled(payload);
      return newState;
    }

    case ACTION_TYPE.UPDATE_PRODUCT_DETAIL_REJECTED: {
      const newState = structuredClone(state);
      newState.productDetail = queryState.rejected(
        newState.productDetail,
        payload
      );
      return state;
    }

    default: {
      return state;
    }
  }
};

export default productReducer;
