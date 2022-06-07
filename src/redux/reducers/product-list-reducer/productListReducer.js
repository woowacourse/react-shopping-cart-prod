/* eslint-disable default-param-last */
import queryState from "@redux/utils/queryState";
import ACTION_TYPE from "./productListActions";

const productListReducer = (state, { type, payload }, totalState) => {
  switch (type) {
    case ACTION_TYPE.GET_PRODUCT_LIST_PENDING: {
      const newState = structuredClone(state);
      newState.query.getProductList = queryState.pending();
      return newState;
    }

    case ACTION_TYPE.GET_PRODUCT_LIST_FULLFILLED: {
      const newState = structuredClone(state);
      const { productList } = payload;
      newState.query.getProductList = queryState.fullfilled();
      newState.data = productList;
      return newState;
    }

    case ACTION_TYPE.GET_PRODUCT_LIST_REJECTED: {
      const newState = structuredClone(state);
      const { error } = payload;
      newState.query.getProductList = queryState.rejected(error);
      alert(error.message);
      return newState;
    }

    default: {
      return state;
    }
  }
};

export default productListReducer;
