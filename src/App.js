// @ts-nocheck
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import {
  ProductListPage,
  ProductDetailPage,
  CartPage,
  LoginPage,
  SignupPage,
  AccountPage,
  PaymentPage,
} from 'page';
import { Layout, Snackbar, GlobalStyles, theme } from 'components';

import { doLogin, doGetCart } from 'actions/actionCreator';
import { BASE_URL, ROUTES } from 'utils/constants';
import { getCookie } from 'utils/cookie';

function App() {
  const { isAuthenticated } = useSelector(state => state.authReducer);
  const dispatch = useDispatch();
  const { isVisible, message, status } = useSelector(state => state.snackbarReducer);

  const getAccount = async () => {
    try {
      const accessToken = getCookie('accessToken');

      if (!accessToken) return;

      const response = await axios.get('/customers', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      dispatch(doLogin({ nickname: response.data.nickname }));
    } catch (error) {}
  };

  const getCart = async () => {
    try {
      const accessToken = getCookie('accessToken');

      if (!accessToken) return;

      const response = await axios.get('/cart', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      dispatch(doGetCart({ cart: response.data }));
    } catch (error) {}
  };

  useEffect(() => {
    getAccount();
    getCart();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  useEffect(() => {
    getAccount();
    getCart();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter basename={BASE_URL}>
        <Routes>
          <Route element={<Layout />}>
            <Route path={ROUTES.HOME} element={<ProductListPage />} />
            <Route path={ROUTES.DETAILS} element={<ProductDetailPage />} />
            <Route path={ROUTES.CART} element={<CartPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/pay/:id" element={<PaymentPage />} />
          </Route>
        </Routes>
        <GlobalStyles />
      </BrowserRouter>

      {isVisible && <Snackbar message={message} status={status} />}
    </ThemeProvider>
  );
}

export default App;
