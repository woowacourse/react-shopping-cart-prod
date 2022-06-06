import {
  CartPage,
  EditUserInfoPage,
  LoginPage,
  MainPage,
  NotFoundPage,
  ProductPage,
  SignupPage,
} from 'pages';
import { Route, Routes } from 'react-router-dom';

import GlobalStyle from 'styles/GlobalStyle';
import HeaderLayout from 'components/Layout/HeaderLayout/HeaderLayout';
import PATH from 'constants/path';
import { ThemeProvider } from 'styled-components';
import authAPI from 'apis/auth';
import { isLogin } from 'utils/auth';
import theme from 'styles/theme';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { userActions } from 'redux/actions';

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
