/* eslint-disable no-undef */
import ApiError from "@utils/ApiError";
import Fetcher from "@utils/fetcher";

import createAction from "../../utils/createAction";
import ACTION_TYPE from "./cartActions";

import ERROR_MESSAGES from "../../../constants/errorMessages";

export const getCart =
  (errorMessages = ERROR_MESSAGES) =>
  async (dispatch) => {
    dispatch(createAction(ACTION_TYPE.GET_CART_PENDING));

    try {
      const response = await Fetcher.get("mycarts");
      if (!response.ok) {
        const { errorCode, message: originalMessage } = await response.json();
        const message = errorMessages[errorCode] ?? originalMessage;
        throw new ApiError(errorCode, message);
      }
      const cart = (await response.json()) ?? [];

      dispatch(createAction(ACTION_TYPE.GET_CART_FULFILLED, { cart }));
    } catch (e) {
      dispatch(
        createAction(ACTION_TYPE.GET_CART_REJECTED, {
          error: {
            message: errorMessages[e.errorCode] ?? e.message,
            errorCode: e.errorCode,
          },
        })
      );
    }
  };

export const addProductToCart =
  (data, errorMessages = ERROR_MESSAGES) =>
  async (dispatch) => {
    dispatch(createAction(ACTION_TYPE.ADD_PRODUCT_TO_CART_PENDING));

    try {
      const { productId, quantity } = data;
      const response = await Fetcher.post("mycarts", { productId, quantity });
      if (!response.ok) {
        const { errorCode, message: originalMessage } = await response.json();
        const message = errorMessages[errorCode] ?? originalMessage;
        throw new ApiError(errorCode, message);
      }
      const cartItem = await response.json();

      dispatch(
        createAction(ACTION_TYPE.ADD_PRODUCT_TO_CART_FULFILLED, { cartItem })
      );
    } catch (e) {
      dispatch(
        createAction(ACTION_TYPE.ADD_PRODUCT_TO_CART_REJECTED, {
          error: {
            message: errorMessages[e.errorCode] ?? e.message,
            errorCode: e.errorCode,
          },
        })
      );
    }
  };

export const updateCartItemQuantity =
  (data, errorMessages = ERROR_MESSAGES) =>
  async (dispatch) => {
    dispatch(createAction(ACTION_TYPE.UPDATE_CART_ITEM_QUANTITY_PENDING));

    try {
      const { cartItemId, quantity } = data;
      const response = await Fetcher.patch("mycarts", { cartItemId, quantity });
      if (!response.ok) {
        const { errorCode, message: originalMessage } = await response.json();
        const message = errorMessages[errorCode] ?? originalMessage;
        throw new ApiError(errorCode, message);
      }

      dispatch(
        createAction(ACTION_TYPE.UPDATE_CART_ITEM_QUANTITY_FULFILLED, {
          cartItemId,
          quantity,
        })
      );
    } catch (e) {
      dispatch(
        createAction(ACTION_TYPE.UPDATE_CART_ITEM_QUANTITY_REJECTED, {
          error: {
            message: errorMessages[e.errorCode] ?? e.message,
            errorCode: e.errorCode,
          },
        })
      );
    }
  };

export const deleteCartItems =
  (data, errorMessages = ERROR_MESSAGES) =>
  async (dispatch) => {
    dispatch(createAction(ACTION_TYPE.DELETE_CART_ITEMS_PENDING));

    try {
      const { cartItemIds } = data;
      const response = await Fetcher.delete("mycarts", { cartItemIds });
      if (!response.ok) {
        const { errorCode, message: originalMessage } = await response.json();
        const message = errorMessages[errorCode] ?? originalMessage;
        throw new ApiError(errorCode, message);
      }

      dispatch(
        createAction(ACTION_TYPE.DELETE_CART_ITEMS_FULFILLED, { cartItemIds })
      );
    } catch (e) {
      dispatch(
        createAction(ACTION_TYPE.DELETE_CART_ITEMS_REJECTED, {
          error: {
            message: errorMessages[e.errorCode] ?? e.message,
            errorCode: e.errorCode,
          },
        })
      );
    }
  };
