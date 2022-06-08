import {
  ProductList,
  Product,
  Cart,
  NotFound,
  Login,
  ModifyProfile,
  SignUp,
  ServerPick,
} from 'pages';
import { PATH_NAME } from 'constants';
import Layout from 'components/Common/Layout/Layout';

const routes = [
  {
    path: PATH_NAME.HOME,
    element: <Layout />,
    children: [
      {
        path: '',
        element: <ServerPick />,
      },
      {
        path: PATH_NAME.PRODUCT,
        element: <ProductList />,
      },
      {
        path: `${PATH_NAME.PRODUCT}/:id`,
        element: <Product />,
      },
      {
        path: PATH_NAME.CART,
        element: <Cart />,
      },
      {
        path: PATH_NAME.LOGIN,
        element: <Login />,
      },
      {
        path: PATH_NAME.SIGN_UP,
        element: <SignUp />,
      },
      {
        path: PATH_NAME.MODIFY_PROFILE,
        element: <ModifyProfile />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

export default routes;
