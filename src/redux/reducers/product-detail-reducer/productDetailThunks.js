/* eslint-disable no-undef */
import ApiError from "@redux/utils/ApiError";
import Fetcher from "../../../utils/fetcher";
import createAction from "../../utils/createAction";
import ACTION_TYPE from "./productDetailActions";

export const defaultGetProductDetailThunkErrorMessages = {
  6001: "상품 목록에 존재하지 않는 상품입니다.",
};

export const getProductDetail =
  (data, errorMessages = defaultGetProductDetailThunkErrorMessages) =>
  async (dispatch) => {
    dispatch(createAction(ACTION_TYPE.GET_PRODUCT_DETAIL_PENDING));

    try {
      const { productId } = data;
      const response = await Fetcher.get({ endpoint: `products/${productId}` });
      if (!response.ok) {
        const { errorCode, message: originalMessage } = await response.json();
        const message = errorMessages[errorCode] ?? originalMessage;
        throw new ApiError(errorCode, message);
      }
      const productDetail = (await response.json()) ?? {};

      dispatch(
        createAction(ACTION_TYPE.GET_PRODUCT_DETAIL_FULLFILLED, {
          productDetail,
        })
      );
    } catch (e) {
      dispatch(
        createAction(ACTION_TYPE.GET_PRODUCT_DETAIL_REJECTED, {
          error: {
            message: errorMessages[e.errorCode] ?? e.message,
            errorCode: e.errorCode,
          },
        })
      );
    }
  };
