import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from 'store';

import { Global } from '@emotion/react';
import GlobalStyles from 'styles/GlobalStyles';

import ProductList from 'pages/ProductList';
import ProductDetail from 'pages/ProductDetail';
import Cart from 'pages/Cart';
import Login from 'pages/Login';
import SignUp from 'pages/SignUp';
import EditUserInfo from 'pages/EditUserInfo';
import Identification from 'pages/Identification';
import EditUserPassword from 'pages/EditUserPassword';

import Snackbar from 'components/Snackbar';

const ShoppingCartApp = () => (
  <Provider store={store}>
    <Global styles={GlobalStyles} />
    <Snackbar />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="product/:id" element={<ProductDetail />} />
        <Route path="cart" element={<Cart />} />
        <Route path="login" element={<Login />} />
        <Route path="signUp" element={<SignUp />} />
        <Route path="identification" element={<Identification />} />
        <Route path="editUserInfo" element={<EditUserInfo />} />
        <Route path="editUserPassword" element={<EditUserPassword />} />
        <Route path="*" element={<ProductList />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);

export default ShoppingCartApp;
