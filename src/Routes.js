import { ProductList, Product, Cart, NotFound } from 'pages';
import { PATH_NAME } from 'constants';
import Layout from 'components/Common/Layout/Layout';

const routes = [
  {
    path: PATH_NAME.HOME,
    element: <Layout />,
    children: [
      {
        path: '',
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
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
];

export default routes;
