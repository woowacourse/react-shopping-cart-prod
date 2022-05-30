import { Suspense, lazy } from 'react';
import ImgWrapper from 'components/Common/ImgWrapper/ImgWrapper';
import spinner from 'assets/svg/spinner.svg';

// eslint-disable-next-line react/display-name
const Loadable = (Component) => (props) =>
  (
    <Suspense fallback={<ImgWrapper src={spinner} size={100} />}>
      <Component {...props} />
    </Suspense>
  );

export const ProductList = Loadable(lazy(() => import('pages/ProductList')));
export const Product = Loadable(lazy(() => import('pages/Product')));
export const Cart = Loadable(lazy(() => import('pages/Cart')));
export const NotFound = Loadable(lazy(() => import('pages/NotFound')));
