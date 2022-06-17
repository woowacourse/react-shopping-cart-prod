import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "styled-components";

import { theme } from "style";
import { ROUTES, COOKIE_KEY } from "constants";
import { getCookie } from "util/cookie";
import { getUser } from "reducers/user";

import Header from "components/layout/Header";
import {
  OrderListPage,
  ProductCartPage,
  ProductDetailPage,
  ProductListPage,
} from "./pages";
import { Main } from "./layout/Main";
import ErrorPage from "./pages/ErrorPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import UserInfoPage from "./pages/UserInfoPage";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();

  if (getCookie(COOKIE_KEY.TOKEN)) {
    dispatch(getUser());
  }

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <Main>
        <Routes>
          <Route path={ROUTES.ROOT} element={<ProductListPage />} />
          <Route path={ROUTES.PRODUCT_LIST} element={<ProductListPage />} />
          <Route
            path={`${ROUTES.PRODUCT_DETAIL}/:id`}
            element={<ProductDetailPage />}
          />
          <Route path={ROUTES.PRODUCT_CART} element={<ProductCartPage />} />
          <Route path={ROUTES.PRODUCT_ORDER_LIST} element={<OrderListPage />} />
          <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          <Route path={ROUTES.USER_INFO} element={<UserInfoPage />} />
          <Route path="*" element={<ErrorPage>잘못된 접근입니다.</ErrorPage>} />
        </Routes>
      </Main>
    </ThemeProvider>
  );
}

export default App;
