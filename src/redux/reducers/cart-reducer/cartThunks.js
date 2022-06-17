/* eslint-disable no-undef */
import ApiError from "@redux/utils/ApiError";
import AccessTokenStorage from "@storage/accessTokenStorage";
import Fetcher from "../../../utils/fetcher";
import createAction from "../../utils/createAction";
import ACTION_TYPE from "./cartActions";

export const defaultGetCartThunkErrorMessages = {
  3002: "토큰이 만료되었거나 존재하지 않습니다.",
};

export const defaultAddProductToCartThunkErrorMessages = {
  3002: "토큰이 만료되었거나 존재하지 않습니다.",
  5001: "이미 장바구니에 존재하는 상품입니다.",
  5002: "상품 수량이 잘못되었습니다.",
  6001: "상품 목록에 존재하지 않는 상품입니다.",
};

export const defaultUpdateCartItemQuantityThunkErrorMessages = {
  3002: "토큰이 만료되었거나 존재하지 않습니다.",
  5002: "상품 수량이 잘못되었습니다.",
  5003: "내가 담은 장바구니 item이 아닌 경우 ???", // 얘 무슨 상황이지?
  6001: "상품 목록에 존재하지 않는 상품입니다.",
  6002: "장바구니에 존재하지 않는 아이템입니다.",
};

export const defaultDeleteCartItemsThunkErrorMessages = {
  3002: "토큰이 만료되었거나 존재하지 않습니다.",
  6002: "장바구니에 존재하지 않는 아이템입니다.",
};

export const getCart =
  (errorMessages = defaultGetCartThunkErrorMessages) =>
  async (dispatch) => {
    dispatch(createAction(ACTION_TYPE.GET_CART_PENDING));

    try {
      const accessToken = AccessTokenStorage.get();
      const response = await Fetcher.get({ endpoint: "mycarts", accessToken });
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
          error: {
            message: errorMessages[e.errorCode] ?? e.message,
            errorCode: e.errorCode,
          },
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
      const accessToken = AccessTokenStorage.get();
      const response = await Fetcher.post({
        endpoint: "mycarts",
        body: { productId, quantity },
        accessToken,
      });

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
          error: {
            message: errorMessages[e.errorCode] ?? e.message,
            errorCode: e.errorCode,
          },
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
      const accessToken = AccessTokenStorage.get();
      const response = await Fetcher.patch({
        endpoint: "mycarts",
        body: { cartItemId, quantity },
        accessToken,
      });

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
          error: {
            message: errorMessages[e.errorCode] ?? e.message,
            errorCode: e.errorCode,
          },
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
      const accessToken = AccessTokenStorage.get();
      const response = await Fetcher.delete({
        endpoint: "mycarts",
        body: { cartItemIds },
        accessToken,
      });

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
          error: {
            message: errorMessages[e.errorCode] ?? e.message,
            errorCode: e.errorCode,
          },
        })
      );
    }
  };
