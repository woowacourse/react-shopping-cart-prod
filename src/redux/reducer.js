/* eslint-disable default-param-last */
import cartReducer from "./reducers/cart-reducer/cartReducer";
import productListReducer from "./reducers/product-list-reducer/productListReducer";
import productDetailReducer from "./reducers/product-detail-reducer/productDetailReducer";
import userReducer from "./reducers/user-reducer/userReducer";
import orderReducer from "./reducers/order-reducer/orderReducer";
import orderListReducer from "./reducers/order-list-reducer/orderListReducer";
import { initialState } from "./constants";

function reducer(state = initialState, action) {
  const category = action.type.split("/")[0];
  if (!category) {
    throw new Error("action에 category가 없습니다");
  }

  switch (category) {
    case "productList": {
      return {
        ...state,
        productList: productListReducer(state.productList, action, state),
      };
    }

    case "productDetail": {
      return {
        ...state,
        productDetail: productDetailReducer(state.productDetail, action, state),
      };
    }

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

    case "orderList": {
      return {
        ...state,
        orderList: orderListReducer(state.orderList, action, state),
      };
    }

    default: {
      return state;
    }
  }
}

export default reducer;
