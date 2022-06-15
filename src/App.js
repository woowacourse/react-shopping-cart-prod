// @ts-nocheck
import { useCallback, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components';

import {
  ProductListPage,
  ProductDetailPage,
  CartPage,
  OrderPage,
  LoginPage,
  SignupPage,
  AccountPage,
} from 'page';
import { GlobalStyles, theme, Layout, Snackbar } from 'components';

import { ROUTES } from 'utils/constants';
import apiClient from 'apis/apiClient';
import { loginComplete, logoutComplete } from 'reducers/authReducer';
import ServerSelectPage from 'page/ServerSelectPage';
import PrivateRoute from 'components/PrivateRoute';
import PublicRoute from 'components/PublicRoute';

function App() {
  const dispatch = useDispatch();

  const { isVisible, message, status } = useSelector(state => state.snackbarReducer);
  const { isLoading, isAuthenticated } = useSelector(state => state.authReducer);

  const getAccount = useCallback(async () => {
    try {
      const response = await apiClient.get('/customers');
      dispatch(loginComplete({ nickname: response.data.nickname }));
    } catch (error) {
      dispatch(logoutComplete());
    }
  }, [dispatch]);

  useEffect(() => {
    getAccount();
  }, [getAccount]);

  if (isLoading) {
    return;
  }

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path={ROUTES.HOME} element={<ProductListPage />} />
            <Route path={ROUTES.DETAILS_ID} element={<ProductDetailPage />} />
            <Route
              path={ROUTES.CART}
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <CartPage />
                </PrivateRoute>
              }
            />
            <Route
              path={ROUTES.ORDER}
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <OrderPage />
                </PrivateRoute>
              }
            />
            <Route
              path={ROUTES.ACCOUNT}
              element={
                <PrivateRoute isAuthenticated={isAuthenticated}>
                  <AccountPage />
                </PrivateRoute>
              }
            />

            <Route
              path={ROUTES.LOGIN}
              element={
                <PublicRoute isAuthenticated={isAuthenticated}>
                  <LoginPage />
                </PublicRoute>
              }
            />
            <Route
              path={ROUTES.SIGNUP}
              element={
                <PublicRoute isAuthenticated={isAuthenticated}>
                  <SignupPage />
                </PublicRoute>
              }
            />
          </Route>
          <Route path={ROUTES.SERVER} element={<ServerSelectPage />} />
        </Routes>
        <GlobalStyles />
      </BrowserRouter>

      {isVisible && <Snackbar message={message} status={status} />}
    </ThemeProvider>
  );
}

export default App;
