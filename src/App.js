// @ts-nocheck
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import useAxiosInterceptor from 'hooks/useAxiosInterceptor';
import useCart from 'hooks/db/useCart';
import useAuth from 'hooks/db/useAuth';

import {
  ProductListPage,
  ProductDetailPage,
  CartPage,
  LoginPage,
  SignupPage,
  AccountPage,
  PaymentPage,
} from 'page';
import ServerSelectPage from 'page/ServerSelectPage';
import { Layout, Snackbar, GlobalStyles, theme } from 'components';

import { doGetCart } from 'modules/cart';
import { doLogin } from 'modules/auth';
import { ROUTES } from 'utils/constants';

function App() {
  const { getAccountAPI } = useAuth();
  const { getCartAPI } = useCart();
  const { isAuthenticated } = useSelector(state => state.authReducer);
  const dispatch = useDispatch();
  const { isVisible, message, status } = useSelector(state => state.snackbarReducer);
  useAxiosInterceptor();

  const getAccount = async () => {
    try {
      const { nickname } = await getAccountAPI();

      dispatch(doLogin({ nickname }));
    } catch (error) {}
  };

  const getCart = async () => {
    try {
      const cart = await getCartAPI();

      dispatch(doGetCart({ cart }));
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
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path={ROUTES.SERVER} element={<ServerSelectPage />} />
            <Route path={ROUTES.HOME} element={<ProductListPage />} />
            <Route path={ROUTES.DETAILS} element={<ProductDetailPage />} />
            <Route path={ROUTES.CART} element={<CartPage />} />
            <Route path={ROUTES.LOGIN} element={<LoginPage />} />
            <Route path={ROUTES.SIGNUP} element={<SignupPage />} />
            <Route path={ROUTES.ACCOUNT} element={<AccountPage />} />
            <Route path={ROUTES.PAY} element={<PaymentPage />} />
          </Route>
        </Routes>
        <GlobalStyles />
      </BrowserRouter>

      {isVisible && <Snackbar message={message} status={status} />}
    </ThemeProvider>
  );
}

export default App;
