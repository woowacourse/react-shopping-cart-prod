/* eslint-disable react/jsx-wrap-multilines */
import { Routes, Route, Outlet } from 'react-router-dom';

import CartListPage from 'pages/CartListPage';
import NotFoundPage from 'pages/NotFoundPage';
import ProductListPage from 'pages/ProductListPage';
import SignUpPage from 'pages/SignUpPage';

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
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      <Route element={<MembersLayout />}>
        <Route path={PAGE_LIST.SIGN_UP} element={<SignUpPage />} />
      </Route>
    </Routes>
  );
}

export default PageRoutes;
