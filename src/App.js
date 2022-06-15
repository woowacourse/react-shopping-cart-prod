// @ts-nocheck
import { useEffect } from 'react';
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
import { getCookie } from 'utils/cookie';
import apiClient from 'apis/apiClient';
import { doLogin } from 'reducers/authReducer';
import SeverSelectPage from 'page/ServerSelectPage';

function App() {
  const dispatch = useDispatch();

  const { isVisible, message, status } = useSelector(state => state.snackbarReducer);

  const getAccount = async () => {
    try {
      const accessToken = getCookie('accessToken');
      if (!accessToken) return;

      const response = await apiClient.get('/customers');
      dispatch(doLogin({ nickname: response.data.nickname }));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAccount();
  }, []);

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
          <Route path={ROUTES.SERVER} element={<SeverSelectPage />} />
        </Routes>
        <GlobalStyles />
      </BrowserRouter>

      {isVisible && <Snackbar message={message} status={status} />}
    </ThemeProvider>
  );
}

export default App;
