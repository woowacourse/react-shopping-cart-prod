/* eslint-disable no-undef */
import ApiError from "@redux/utils/ApiError";
import createAction from "../../utils/createAction";
import ACTION_TYPE from "./productActions";

export const defaultProductListThunkErrorMessages = {};

export const defaultProductDetailThunkErrorMessages = {};

export const updateProductList =
  (errorMessages = defaultProductListThunkErrorMessages) =>
  async (dispatch) => {
    dispatch(createAction(ACTION_TYPE.UPDATE_PRODUCT_LIST_PENDING));

    try {
      const response = await fetch(`${API_URL}/products`);
      if (!response.ok) {
        const { errorCode, message: originalMessage } = await response.json();
        const message = errorMessages[errorCode] ?? originalMessage;
        throw new ApiError(errorCode, message);
      }
      const productList = await response.json();

      dispatch(
        createAction(ACTION_TYPE.UPDATE_PRODUCT_LIST_FULLFILLED, productList)
      );
    } catch (e) {
      dispatch(
        createAction(ACTION_TYPE.UPDATE_PRODUCT_LIST_REJECTED, e.toPlainObj())
      );
    }
  };

export const updateProductDetail =
  (productId, errorMessages = defaultProductDetailThunkErrorMessages) =>
  async (dispatch) => {
    dispatch(createAction(ACTION_TYPE.UPDATE_PRODUCT_DETAIL_PENDING));

    try {
      const response = await fetch(`${API_URL}/products/${productId}`);
      if (!response.ok) {
        const { errorCode, message: originalMessage } = await response.json();
        const message = errorMessages[errorCode] ?? originalMessage;
        throw new ApiError(errorCode, message);
      }
      const productList = await response.json();

      dispatch(
        createAction(ACTION_TYPE.UPDATE_PRODUCT_LIST_FULLFILLED, productList)
      );
    } catch (e) {
      dispatch(
        createAction(ACTION_TYPE.UPDATE_PRODUCT_LIST_REJECTED, e.toPlainObj())
      );
    }
  };
