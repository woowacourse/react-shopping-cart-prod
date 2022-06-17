import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import ErrorPage from 'pages/ErrorPage/ErrorPage.page';
import Login from 'pages/Login/Login.page';
import ModifyUserInfo from 'pages/ModifyUserInfo/ModifyUserInfo';
import ProductList from 'pages/ProductList/ProductList.page';
import ShoppingCartList from 'pages/ShoppingCartList/ShoppingCartList.page';
import SignUp from 'pages/SignUp/SignUp.page';

import SnackBar from 'components/@shared/SnakBar/SnackBar.component';

import ErrorBoundary from 'components/ErrorBoundary/ErrorBoundary';
import Header from 'components/Header/Header.component';

import GlobalStyle from 'styles/GlobalStyle';
import theme from 'styles/theme';

const AuthOnly = () => {
  const { accessToken } = useSelector(state => state.auth);
  return accessToken ? <Outlet /> : <Navigate to="/login" />;
};
const UnAuthOnly = () => {
  const { accessToken } = useSelector(state => state.auth);
  return !accessToken ? <Outlet /> : <Navigate to="/" />;
};

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <ErrorBoundary fallback={<ErrorPage>오류가 발생했습니다</ErrorPage>}>
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route element={<AuthOnly />}>
              <Route path="/cart" element={<ShoppingCartList />} />
              <Route path="/user/modify" element={<ModifyUserInfo />} />
            </Route>
            <Route element={<UnAuthOnly />}>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
            </Route>
            <Route path="/*" element={<ErrorPage>존재하지 않는 페이지입니다</ErrorPage>} />
          </Routes>
          <SnackBar />
        </ErrorBoundary>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
