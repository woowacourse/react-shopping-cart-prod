/* eslint-disable default-param-last */
import cartReducer from "./reducers/cart-reducer/cartReducer";
import userReducer from "./reducers/user-reducer/userReducer";
import orderReducer from "./reducers/order-reducer/orderReducer";

import { initialState } from "./constants";

function reducer(state = initialState, action) {
  const category = action.type.split("/")[0];
  if (!category) {
    throw new Error("action에 category가 없습니다");
  }

  switch (category) {
    case "cart": {
      return {
        ...state,
        cart: cartReducer(state.cart, action, state),
      };
    }

    case "user": {
      return {
        ...state,
        user: userReducer(state.user, action, state),
      };
    }

    case "order": {
      return {
        ...state,
        order: orderReducer(state.order, action, state),
      };
    }

    default: {
      return state;
    }
  }
}

export default reducer;
