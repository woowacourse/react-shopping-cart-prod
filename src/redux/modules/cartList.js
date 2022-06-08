import createAction from "@/redux/createAction";
import { toggleSnackbarOpen } from "@/redux/modules/snackbar";
import { MESSAGE } from "@/constants";
import { getCookie } from "@/utils/cookie";
import axios from "axios";
import { BASE_URL } from "@/constants";

export const ACTION_TYPES = {
  ADD_PRODUCT_TO_CART: "ADD_PRODUCT_TO_CART",
  TOGGLE_CART_ITEM_CHECK_BUTTON: "TOGGLE_CART_ITEM_CHECK_BUTTON",
  UNCHECK_ALL_CHECK_BUTTON: "UNCHECK_ALL_CHECK_BUTTON",
  CHECK_ALL_CHECK_BUTTON: "CHECK_ALL_CHECK_BUTTON",
  INCREMENT_CART_ITEM_QUANTITY: "INCREMENT_CART_ITEM_QUANTITY",
  DECREMENT_CART_ITEM_QUANTITY: "DECREMENT_CART_ITEM_QUANTITY",
  REMOVE_CHECKED_CART_ITEM: "REMOVE_CHECKED_CART_ITEM",
  REMOVE_ROW_CART_ITEM: "REMOVE_ROW_CART_ITEM",
  GET_CART_LIST: "GET_CART_LIST",
  CLEAR_CART_LIST: "CLEAR_CART_LIST",
};

export const addProductToCart = (args) => async (dispatch) => {
  const { id, name, price, imageUrl } = args;
  try {
    if (!getCookie("accessToken")) {
      throw new Error(MESSAGE.LOGIN_REQUEST_FOR_ADD_CART);
    }

    await axios.post(
      `${BASE_URL}/users/me/carts`,
      {
        productId: id,
      },
      {
        headers: {
          Authorization:
            getCookie("accessToken") && `Bearer ${getCookie("accessToken")}`,
        },
      }
    );
    dispatch(
      createAction(ACTION_TYPES.ADD_PRODUCT_TO_CART, {
        id,
        name,
        price,
        imageUrl,
      })
    );
    dispatch(toggleSnackbarOpen(MESSAGE.CART_ADDED));
  } catch (error) {
    if (error.response?.status === 401) {
      dispatch(toggleSnackbarOpen(MESSAGE.INVALID_ACCESS));
      return;
    }
    if (error.response?.status === 400) {
      dispatch(toggleSnackbarOpen(MESSAGE.EXIST_ITEM_IN_CART));
      return;
    }
    dispatch(toggleSnackbarOpen(error.message));
  }
};

export const getCartList = () => async (dispatch) => {
  try {
    const response = await axios.get(`${BASE_URL}/users/me/carts`, {
      headers: {
        Authorization:
          getCookie("accessToken") && `Bearer ${getCookie("accessToken")}`,
      },
    });
    console.log(response);
    dispatch(createAction(ACTION_TYPES.GET_CART_LIST, response.data.cartList));
  } catch (error) {
    if (error.response?.status === 401) {
      dispatch(toggleSnackbarOpen(MESSAGE.INVALID_ACCESS));
      return;
    }
    dispatch(toggleSnackbarOpen(error));
  }
};

export const clearCartList = () => {
  return createAction(ACTION_TYPES.CLEAR_CART_LIST);
};

