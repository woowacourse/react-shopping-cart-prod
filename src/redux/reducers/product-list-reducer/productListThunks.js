/* eslint-disable no-undef */
import ApiError from "@redux/utils/ApiError";
import Fetcher from "../../../utils/fetcher";
import createAction from "../../utils/createAction";
import ACTION_TYPE from "./productListActions";

export const defaultGetProductListThunkErrorMessages = {};

export const getProductList =
  (errorMessages = defaultGetProductListThunkErrorMessages) =>
  async (dispatch) => {
    dispatch(createAction(ACTION_TYPE.GET_PRODUCT_LIST_PENDING));

    try {
      const response = await Fetcher.get("products");
      if (!response.ok) {
        const { errorCode, message: originalMessage } = await response.json();
        const message = errorMessages[errorCode] ?? originalMessage;
        throw new ApiError(errorCode, message);
      }
      const productList = (await response.json()) ?? [];

      dispatch(
        createAction(ACTION_TYPE.GET_PRODUCT_LIST_FULLFILLED, { productList })
      );
    } catch (e) {
      dispatch(
        createAction(ACTION_TYPE.GET_PRODUCT_LIST_REJECTED, {
          error: e.toPlainObj(),
        })
      );
    }
  };
