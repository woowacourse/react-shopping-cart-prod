import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ROUTE_PATH } from 'src/constants';
import Cart from 'src/Page/Cart';
import Home from 'src/Page/Home';
import NotFound from 'src/Page/NotFound';
import Order from 'src/Page/Order';
import OrderDetail from 'src/Page/OrderDetail';
import Root from './Root';

function Router() {
  const router = createBrowserRouter([
    {
      path: ROUTE_PATH.DEFAULT,
      element: <Root />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Home /> },
        { path: ROUTE_PATH.CART, element: <Cart /> },
        { path: ROUTE_PATH.ORDER, element: <Order /> },
        { path: ROUTE_PATH.ORDER_DETAIL(), element: <OrderDetail /> },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default Router;
