/* eslint-disable default-param-last */
import queryState from "@redux/utils/queryState";
import ACTION_TYPE from "./orderActions";

const orderReducer = (state, { type, payload }, totalState) => {
  switch (type) {
    case ACTION_TYPE.CREATE_ORDER_PENDING: {
      const newState = structuredClone(state);
      newState.query.createOrder = queryState.pending();
      return newState;
    }
    case ACTION_TYPE.CREATE_ORDER_FULFILLED: {
      const newState = structuredClone(state);
      newState.query.createOrder = queryState.fulfilled();
      alert("주문이 성공적으로 들어갔습니다.");
      window.location.href = "/order-list";
      return state;
    }
    case ACTION_TYPE.CREATE_ORDER_REJECTED: {
      const newState = structuredClone(state);
      const { error } = payload;
      newState.query.createOrder = queryState.rejected(error);
      alert(error.message);
      return newState;
    }

    default: {
      return state;
    }
  }
};

export default orderReducer;
