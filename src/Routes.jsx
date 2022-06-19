import { Routes, Route } from 'react-router-dom';

import CartListPage from 'pages/CartListPage';
import LoginPage from 'pages/LoginPage';
import LogoutPage from 'pages/LogoutPage';
import NotFoundPage from 'pages/NotFoundPage';
import ProductListPage from 'pages/ProductListPage';
import ProfileConfirmPage from 'pages/ProfilePage/ProfileConfirmPage';
import ProfileEditPage from 'pages/ProfilePage/ProfileEditPage';
import SignUpPage from 'pages/SignUpPage/index';

import { PAGE_LIST } from 'constants/';

import MembersLayout from 'layout/MembersLayout';
import ShoppingLayout from 'layout/ShoppingLayout';

function PageRoutes() {
  return (
    <Routes>
      <Route element={<ShoppingLayout />}>
        <Route index element={<ProductListPage />} />
        <Route path={PAGE_LIST.PRODUCT_LIST} element={<ProductListPage />} />
        <Route path={PAGE_LIST.CART_LIST} element={<CartListPage />} />
        <Route path={PAGE_LIST.PROFILE_EDIT} element={<ProfileEditPage />} />
        <Route path={PAGE_LIST.PROFILE_CONFIRM} element={<ProfileConfirmPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      <Route element={<MembersLayout />}>
        <Route path={PAGE_LIST.SIGN_UP} element={<SignUpPage />} />
        <Route path={PAGE_LIST.LOGIN} element={<LoginPage />} />
        <Route path={PAGE_LIST.LOGOUT} element={<LogoutPage />} />
      </Route>
    </Routes>
  );
}

export default PageRoutes;
