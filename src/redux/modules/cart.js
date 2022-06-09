import appClient from "@/utils/appClient";
import { getCookie } from "@/utils/auth";

export const ACTION = {
  GET_CART_PENDING: "GET_CART_PENDING",
  GET_CART_SUCCESS: "GET_CART_SUCCESS",
  GET_CART_FAILURE: "GET_CART_FAILURE",

  ADD_CART_ITEM: "ADD_CART_ITEM",
  UPDATE_ITEM_QUANTITY: "UPDATE_ITEM_QUANTITY",
  DELETE_CART_ITEM: "DELETE_CART_ITEM",
};

export const getCart = () => async (dispatch) => {
  dispatch({ type: ACTION.GET_CART_PENDING });
  try {
    const headers = {
      Authorization: `Bearer ${getCookie("accessToken")}`,
    };
    const { data } = await appClient.get("/users/me/carts", { headers });
    dispatch({
      type: ACTION.GET_CART_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ACTION.GET_CART_FAILURE,
      payload: error,
      error: true,
    });
  }
};

export const addCartItem = (data) => ({
  type: ACTION.ADD_CART_ITEM,
  payload: data,
});

export const updateCartQuantity = (data) => ({
  type: ACTION.UPDATE_ITEM_QUANTITY,
  payload: { id: data.id, quantity: data.quantity },
});

export const deleteCartItem = (data) => {
  return {
    type: ACTION.DELETE_CART_ITEM,
    payload: { id: data },
  };
};

const initialState = {
  pending: false,
  error: false,
  cart: [],
};

export function cartReducer(state = initialState, action) {
  switch (action.type) {
    case ACTION.GET_CART_PENDING: {
      return {
        ...state,
        pending: true,
        error: false,
      };
    }
    case ACTION.GET_CART_SUCCESS: {
      const { cartList } = action.payload;
      return {
        ...state,
        pending: false,
        cart: cartList,
      };
    }
    case ACTION.GET_CART_FAILURE: {
      return {
        ...state,
        pending: false,
        error: true,
      };
    }
    case ACTION.ADD_CART_ITEM: {
      const data = action.payload;
      return {
        ...state,
        cart: [...state.cart, { ...data, quantity: 1 }],
      };
    }
    case ACTION.UPDATE_ITEM_QUANTITY: {
      const { id, quantity } = action.payload;
      const updatedCart = state.cart.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: quantity };
        }
        return item;
      });
      return { ...state, cart: updatedCart };
    }
    case ACTION.DELETE_CART_ITEM: {
      const { id } = action.payload;
      const updatedCart = state.cart.filter((item) => item.id !== id);
      return { ...state, cart: updatedCart };
    }
    default:
      return state;
  }
}
