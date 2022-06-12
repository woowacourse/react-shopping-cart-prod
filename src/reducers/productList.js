import { BASE_SERVER_URL, SERVER_PATH } from "constants";
import { getBaseServerProductList } from "util/fetch";

const PRODUCT_LIST_ACTION = {
  GET_LIST: "productList/GET_LIST",
  GET_LIST_SUCCESS: "productList/GET_SUCCESS",
  GET_LIST_ERROR: "productList/GET_ERROR",
};

export const getProductList = (serverUrlIndex) => async (dispatch) => {
  dispatch({ type: PRODUCT_LIST_ACTION.GET_LIST });
  try {
    const response = await getBaseServerProductList({
      url: `${BASE_SERVER_URL(serverUrlIndex)}${SERVER_PATH.PRODUCT_LIST}`,
    });

    const data = await response.json();
    if (data.message) {
      throw new Error(data.message);
    }

    dispatch({
      type: PRODUCT_LIST_ACTION.GET_LIST_SUCCESS,
      products: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCT_LIST_ACTION.GET_LIST_ERROR,
      errorMessage: error.message,
    });
  }
};

const initialState = {
  isLoading: false,
  data: [],
  errorMessage: "",
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_LIST_ACTION.GET_LIST:
      return {
        isLoading: true,
        data: [],
        errorMessage: "",
      };
    case PRODUCT_LIST_ACTION.GET_LIST_SUCCESS:
      return {
        isLoading: false,
        data: action.products,
        errorMessage: "",
      };
    case PRODUCT_LIST_ACTION.GET_LIST_ERROR:
      return {
        isLoading: false,
        data: [],
        errorMessage: action.errorMessage,
      };
    default:
      return state;
  }
};

export default reducer;
