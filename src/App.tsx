import { Route, Routes } from 'react-router-dom';

import CartPage from 'pages/CartPage/CartPage';
import EditUserInfoPage from 'pages/EditUserInfoPage/EditUserInfoPage';
import GlobalStyle from 'styles/GlobalStyle';
import HeaderLayout from 'components/Layout/HeaderLayout/HeaderLayout';
import LoginPage from 'pages/LoginPage/LoginPage';
import MainPage from 'pages/MainPage/MainPage';
import NotFoundPage from 'pages/NotFoundPage/NotFoundPage';
import PATH from 'constants/path';
import ProductPage from 'pages/ProductPage/ProductPage';
import SignupPage from 'pages/SignupPage/SignupPage';
import { ThemeProvider } from 'styled-components';
import theme from 'styles/theme';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import SnackBar from 'components/@shared/SnackBar';
import axios from 'axios';
import cartAPI from 'apis/cart';
import { cartActions } from 'redux/actions';

function App() {
  // const dispatch = useDispatch();
  // const test = async () => {
  //   const data = await cartAPI.addCartItem();
  //   dispatch(cartActions.setCartItemList(data));
  // };
  // test();

  const { isShowSnackBar, message } = useSelector(
    (state: RootState) => state.snackBar
  );

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Routes>
        <Route path={PATH.BASE} element={<HeaderLayout />}>
          <Route path={PATH.BASE} element={<MainPage />} />
          <Route path={`${PATH.PRODUCT}/:id`} element={<ProductPage />} />
          <Route path={PATH.CART} element={<CartPage />} />
          <Route path={PATH.EDIT_USER_INFO} element={<EditUserInfoPage />} />
        </Route>
        <Route path={PATH.LOGIN} element={<LoginPage />} />
        <Route path={PATH.SIGNUP} element={<SignupPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      {isShowSnackBar && <SnackBar key={Date.now()} message={message} />}
    </ThemeProvider>
  );
}

export default App;
