import { ROUTE } from 'constants/route';

import Home from 'pages/Home/Home';
import OrderList from 'pages/OrderList/OrderList';
import ProductDetail from 'pages/ProductDetail/ProductDetail';
import ShoppingCart from 'pages/ShoppingCart/ShoppingCart';
import NotFound from './NotFound/NotFound';
import Register from './Register/Register';
import Login from './Login/Login';
import UserInfo from './UserInfo/UserInfo';
import PasswordCheck from './PasswordCheck/PasswordCheck';
import UserInfoUpdate from './UserInfoUpdate/UserInfoUpdate';
import UserPasswordUpdate from './UserPasswordUpdate/UserPasswordUpdate';

export const COMMON_PAGES = {
  [ROUTE.HOME]: <Home />,
  [ROUTE.PRODUCT_DETAIL]: <ProductDetail />,
  '/*': <NotFound />,
};

export const NON_USER_PAGES = {
  [ROUTE.REGISTER]: <Register />,
  [ROUTE.LOGIN]: <Login />,
};

export const USER_PAGES = {
  [ROUTE.SHOPPING_CART]: <ShoppingCart />,
  [ROUTE.ORDER_LIST]: <OrderList />,
  [ROUTE.USER_INFO]: <UserInfo />,
  [ROUTE.PASSWORD_CHECK]: <PasswordCheck />,
  [ROUTE.USER_INFO_UPDATE]: <UserInfoUpdate />,
  [ROUTE.USER_PASSWORD_UPDATE]: <UserPasswordUpdate />,
};
