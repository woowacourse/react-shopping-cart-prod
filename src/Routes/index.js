import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Header from 'components/Header';
import Snackbar from 'components/Snackbar';

import Body from 'styles/Body';

import ProductsPage from 'pages/ProductsPage';
import ProductPage from 'pages/ProductPage';
import CartsPage from 'pages/CartsPage';
import NotFoundPage from 'pages/NotFoundPage';
import LoginPage from 'pages/LoginPage';
import SignUpPage from 'pages/SignUpPage';
import ProfilePage from 'pages/ProfilePage';
import WithdrawalPage from 'pages/WithdrawalPage';

import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

import { PATH } from 'constants';

const Router = () => {
  const { show, message } = useSelector((state) => state.snackbar);

  return (
    <BrowserRouter>
      <Header />
      <Body>
        <Routes>
          <Route path={PATH.HOME} element={<ProductsPage />} />
          <Route path={`${PATH.PRODUCTS}/:page`} element={<ProductsPage />} />
          <Route
            path={`${PATH.PRODUCT}/:productId`}
            element={<ProductPage />}
          />
          <Route
            path={PATH.CARTS}
            element={
              <PrivateRoute>
                <CartsPage />
              </PrivateRoute>
            }
          />
          <Route
            path={PATH.LOGIN}
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />
          <Route
            path={PATH.SIGNUP}
            element={
              <PublicRoute>
                <SignUpPage />
              </PublicRoute>
            }
          />
          <Route
            path={PATH.PROFILE}
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          />
          <Route
            path={PATH.WITHDRAWAL}
            element={
              <PrivateRoute path={PATH.HOME} showMessage={false}>
                <WithdrawalPage />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        {show && <Snackbar key={Date.now()} message={message} />}
      </Body>
    </BrowserRouter>
  );
};

export default Router;
