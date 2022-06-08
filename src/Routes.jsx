import { Routes, Route } from 'react-router-dom';

import AccessDeniedPage from 'pages/AccessDeniedPage';
import CartListPage from 'pages/CartListPage';
import LoginPage from 'pages/LoginPage';
import LogoutPage from 'pages/LogoutPage';
import NotFoundPage from 'pages/NotFoundPage';
import ProductListPage from 'pages/ProductListPage';
import ProfilePage from 'pages/ProfilePage';
import SignUpPage from 'pages/SignUpPage/index';
import WithdrawalPage from 'pages/WithdrawalPage';

import useAuth from 'hooks/useAuth';

import RequireAuth from 'components/RequireAuth';

import { PAGE_LIST } from 'constants/';

import MembersLayout from 'layout/MembersLayout';
import ShoppingLayout from 'layout/ShoppingLayout';

function PageRoutes() {
  const { isLogin } = useAuth();

  return (
    <Routes>
      <Route element={<ShoppingLayout />}>
        <Route index element={<ProductListPage />} />
        <Route path={PAGE_LIST.PRODUCT_LIST} element={<ProductListPage />} />
        <Route path={PAGE_LIST.CART_LIST} element={<CartListPage />} />

        <Route element={<RequireAuth isAllow={isLogin} isDeniedPageEnabled />}>
          <Route path={PAGE_LIST.PROFILE} element={<ProfilePage />} />
          <Route path={PAGE_LIST.WITHDRAWAL} element={<WithdrawalPage />} />
        </Route>

        <Route path={PAGE_LIST.ACCESS_DENIED} element={<AccessDeniedPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      <Route element={<MembersLayout />}>
        <Route element={<RequireAuth isAllow={!isLogin} />}>
          <Route path={PAGE_LIST.SIGN_UP} element={<SignUpPage />} />
          <Route path={PAGE_LIST.LOGIN} element={<LoginPage />} />
        </Route>

        <Route path={PAGE_LIST.LOGOUT} element={<LogoutPage />} />
      </Route>
    </Routes>
  );
}

export default PageRoutes;
