import { createBrowserRouter } from 'react-router-dom';

import CartPage from './components/page/CartPage';
import RootPage from './components/page/RootPage';
import ProductList from './components/productList/ProductList';

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
    ],
  },
];

export default createBrowserRouter(routes);
