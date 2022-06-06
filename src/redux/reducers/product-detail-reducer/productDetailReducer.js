/* eslint-disable default-param-last */
import queryState from "@redux/utils/queryState";
import ACTION_TYPE from "./productDetailActions";

const productDetailReducer = (state, { type, payload }, totalState) => {
  switch (type) {
    case ACTION_TYPE.GET_PRODUCT_DETAIL_PENDING: {
      const newState = structuredClone(state);
      newState.query.getProductDetail = queryState.pending();
      return newState;
    }

    case ACTION_TYPE.GET_PRODUCT_DETAIL_FULLFILLED: {
      const newState = structuredClone(state);
      const { productDetail } = payload;
      newState.query.getProductDetail = queryState.fullfilled();
      newState.data = productDetail;
      return newState;
    }

    case ACTION_TYPE.GET_PRODUCT_DETAIL_REJECTED: {
      const newState = structuredClone(state);
      const { error } = payload;
      newState.query.getProductDetail = queryState.rejected(error);
      return newState;
    }

    default: {
      return state;
    }
  }
};

export default productDetailReducer;
