// @ts-nocheck
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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

import { MESSAGE, ROUTES } from 'utils/constants';
import { useEffect } from 'react';
import { deleteCookie, getCookie } from 'utils/cookie';
import { doLogin, doLogout } from 'actions/actionCreator';
// import Layout from 'components/Layout';
import { useSelector } from 'react-redux';
// import Snackbar from 'components/Snackbar';
import useSnackbar from 'hooks/useSnackbar';
import { authApiClient } from 'apis/apiClient';
import { useDispatch } from 'react-redux';

function App() {
  const dispatch = useDispatch();
  const { isVisible, message, status } = useSelector(state => state.snackbarReducer);
  const [renderSnackbar] = useSnackbar();

  const getAccount = async () => {
    try {
      const accessToken = getCookie('accessToken');
      if (!accessToken) return;

      const response = await authApiClient.get('/customers');
      dispatch(doLogin({ nickname: response.data.nickname }));
    } catch (error) {
      deleteCookie('accessToken');
      dispatch(doLogout());
      renderSnackbar(MESSAGE.NO_AUTHORIZATION, 'FAILED');
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
            <Route path={ROUTES.DETAILS} element={<ProductDetailPage />} />
            <Route path={ROUTES.CART} element={<CartPage />} />
            <Route path={ROUTES.ORDER} element={<OrderPage />} />
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
