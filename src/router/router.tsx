import { createBrowserRouter } from 'react-router-dom';
import Cart from '@pages/Cart';
import Home from '@pages/Home';
import Orders from '@pages/Orders';
import OrderComplete from '@pages/Orders/OrderComplete';

export const ROUTER_PATH = {
  HOME: '/',
  CART: '/cart',
  ORDERS: '/orders',
};

export const ORDER_PATH = {
  COMPLETE: `${ROUTER_PATH.ORDERS}/complete`,
};

const router = createBrowserRouter(
  [
    {
      path: ROUTER_PATH.HOME,
      element: <Home />,
    },
    {
      path: ROUTER_PATH.CART,
      element: <Cart />,
    },
    {
      path: ROUTER_PATH.ORDERS,
      element: <Orders />,
    },
    {
      path: ORDER_PATH.COMPLETE,
      element: (
        <OrderComplete
          userName="s"
          deliveryFee={1}
          discountPrice={1}
          orderItemsCount={1}
          totalItemsPrice={3}
        />
      ),
    },
  ],
  { basename: '/react-shopping-cart-prod' }
);

export default router;