export const toggleCartItemCheckButton = (id) => async (dispatch) => {
  dispatch(createAction(ACTION_TYPES.TOGGLE_CART_ITEM_CHECK_BUTTON, id));
};
export const uncheckAllCheckButton = () => async (dispatch) => {
  dispatch(createAction(ACTION_TYPES.UNCHECK_ALL_CHECK_BUTTON));
};
export const checkAllCheckButton = () => async (dispatch) => {
  dispatch(createAction(ACTION_TYPES.CHECK_ALL_CHECK_BUTTON));
};
export const incrementCartItemQuantity =
  (id, incrementedQuantity) => async (dispatch) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/users/me/carts/${id}`,
        {
          quantity: incrementedQuantity,
        },
        {
          headers: {
            Authorization:
              getCookie("accessToken") && `Bearer ${getCookie("accessToken")}`,
          },
        }
      );
      dispatch(createAction(ACTION_TYPES.INCREMENT_CART_ITEM_QUANTITY, id));
    } catch (error) {
      dispatch(toggleSnackbarOpen(error));
    }
  };
export const decrementCartItemQuantity =
  (id, decrementedQuantity) => async (dispatch) => {
    if (decrementedQuantity < 1) return;
    try {
      const response = await axios.put(
        `${BASE_URL}/users/me/carts/${id}`,
        {
          quantity: decrementedQuantity,
        },
        {
          headers: {
            Authorization:
              getCookie("accessToken") && `Bearer ${getCookie("accessToken")}`,
          },
        }
      );
      dispatch(createAction(ACTION_TYPES.DECREMENT_CART_ITEM_QUANTITY, id));
    } catch (error) {
      dispatch(toggleSnackbarOpen(error));
    }
  };
export const removeCheckedCartItem = (cartList) => async (dispatch) => {
  try {
    const filterCheckedCartItem = cartList.filter(
      (cartItem) => cartItem.checked === true
    );
    const checkedCartItemIds = filterCheckedCartItem.map(
      (cartItem) => cartItem.id
    );
    console.log(checkedCartItemIds);
    checkedCartItemIds.forEach(async (id) => {
      return await axios.delete(`${BASE_URL}/users/me/carts/${id}`, {
        headers: {
          Authorization:
            getCookie("accessToken") && `Bearer ${getCookie("accessToken")}`,
        },
      });
    });
    dispatch(createAction(ACTION_TYPES.REMOVE_CHECKED_CART_ITEM));
  } catch (error) {
    if (error.response?.status === 401) {
      dispatch(toggleSnackbarOpen(MESSAGE.INVALID_ACCESS));
      return;
    }
    dispatch(toggleSnackbarOpen(error));
  }
};
export const removeRowCartItem = (id) => async (dispatch) => {
  try {
    await axios.delete(`${BASE_URL}/users/me/carts/${id}`, {
      headers: {
        Authorization:
          getCookie("accessToken") && `Bearer ${getCookie("accessToken")}`,
      },
    });
    dispatch(createAction(ACTION_TYPES.REMOVE_ROW_CART_ITEM, id));
  } catch (error) {
    if (error.response?.status === 401) {
      dispatch(toggleSnackbarOpen(MESSAGE.INVALID_ACCESS));
      return;
    }
    dispatch(toggleSnackbarOpen(error));
  }
};

const cartListInitialState = [];

export const cartListReducer = (state = cartListInitialState, action) => {
  const newState = [...state];

  switch (action.type) {
    case ACTION_TYPES.GET_CART_LIST:
      return action.payload.map((item) => ({ ...item, checked: true }));

    case ACTION_TYPES.CLEAR_CART_LIST:
      return cartListInitialState;

    case ACTION_TYPES.ADD_PRODUCT_TO_CART:
      return [...state, { ...action.payload, quantity: 1, checked: true }];

    case ACTION_TYPES.TOGGLE_CART_ITEM_CHECK_BUTTON:
      const selectedItem = newState.find((item) => item.id === action.payload);
      const selectedItemIndex = newState.indexOf(selectedItem);

      newState[selectedItemIndex].checked =
        !newState[selectedItemIndex].checked;

      return newState;

    case ACTION_TYPES.UNCHECK_ALL_CHECK_BUTTON:
      const allUnCheckedState = newState.map((item) => {
        return item.checked === true
          ? { ...item, checked: false }
          : { ...item };
      });

      return allUnCheckedState;

    case ACTION_TYPES.CHECK_ALL_CHECK_BUTTON:
      const allCheckedState = newState.map((item) => {
        return item.checked === false
          ? { ...item, checked: true }
          : { ...item };
      });

      return allCheckedState;

    case ACTION_TYPES.INCREMENT_CART_ITEM_QUANTITY:
      const incrementState = newState.map((item) => {
        return item.id === action.payload
          ? { ...item, quantity: item.quantity + 1 }
          : { ...item };
      });

      return incrementState;

    case ACTION_TYPES.DECREMENT_CART_ITEM_QUANTITY:
      const decrementState = newState.map((item) => {
        return item.id === action.payload
          ? {
              ...item,
              quantity: item.quantity > 1 ? item.quantity - 1 : item.quantity,
            }
          : { ...item };
      });

      return decrementState;

    case ACTION_TYPES.REMOVE_CHECKED_CART_ITEM:
      const checkedItemRemovedState = newState.filter((item) => {
        return item.checked === false;
      });
      return checkedItemRemovedState;

    case ACTION_TYPES.REMOVE_ROW_CART_ITEM:
      const rowItemRemovedState = newState.filter((item) => {
        return item.id !== action.payload;
      });

      return rowItemRemovedState;

    default:
      return state;
  }
};
