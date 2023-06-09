import { createBrowserRouter } from 'react-router-dom';
import { Home } from './pages/Home';
import { Cart } from './pages/Cart';
import { Order } from './pages/Order';
import { OrderDetail } from './pages/OrderDetail';
import { Layout } from './components/Layout';
import { PAGE_PATH } from './constants';
import { Payment } from './pages/Payment';
import { NotFound } from './pages/NotFound';

const router = createBrowserRouter(
  [
    {
      path: PAGE_PATH.HOME,
      element: <Layout />,
      errorElement: <NotFound />,
      children: [
        { path: PAGE_PATH.HOME, element: <Home /> },
        { path: PAGE_PATH.CART, element: <Cart /> },
        { path: PAGE_PATH.PAYMENT, element: <Payment /> },
        { path: PAGE_PATH.ORDER, element: <Order /> },
        { path: PAGE_PATH.ORDER_DETAIL, element: <OrderDetail /> },
      ],
    },
  ],
  {
    basename: '/react-shopping-cart-prod/',
  }
);

export default router;
