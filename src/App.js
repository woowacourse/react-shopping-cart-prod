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
} from 'page';
import { Layout, Snackbar, GlobalStyles, theme } from 'components';

import { doLogin } from 'actions/actionCreator';
import { BASE_URL, ROUTES } from 'utils/constants';
import { getCookie } from 'utils/cookie';

function App() {
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

  useEffect(() => {
    getAccount();
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
          </Route>
        </Routes>
        <GlobalStyles />
      </BrowserRouter>

      {isVisible && <Snackbar message={message} status={status} />}
    </ThemeProvider>
  );
}

export default App;
