import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Order from 'src/Page/Order';
import Cart from 'src/Page/Cart';
import Home from 'src/Page/Home';
import NotFound from 'src/Page/NotFound';
import { ROUTE_PATH } from 'src/constants';
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
