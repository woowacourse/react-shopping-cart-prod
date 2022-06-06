import { useEffect } from 'react';

import authAPI from 'apis/auth';
import HeaderLayout from 'components/Layout/HeaderLayout/HeaderLayout';
import {
  CartPage,
  EditUserInfoPage,
  LoginPage,
  MainPage,
  NotFoundPage,
  ProductPage,
  SignupPage,
} from 'pages';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { userActions } from 'redux/actions';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from 'styles/GlobalStyle';
import theme from 'styles/theme';
import { isLogin } from 'utils/auth';

import PATH from 'constants/path';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLogin()) {
      authAPI
        .getUserInfo()
        .then(res => {
          dispatch(userActions.setUser(res));
        })
        .catch(error => {
          localStorage.removeItem('accessToken');
          sessionStorage.removeItem('accessToken');
        });
    }
  }, [dispatch]);

  return (
    <>
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
      </ThemeProvider>
    </>
  );
}

export default App;
