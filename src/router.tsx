import { createBrowserRouter } from 'react-router-dom';

import RootPage from './components/page/RootPage';

import ErrorPage from './components/page/ErrorPage';
import ProductList from './components/productList/ProductList';
import CartPage from './components/page/CartPage';
import OrderPage from './components/page/OrdersPage';
import OrderDetailPage from './components/page/OrderDetailPage';

import AuthPage from './components/page/AuthPage';

import LoginForm from './components/auth/LoginForm';
import JoinForm from './components/auth/JoinForm';

const routes = [
  {
    path: '',
    element: <RootPage />,
    children: [
      {
        path: '*',
        element: <ErrorPage />,
      },
      {
        path: '',
        element: <ProductList />,
      },
      {
        path: 'cart',
        element: <CartPage />,
      },
      {
        path: 'orders',
        element: <OrderPage />,
      },
      {
        path: 'orders/:orderId',
        element: <OrderDetailPage />,
      },
    ],
  },
  {
    path: 'auth',
    element: <AuthPage />,
    children: [
      {
        path: 'login',
        element: <LoginForm />,
      },
      {
        path: 'join',
        element: <JoinForm />,
      },
    ],
  },
];

export default createBrowserRouter(routes);
