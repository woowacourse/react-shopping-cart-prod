// @ts-nocheck
import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import useSnackbar from 'hooks/useSnackbar';

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

import { doLogin, doLogout } from 'actions/actionCreator';
import { MESSAGE, ROUTES } from 'utils/constants';
import { deleteCookie, getCookie } from 'utils/cookie';
import apiClient from 'apis/apiClient';

function App() {
  const dispatch = useDispatch();
  const { isVisible, message, status } = useSelector(state => state.snackbarReducer);
  const [renderSnackbar] = useSnackbar();

  const getAccount = async () => {
    try {
      const accessToken = getCookie('accessToken');
      if (!accessToken) return;

      const response = await apiClient.get('/customers');
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
