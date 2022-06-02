import Home from 'pages/Home/Home';
import Login from 'pages/Login/Login';
import NotFound from 'pages/NotFound/NotFound';
import OrderList from 'pages/OrderList/OrderList';
import PasswordCheck from 'pages/PasswordCheck/PasswordCheck';
import ProductDetail from 'pages/ProductDetail/ProductDetail';
import Register from 'pages/Register/Register';
import ShoppingCart from 'pages/ShoppingCart/ShoppingCart';
import UserInfo from 'pages/UserInfo/UserInfo';
import UserInfoUpdate from 'pages/UserInfoUpdate/UserInfoUpdate';
import UserPasswordUpdate from 'pages/UserPasswordUpdate/UserPasswordUpdate';

import { ROUTE } from 'constants/route';

export const COMMON_PAGES = [
  { path: ROUTE.HOME, element: <Home /> },
  { path: ROUTE.PRODUCT_DETAIL, element: <ProductDetail /> },
  { path: ROUTE.FALLBACK, element: <NotFound /> },
];

export const NON_USER_PAGES = [
  { path: ROUTE.REGISTER, element: <Register /> },
  { path: ROUTE.LOGIN, element: <Login /> },
];

export const USER_PAGES = [
  { path: ROUTE.SHOPPING_CART, element: <ShoppingCart /> },
  { path: ROUTE.ORDER_LIST, element: <OrderList /> },
  { path: ROUTE.USER_INFO, element: <UserInfo /> },
  { path: ROUTE.PASSWORD_CHECK, element: <PasswordCheck /> },
  { path: ROUTE.USER_INFO_UPDATE, element: <UserInfoUpdate /> },
  { path: ROUTE.USER_PASSWORD_UPDATE, element: <UserPasswordUpdate /> },
];
