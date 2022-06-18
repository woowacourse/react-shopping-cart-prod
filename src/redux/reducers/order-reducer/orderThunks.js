/* eslint-disable no-undef */
import ApiError from "@redux/utils/ApiError";
import Fetcher from "../../../utils/fetcher";
import createAction from "../../utils/createAction";
import ACTION_TYPE from "./orderActions";

export const defaultCreateOrderThunkErrorMessages = {
  3002: "토큰이 만료되었거나 존재하지 않습니다.",
};

export const createOrder =
  (data, errorMessages = defaultCreateOrderThunkErrorMessages) =>
  async (dispatch) => {
    dispatch(createAction(ACTION_TYPE.CREATE_ORDER_PENDING));

    const { cartItemIds } = data;
    try {
      const response = await Fetcher.post("myorders", {
        cartItemIds,
      });
      if (!response.ok) {
        const { errorCode, message: originalMessage } = await response.json();
        const message = errorMessages[errorCode] ?? originalMessage;
        throw new ApiError(errorCode, message);
      }

      dispatch(createAction(ACTION_TYPE.CREATE_ORDER_FULFILLED));
    } catch (e) {
      dispatch(
        createAction(ACTION_TYPE.CREATE_ORDER_REJECTED, {
          error: {
            message: errorMessages[e.errorCode] ?? e.message,
            errorCode: e.errorCode,
          },
        })
      );
    }
  };
