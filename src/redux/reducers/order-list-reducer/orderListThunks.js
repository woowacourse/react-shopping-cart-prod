/* eslint-disable no-undef */
import ApiError from "@redux/utils/ApiError";
import Fetcher from "../../../utils/fetcher";
import createAction from "../../utils/createAction";
import ACTION_TYPE from "./orderListActions";

export const defaultGetOrderListThunkErrorMessages = {
  3002: "토큰이 만료되었거나 존재하지 않습니다.",
};

export const getOrderList =
  (errorMessages = defaultGetOrderListThunkErrorMessages) =>
  async (dispatch) => {
    dispatch(createAction(ACTION_TYPE.GET_ORDER_LIST_PENDING));

    try {
      const response = await Fetcher.get("myorders");
      if (!response.ok) {
        const { errorCode, message: originalMessage } = await response.json();
        const message = errorMessages[errorCode] ?? originalMessage;
        throw new ApiError(errorCode, message);
      }
      const orderList = (await response.json()) ?? [];

      dispatch(
        createAction(ACTION_TYPE.GET_ORDER_LIST_FULLFILLED, { orderList })
      );
    } catch (e) {
      dispatch(
        createAction(ACTION_TYPE.GET_ORDER_LIST_REJECTED, {
          error: {
            message: errorMessages[e.errorCode] ?? e.message,
            errorCode: e.errorCode,
          },
        })
      );
    }
  };
