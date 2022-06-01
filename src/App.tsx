import { Route, Routes } from 'react-router-dom';

import CartPage from 'pages/CartPage/CartPage';
import EditUserInfoPage from 'pages/EditUserInfoPage/EditUserInfoPage';
import GlobalStyle from 'styles/GlobalStyle';
import Header from 'components/Layout/Header/Header';
import LoginPage from 'pages/LoginPage/LoginPage';
import MainPage from 'pages/MainPage/MainPage';
import NotFoundPage from 'pages/NotFoundPage/NotFoundPage';
import PATH from 'constants/path';
import ProductPage from 'pages/ProductPage/ProductPage';
import SignupPage from 'pages/SignupPage/SignupPage';
import { ThemeProvider } from 'styled-components';
import theme from 'styles/theme';

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Header />
        <Routes>
          <Route path={PATH.BASE} element={<MainPage />} />
          <Route path={`${PATH.PRODUCT}/:id`} element={<ProductPage />} />
          <Route path={PATH.CART} element={<CartPage />} />
          <Route path={PATH.LOGIN} element={<LoginPage />} />
          <Route path={PATH.SIGNUP} element={<SignupPage />} />
          <Route path={PATH.EDIT_USER_INFO} element={<EditUserInfoPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
