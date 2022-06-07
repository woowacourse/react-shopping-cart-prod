import queryState from "./utils/queryState";

export const initialState = {
  productList: {
    query: {
      getProductList: queryState.init(),
    },
    data: [],
  },
  productDetail: {
    query: {
      getProductDetail: queryState.init(),
    },
    data: {},
  },
  cart: {
    query: {
      getCart: queryState.init(),
      addProductToCart: queryState.init(),
      updateCartItemQuantity: queryState.init(),
      deleteCartItems: queryState.init(),
    },
    data: [],
  },
  user: {
    query: {
      signup: queryState.init(),
      login: queryState.init(),
      secession: queryState.init(),
      getUser: queryState.init(),
      updateUserPassword: queryState.init(),
      updateUserGeneralInfo: queryState.init(),
    },
    data: {
      isLoggedIn: false,
      email: null,
      username: null,
    },
  },
};
