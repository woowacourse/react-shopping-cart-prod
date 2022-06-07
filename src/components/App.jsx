import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ThemeProvider } from "styled-components";

import { theme } from "style";

import { ROUTES } from "constants";

import { getUser } from "reducers/user";

import Redirect from "./hoc/Redirect";
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

function App() {
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.user.isLogin);

  useEffect(() => {
    if (isLogin) {
      dispatch(getUser());
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Header isLogin={isLogin} />
      <Main>
        <Routes>
          <Route path={ROUTES.ROOT} element={<ProductListPage />} />
          <Route path={ROUTES.PRODUCT_LIST} element={<ProductListPage />} />
          <Route
            path={`${ROUTES.PRODUCT_DETAIL}/:id`}
            element={<ProductDetailPage />}
          />
          <Route
            element={
              <Redirect
                redirectCondition={!isLogin}
                redirectPath={ROUTES.LOGIN}
              />
            }
          >
            <Route path={ROUTES.PRODUCT_CART} element={<ProductCartPage />} />
            <Route
              path={ROUTES.PRODUCT_ORDER_LIST}
              element={<OrderListPage />}
            />
            <Route path={ROUTES.USER_INFO} element={<UserInfoPage />} />
          </Route>
          <Route
            element={
              <Redirect
                redirectCondition={isLogin}
                redirectPath={ROUTES.ROOT}
              />
            }
          >
            <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
            <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          </Route>
          <Route path="*" element={<ErrorPage>잘못된 접근입니다.</ErrorPage>} />
        </Routes>
      </Main>
    </ThemeProvider>
  );
}

export default App;
