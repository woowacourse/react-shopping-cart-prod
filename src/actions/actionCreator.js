import {
  CART_ACTIONS,
  PRODUCT_LIST_ACTIONS,
  ORDER_ACTIONS,
  AUTH_ACTIONS,
  SNACKBAR_ACTIONS,
} from 'actions/action';

const doPutProductToCart = ({ id, quantity }) => ({ type: CART_ACTIONS.PUT, id, quantity });

const doDeleteProductFromCart = ({ id }) => ({ type: CART_ACTIONS.DELETE, id });

const doSelectiveDeleteFromCart = () => ({ type: CART_ACTIONS.SELECTIVE_DELETE });

const doInitializeProductList = ({ products }) => ({
  type: PRODUCT_LIST_ACTIONS.INITIALIZE,
  products,
});

const doInitializeCartList = ({ shoppingCart }) => ({
  type: CART_ACTIONS.INITIALIZE,
  shoppingCart,
});

const doAddProductToOrder = ({ id }) => ({ type: ORDER_ACTIONS.ADD, id });

const doDeleteProductFromOrder = ({ id }) => ({ type: ORDER_ACTIONS.DELETE, id });

const doInitializeOrder = () => ({ type: ORDER_ACTIONS.INITIALIZE });

const doDecideOrder = ({ orderList }) => ({ type: ORDER_ACTIONS.DECISION, orderList });

const doLogin = ({ nickname }) => ({ type: AUTH_ACTIONS.LOGIN, nickname });

const doLogout = () => ({ type: AUTH_ACTIONS.LOGOUT });

const doShowSnackbar = ({ message, status }) => ({ type: SNACKBAR_ACTIONS.SHOW, message, status });

const doHideSnackbar = () => ({ type: SNACKBAR_ACTIONS.HIDE });

export {
  doPutProductToCart,
  doDeleteProductFromCart,
  doSelectiveDeleteFromCart,
  doInitializeProductList,
  doInitializeCartList,
  doAddProductToOrder,
  doDeleteProductFromOrder,
  doInitializeOrder,
  doDecideOrder,
  doLogin,
  doLogout,
  doShowSnackbar,
  doHideSnackbar,
};
