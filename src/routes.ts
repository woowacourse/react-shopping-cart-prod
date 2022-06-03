const HOME = '/';
const CART = '/cart';
const ORDER_LIST = '/order-list';
const LOGIN = '/login';
const SIGNUP = '/signup';
const USER_INFO = '/user-info';

const routes = {
  home: HOME,
  cart: CART,
  orderList: ORDER_LIST,
  productDetail: (id?: number) => {
    return `/product/${id ?? ':id'}`;
  },
  login: LOGIN,
  signup: SIGNUP,
  userInfo: USER_INFO,
};

export default routes;
