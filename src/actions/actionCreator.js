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

const doInitializeCart = () => ({ type: CART_ACTIONS.INITIALIZE });

const doInitializeProductList = ({ products }) => ({
  type: PRODUCT_LIST_ACTIONS.INITIALIZE,
  products,
});

const doAddProdcutToOrder = ({ id }) => ({ type: ORDER_ACTIONS.ADD, id });

const doDeleteProductFromOrder = ({ id }) => ({ type: ORDER_ACTIONS.DELETE, id });

const doInitializeOrder = () => ({ type: ORDER_ACTIONS.INITIALIZE });

const doLogin = ({ nickname }) => ({ type: AUTH_ACTIONS.LOGIN, nickname });

const doLogout = () => ({ type: AUTH_ACTIONS.LOGOUT });

const doShowSnackbar = ({ message, status }) => ({ type: SNACKBAR_ACTIONS.SHOW, message, status });

const doHideSnackbar = () => ({ type: SNACKBAR_ACTIONS.HIDE });

export {
  doPutProductToCart,
  doDeleteProductFromCart,
  doSelectiveDeleteFromCart,
  doInitializeCart,
  doInitializeProductList,
  doAddProdcutToOrder,
  doDeleteProductFromOrder,
  doInitializeOrder,
  doLogin,
  doLogout,
  doShowSnackbar,
  doHideSnackbar,
};
