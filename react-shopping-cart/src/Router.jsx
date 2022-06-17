import { useSelector } from 'react-redux';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';

import ErrorPage from 'pages/ErrorPage/ErrorPage.page';
import Login from 'pages/Login/Login.page';
import ModifyUserInfo from 'pages/ModifyUserInfo/ModifyUserInfo';
import ProductList from 'pages/ProductList/ProductList.page';
import ShoppingCartList from 'pages/ShoppingCartList/ShoppingCartList.page';
import SignUp from 'pages/SignUp/SignUp.page';

const AuthOnly = ({ accessToken }) => {
  return accessToken ? <Outlet /> : <Navigate to="/login" />;
};
const UnAuthOnly = ({ accessToken }) => {
  return !accessToken ? <Outlet /> : <Navigate to="/" />;
};

const Routers = () => {
  const { accessToken } = useSelector(state => state.auth);

  return (
    <Routes>
      <Route path="/" element={<ProductList />} />
      <Route element={<AuthOnly accessToken={accessToken} />}>
        <Route path="/cart" element={<ShoppingCartList />} />
        <Route path="/user/modify" element={<ModifyUserInfo />} />
      </Route>
      <Route element={<UnAuthOnly accessToken={accessToken} />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Route>
      <Route path="/*" element={<ErrorPage>존재하지 않는 페이지입니다</ErrorPage>} />
    </Routes>
  );
};

export default Routers;
