import { Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";

import Home from "@/pages/Home";
import Cart from "@/pages/Cart";
import NotFound from "@/pages/NotFound";
import Signin from "@/pages/Signin";
import Signup from "@/pages/Signup";
import UserEdit from "@/pages/UserEdit";
import ProductDetail from "@/pages/ProductDetail";

import Layout from "@/components/Layout";
import Snackbar from "@/components/Snackbar";

import theme from "@/styles/theme";
import GlobalStyle from "@/styles/reset";

import { PATH } from "@/constants";

// if (process.env.NODE_ENV === "development") {
//   const { worker } = require("./mocks/browser");
//   worker.start();
// }

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
