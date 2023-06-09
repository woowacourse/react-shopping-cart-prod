import { createBrowserRouter } from 'react-router-dom';

import RootPage from './page/RootPage';
import ProductList from './components/productList/ProductList';
import CartPage from './page/CartPage';
import ErrorPage from './page/ErrorPage';
import CouponPage from './page/CouponPage';
import OrderPage from './page/OrderPage';
import OrderDetailPage from './page/OrderDetailPage';

const routes = [
  {
    path: '/',
    element: <RootPage />,
    children: [
      {
        path: '',
        element: <ProductList />,
      },
      {
        path: 'cart',
        element: <CartPage />,
      },
      {
        path: 'coupon',
        element: <CouponPage />,
      },
      {
        path: 'order',
        element: <OrderPage />,
      },
      {
        path: 'order/:id',
        element: <OrderDetailPage />,
      },
      {
        path: '*',
        element: <ErrorPage />,
      },
    ],
  },
];

export default createBrowserRouter(routes);
