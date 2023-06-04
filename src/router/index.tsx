import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home';
import Cart from '../pages/Cart';
import Order from '../pages/Order';
import OrderDetail from '../pages/OrderDetail';
import NotFound from '../pages/NotFound';

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      errorElement: <NotFound />,
      children: [
        {
          path: '',
          element: <Home />,
        },
        {
          path: '/cart',
          element: <Cart />,
        },
        {
          path: '/orders',
          element: <Order />,
        },
        {
          path: '/orders/:id',
          element: <OrderDetail />,
        },
      ],
    },
  ],
  { basename: process.env.PUBLIC_URL }
);

export default router;
