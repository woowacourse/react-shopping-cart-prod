import { Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import CartPage from 'pages/CartPage/CartPage';
import EditUserInfoPage from 'pages/EditUserInfoPage/EditUserInfoPage';
import LoginPage from 'pages/LoginPage/LoginPage';
import MainPage from 'pages/MainPage/MainPage';
import NotFoundPage from 'pages/NotFoundPage/NotFoundPage';
import ProductPage from 'pages/ProductPage/ProductPage';
import SignupPage from 'pages/SignupPage/SignupPage';

import HeaderLayout from 'components/Layout/HeaderLayout/HeaderLayout';
import PrivateLayout from 'components/Layout/PrivateLayout/PrivateLayout';

import GlobalStyle from 'styles/GlobalStyle';
import theme from 'styles/theme';

import PATH from 'constants/path';

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Routes>
          <Route element={<HeaderLayout />}>
            <Route path={PATH.BASE} element={<MainPage />} />
            <Route path={`${PATH.PRODUCT}/:id`} element={<ProductPage />} />
            <Route path={PATH.CART} element={<CartPage />} />
          </Route>
          <Route element={<PrivateLayout />}>
            <Route path={PATH.EDIT_USER_INFO} element={<EditUserInfoPage />} />
          </Route>
          <Route path={PATH.LOGIN} element={<LoginPage />} />
          <Route path={PATH.SIGNUP} element={<SignupPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
