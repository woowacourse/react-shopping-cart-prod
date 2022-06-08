import { BASE_SERVER_URL, SERVER_PATH, COOKIE_KEY } from "constants";
import { getCookie } from "util/cookie";
import {
  deleteBaseServerCartItem,
  getBaseServerCartList,
  patchBaseServerCartItem,
} from "util/fetch";

export const CART_LIST_ACTION = {
  GET_LIST: "cartList/GET_LIST",
  GET_LIST_SUCCESS: "cartList/GET_SUCCESS",
  GET_LIST_ERROR: "cartList/GET_ERROR",

  DELETE_LIST: "cartList/DELETE_LIST",
  DELETE_LIST_SUCCESS: "cartList/DELETE_LIST_SUCCESS",
  DELETE_LIST_ERROR: "cartList/DELETE_LIST_ERROR",

  UPDATE_ITEM_COUNT: "cartList/UPDATE_ITEM_COUNT",
  UPDATE_ITEM_COUNT_SUCCESS: "cartList/UPDATE_ITEM_COUNT_SUCCESS",
  UPDATE_ITEM_COUNT_ERROR: "cartList/UPDATE_ITEM_COUNT_ERROR",
};

export const getCartList = () => async (dispatch) => {
  dispatch({ type: CART_LIST_ACTION.GET_LIST });
  try {
    const response = await getBaseServerCartList({
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie(COOKIE_KEY.TOKEN)}`,
      },
      url: `${BASE_SERVER_URL}${SERVER_PATH.CUSTOMER_LIST}/${getCookie(
        COOKIE_KEY.USER_ID
      )}${SERVER_PATH.CART_LIST}`,
    });

    if (!response.ok) {
      throw new Error(`문제가 발생했습니다. 잠시 후에 다시 시도해 주세요 :(`);
    }

    const data = await response.json();
    if (!data) {
      throw new Error(`저장된 정보가 없습니다. 다시 시도해 주세요 :(`);
    }

    dispatch({
      type: CART_LIST_ACTION.GET_LIST_SUCCESS,
      carts: data,
    });
  } catch (err) {
    dispatch({
      type: CART_LIST_ACTION.GET_LIST_ERROR,
      errorMessage: err.message,
    });
  }
};

export const deleteCartList = (productId) => async (dispatch) => {
  dispatch({ type: CART_LIST_ACTION.DELETE_LIST });
  try {
    const response = await deleteBaseServerCartItem({
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie(COOKIE_KEY.TOKEN)}`,
      },
      url: `${BASE_SERVER_URL}${SERVER_PATH.CUSTOMER_LIST}/${getCookie(
        COOKIE_KEY.USER_ID
      )}${SERVER_PATH.CART_LIST}?productId=${productId}`,
    });

    if (!response.ok) {
      throw new Error(`문제가 발생했습니다. 잠시 후에 다시 시도해 주세요 :(`);
    }

    dispatch({
      type: CART_LIST_ACTION.DELETE_LIST_SUCCESS,
      deletedCartId: productId,
    });
  } catch (err) {
    dispatch({
      type: CART_LIST_ACTION.DELETE_LIST_ERROR,
      errorMessage: err.message,
    });
  }
};

export const updateCartCount = (productId, count) => async (dispatch) => {
  dispatch({ type: CART_LIST_ACTION.UPDATE_ITEM_COUNT });
  try {
    const response = await patchBaseServerCartItem({
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getCookie(COOKIE_KEY.TOKEN)}`,
      },
      url: `${BASE_SERVER_URL}${SERVER_PATH.CUSTOMER_LIST}/${getCookie(
        COOKIE_KEY.USER_ID
      )}${SERVER_PATH.CART_LIST}?productId=${productId}`,
      body: JSON.stringify({ count }),
    });

    if (!response.ok) {
      throw new Error(`문제가 발생했습니다. 잠시 후에 다시 시도해 주세요 :(`);
    }

    dispatch({
      type: CART_LIST_ACTION.UPDATE_ITEM_COUNT_SUCCESS,
      modifiedCartItem: { productId, count },
    });
  } catch (err) {
    dispatch({
      type: CART_LIST_ACTION.UPDATE_ITEM_COUNT_ERROR,
      errorMessage: err.message,
    });
  }
};

const initialState = {
  isLoading: false,
  data: [],
  errorMessage: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CART_LIST_ACTION.UPDATE_ITEM_COUNT:
    case CART_LIST_ACTION.DELETE_LIST:
      return {
        isLoading: false,
        data: state.data,
        errorMessage: "",
      };
    case CART_LIST_ACTION.GET_LIST:
      return {
        isLoading: true,
        data: state.data,
        errorMessage: "",
      };
    case CART_LIST_ACTION.UPDATE_ITEM_COUNT_SUCCESS:
      return {
        isLoading: false,
        data: state.data.map((cart) => {
          if (cart.productId === action.modifiedCartItem.productId) {
            cart.count = action.modifiedCartItem.count;
          }
          return cart;
        }),
        errorMessage: "",
      };
    case CART_LIST_ACTION.DELETE_LIST_SUCCESS:
      return {
        isLoading: false,
        data: state.data.filter(
          (cart) => cart.productId !== action.deletedCartId
        ),
        errorMessage: "",
      };
    case CART_LIST_ACTION.GET_LIST_SUCCESS:
      return {
        isLoading: false,
        data: action.carts,
        errorMessage: "",
      };
    case CART_LIST_ACTION.UPDATE_ITEM_COUNT_ERROR:
    case CART_LIST_ACTION.DELETE_LIST_ERROR:
    case CART_LIST_ACTION.GET_LIST_ERROR:
      return {
        isLoading: false,
        data: [],
        errorMessage: action.errorMessage,
      };
    default:
      return state;
  }
};

export default reducer;
