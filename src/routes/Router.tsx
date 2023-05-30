import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Cart from '../Page/Cart';
import Home from '../Page/Home';
import NotFound from '../Page/NotFound';
import Order from '../Page/Order';
import { ROUTE_PATH } from '../constants';
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
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default Router;
