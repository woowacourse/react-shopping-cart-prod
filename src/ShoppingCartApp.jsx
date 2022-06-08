import ProductList from 'pages/ProductList';

import Snackbar from 'components/Snackbar';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from 'store';

import { Global } from '@emotion/react';
import GlobalStyles from 'styles/GlobalStyles';
import ProductDetail from 'pages/ProductDetail';
import Cart from 'pages/Cart';
import Login from 'pages/Login';
import SignUp from 'pages/SignUp';
import EditUserData from 'pages/EditUserData';
import EditUserInfo from 'pages/EditUserInfo';
import Identification from 'pages/Identification';
import EditUserPassword from 'pages/EditUserPassword';
import Auth from 'utils/Auth';
import ErrorBoundary from 'components/ErrorBoundary';

const ShoppingCartApp = () => (
  <Provider store={store}>
    <Global styles={GlobalStyles} />
    <Snackbar />
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/products/:productId" element={<ProductDetail />} />
          <Route path="/cart" element={<Auth element={<Cart />} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
          <Route path="/edit/*" element={<Auth element={<EditUserData />} />}>
            <Route path="identification" element={<Identification />} />
            <Route path="userInfo" element={<EditUserInfo />} />
            <Route path="userPassword" element={<EditUserPassword />} />
          </Route>
          <Route path="*" element={<ProductList />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  </Provider>
);

export default ShoppingCartApp;
