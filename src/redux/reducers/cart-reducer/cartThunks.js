/* eslint-disable no-undef */
import ApiError from "@redux/utils/ApiError";
import Fetcher from "../../../utils/fetcher";
import createAction from "../../utils/createAction";
import ACTION_TYPE from "./cartActions";

export const defaultGetCartThunkErrorMessages = {};
export const defaultAddProductToCartThunkErrorMessages = {};
export const defaultUpdateCartItemQuantityThunkErrorMessages = {};
export const defaultDeleteCartItemsThunkErrorMessages = {};

export const getCart =
  (errorMessages = defaultGetCartThunkErrorMessages) =>
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

      dispatch(createAction(ACTION_TYPE.GET_CART_FULLFILLED, { cart }));
    } catch (e) {
      dispatch(
        createAction(ACTION_TYPE.GET_CART_REJECTED, {
          error: e.toPlainObj(),
        })
      );
    }
  };

export const addProductToCart =
  (data, errorMessages = defaultAddProductToCartThunkErrorMessages) =>
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
        createAction(ACTION_TYPE.ADD_PRODUCT_TO_CART_FULLFILLED, { cartItem })
      );
    } catch (e) {
      dispatch(
        createAction(ACTION_TYPE.ADD_PRODUCT_TO_CART_REJECTED, {
          error: e.toPlainObj(),
        })
      );
    }
  };

export const updateCartItemQuantity =
  (data, errorMessages = defaultUpdateCartItemQuantityThunkErrorMessages) =>
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
        createAction(ACTION_TYPE.UPDATE_CART_ITEM_QUANTITY_FULLFILLED, {
          cartItemId,
          quantity,
        })
      );
    } catch (e) {
      dispatch(
        createAction(ACTION_TYPE.UPDATE_CART_ITEM_QUANTITY_REJECTED, {
          error: e.toPlainObj(),
        })
      );
    }
  };

export const deleteCartItems =
  (data, errorMessages = defaultDeleteCartItemsThunkErrorMessages) =>
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
        createAction(ACTION_TYPE.DELETE_CART_ITEMS_FULLFILLED, { cartItemIds })
      );
    } catch (e) {
      dispatch(
        createAction(ACTION_TYPE.DELETE_CART_ITEMS_REJECTED, {
          error: e.toPlainObj(),
        })
      );
    }
  };
