import apiRequestState from "./utils/apiRequestState";

export const initialState = {
  cart: {
    query: {
      getCart: apiRequestState.init(),
      addProductToCart: apiRequestState.init(),
      updateCartItemQuantity: apiRequestState.init(),
      deleteCartItems: apiRequestState.init(),
    },
    data: [],
  },
  user: {
    query: {
      signup: apiRequestState.init(),
      login: apiRequestState.init(),
      secession: apiRequestState.init(),
      getUser: apiRequestState.init(),
      updateUserPassword: apiRequestState.init(),
      updateUserGeneralInfo: apiRequestState.init(),
    },
    data: {
      isLoggedIn: false,
      email: null,
      username: null,
    },
  },
};
