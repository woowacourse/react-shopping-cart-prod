import { createBrowserRouter } from 'react-router-dom';

import RootPage from './components/page/RootPage';
import ProductList from './components/productList/ProductList';
import CartPage from './components/page/CartPage';
import ErrorPage from './components/page/ErrorPage';

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
        path: '*',
        element: <ErrorPage />,
      },
    ],
  },
];

export default createBrowserRouter(routes);
