import React from 'react';
import {ThemeProvider} from 'styled-components';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Header from 'component/Header';
import ProductListPage from 'page/ProductListPage';
import ProductDetailPage from 'page/ProductDetailPage';
import ProductCartPage from 'page/ProductCartPage';
import SignUpPage from 'page/SignUpPage';

import theme from 'theme/theme';
import {GlobalStyles} from 'style/globalStyle';

import {PATH} from 'constant';

import NotFoundPage from 'page/NotFoundPage';
import LoginPage from 'page/LoginPage';
import UserInfoEditPage from 'page/UserInfoEditPage';
import WithdrawalPage from 'page/WithdrawalPage';
import OrderPayPage from 'page/OrderPayPage';

if (process.env.NODE_ENV === 'development') {
  const {worker} = require('./mocks/browsers');
  worker.start();
}

export default function App() {
  return (
    <Router basename={process.env.PUBLIC_URL}>
      <div className="App">
        <ThemeProvider theme={theme}>
          <GlobalStyles />
          <Header />
          <Routes>
            <Route path={PATH.HOME} element={<ProductListPage />}></Route>
            <Route path={`${PATH.DETAIL}/:id`} element={<ProductDetailPage />}></Route>
            <Route path={PATH.CART} element={<ProductCartPage />}></Route>
            <Route
              path={PATH.ORDER_LIST}
              element={<NotFoundPage> 아직 개발중인 페이지입니다🔨</NotFoundPage>}
            ></Route>
            <Route path={PATH.ORDER_PAY} element={<OrderPayPage />}></Route>
            <Route path={PATH.LOGIN} element={<LoginPage />}></Route>
            <Route path={PATH.SIGN_UP} element={<SignUpPage />}></Route>
            <Route path={PATH.EDIT_USER_INFO} element={<UserInfoEditPage />}></Route>
            <Route path={PATH.WITHDRAWAL} element={<WithdrawalPage />}></Route>
            <Route path="*" element={<NotFoundPage> 잘못 들어왔어요😢</NotFoundPage>}></Route>
          </Routes>
        </ThemeProvider>
      </div>
    </Router>
  );
}
