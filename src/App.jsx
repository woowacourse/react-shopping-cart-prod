import { ThemeProvider } from "@emotion/react";
import { Route, Routes } from "react-router-dom";

import Layout from "@/components/Layout";
import Snackbar from "@/components/Snackbar";
import { PATH } from "@/constants";
import {
  Cart,
  Home,
  NotFound,
  ProductDetail,
  Signin,
  Signup,
  UserEdit,
} from "@/pages";
import GlobalStyle from "@/styles/reset";
import theme from "@/styles/theme";

if (process.env.NODE_ENV === "development") {
  const { worker } = require("./mocks/browser");
  worker.start();
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Routes>
        <Route element={<Layout />}>
          <Route path={PATH.HOME} element={<Home />} />
          <Route path={PATH.LOGIN} element={<Signin />} />
          <Route path={PATH.REGISTER} element={<Signup />} />
          <Route path={PATH.EDIT} element={<UserEdit />} />
          <Route path={`${PATH.DETAIL}/:id`} element={<ProductDetail />} />
          <Route path={PATH.CART} element={<Cart />} />
          <Route path={PATH.NOT_FOUND} element={<NotFound />} />
        </Route>
      </Routes>
      <Snackbar timeout={3000} />
    </ThemeProvider>
  );
}

export default App;
