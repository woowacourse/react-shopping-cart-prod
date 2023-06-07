import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router-dom';
import Cart from '../pages/Cart';
import Main from '../pages/Main';
import NotFound from '../pages/NotFound';
import Order from '../pages/Order';
import { OrderDetail } from '../components';
import { OrderSheet } from '../pages/OrderSheet';

export const ROUTER_PATH = {
  Main: '/react-shopping-cart-prod',
  Cart: '/react-shopping-cart-prod/Cart',
  Order: '/react-shopping-cart-prod/Order',
  OrderDetail: '/react-shopping-cart-prod/OrderDetail',
  OrderSheet: '/react-shopping-cart-prod/OrderSheet',
  NotFound: '/*',
};

export const PageRouterProvider = () => {
  const router = createBrowserRouter([
    {
      path: ROUTER_PATH.Main,
      element: <Main />,
    },
    {
      path: ROUTER_PATH.Cart,
      element: <Cart />,
    },
    {
      path: ROUTER_PATH.Order,
      element: <Order />,
    },
    {
      path: ROUTER_PATH.OrderDetail,
      element: <OrderDetail />,
    },
    {
      path: ROUTER_PATH.NotFound,
      element: <NotFound />,
    },
    {
      path: ROUTER_PATH.OrderSheet,
      element: <OrderSheet />,
    },
  ]);
  return <RouterProvider router={router} />;
};
