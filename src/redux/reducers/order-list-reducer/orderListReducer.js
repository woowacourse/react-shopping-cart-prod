/* eslint-disable default-param-last */
import queryState from "@redux/utils/queryState";
import ACTION_TYPE from "./orderListActions";

const orderListReducer = (state, { type, payload }, totalState) => {
  switch (type) {
    case ACTION_TYPE.GET_ORDER_LIST_PENDING: {
      const newState = structuredClone(state);
      newState.query.getOrderList = queryState.pending();
      return newState;
    }
    case ACTION_TYPE.GET_ORDER_LIST_FULLFILLED: {
      const newState = structuredClone(state);
      const { orderList } = payload;
      newState.query.getOrderList = queryState.fullfilled();
      newState.data = orderList;
      return newState;
    }
    case ACTION_TYPE.GET_ORDER_LIST_REJECTED: {
      const newState = structuredClone(state);
      const { error } = payload;
      alert(error.message);
      newState.query.getOrderList = queryState.rejected(error);
      return newState;
    }

    default: {
      return state;
    }
  }
};

export default orderListReducer;
