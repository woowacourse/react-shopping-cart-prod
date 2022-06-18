import axios from "axios";
import createAction from "@/redux/createAction";

export const ACTION_TYPES = {
  GET_PRODUCT_DETAIL_START: "GET_PRODUCT_DETAIL_START",
  GET_PRODUCT_DETAIL_SUCCESS: "GET_PRODUCT_DETAIL_SUCCESS",
  GET_PRODUCT_DETAIL_ERROR: "GET_PRODUCT_DETAIL_ERROR",
};

export const getProductDetail = (id) => async (dispatch) => {
  try {
    dispatch(createAction(ACTION_TYPES.GET_PRODUCT_DETAIL_START));
    const productDetail = await axios.get(`/products/${id}`);
    dispatch(
      createAction(ACTION_TYPES.GET_PRODUCT_DETAIL_SUCCESS, productDetail.data)
    );
  } catch (error) {
    dispatch(createAction(ACTION_TYPES.GET_PRODUCT_DETAIL_ERROR, error));
  }
};

const productDetailInitialState = {
  loading: false,
  data: null,
  error: null,
};

export const productDetailReducer = (
  state = productDetailInitialState,
  action
) => {
  switch (action.type) {
    case ACTION_TYPES.GET_PRODUCT_DETAIL_START:
      return {
        loading: true,
        data: null,
        error: null,
      };

    case ACTION_TYPES.GET_PRODUCT_DETAIL_SUCCESS:
      return {
        loading: false,
        data: action.payload,
        error: null,
      };

    case ACTION_TYPES.GET_PRODUCT_DETAIL_ERROR:
      return {
        loading: false,
        data: null,
        error: action.payload.message,
      };

    default: {
      return state;
    }
  }
};
