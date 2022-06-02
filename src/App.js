// @ts-nocheck
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { ProductListPage, ProductDetailPage, CartPage } from 'page';
import { GlobalStyles, theme } from 'components';

import { BASE_URL, MESSAGE, ROUTES } from 'utils/constants';
import LoginPage from 'page/LoginPage';
import SignupPage from 'page/SignupPage';
import AccountPage from 'page/AccountPage';
import { useEffect } from 'react';
import axios from 'axios';
import { deleteCookie, getCookie } from 'utils/cookie';
import store from 'store/store';
import { doLogin, doLogout } from 'actions/actionCreator';
import Layout from 'components/Layout';
import { useSelector } from 'react-redux';
import Snackbar from 'components/Snackbar';
import useSnackbar from 'hooks/useSnackbar';

function App() {
  const { isVisible, message, status } = useSelector(state => state.snackbarReducer);
  const [renderSnackbar] = useSnackbar();

  const getAccount = async () => {
    try {
      const accessToken = getCookie('accessToken');
      if (!accessToken) return;

      const response = await axios.get('/customers', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      store.dispatch(doLogin({ nickname: response.data.nickname }));
    } catch (error) {
      deleteCookie('accessToken');
      store.dispatch(doLogout());
      renderSnackbar(MESSAGE.NO_AUTHORIZATION, 'FAILED');
    }
  };

  useEffect(() => {
    getAccount();
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
          </Route>
        </Routes>
        <GlobalStyles />
      </BrowserRouter>

      {isVisible && <Snackbar message={message} status={status} />}
    </ThemeProvider>
  );
}

export default App;
