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
import { loginComplete } from 'reducers/authReducer';
import ServerSelectPage from 'page/ServerSelectPage';

function App() {
  const dispatch = useDispatch();

  const { isVisible, message, status } = useSelector(state => state.snackbarReducer);

  const getAccount = useCallback(async () => {
    const response = await apiClient.get('/customers');
    dispatch(loginComplete({ nickname: response.data.nickname }));
  }, [dispatch]);

  useEffect(() => {
    getAccount();
  }, [getAccount]);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path={ROUTES.HOME} element={<ProductListPage />} />
            <Route path={ROUTES.DETAILS_ID} element={<ProductDetailPage />} />
            <Route path={ROUTES.CART} element={<CartPage />} />
            <Route path={ROUTES.ORDER} element={<OrderPage />} />
            <Route path={ROUTES.LOGIN} element={<LoginPage />} />
            <Route path={ROUTES.SIGNUP} element={<SignupPage />} />
            <Route path={ROUTES.ACCOUNT} element={<AccountPage />} />
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
