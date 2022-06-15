import withLoginOnly from 'components/hoc/withLoginOnly';
import withNonLoginOnly from 'components/hoc/withNonLoginOnly';
import { lazy, LazyExoticComponent } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

export const PATH = {
  home: '/',
  main: '/main/:id',
  getMain(id: number) {
    return `/main/${id}`;
  },
  itemDetail: '/item_detail/:id',
  getItemDetail(id: number) {
    return `/item_detail/${id}`;
  },
  cart: '/cart',
  signup: '/signup',
  login: '/login',
  editUser: '/edit',
  withdrawal: '/withdrawal',
  notFound: '/*',
} as const;

type PathName = keyof Omit<typeof PATH, 'getMain' | 'getItemDetail'>;
type Path = typeof PATH[PathName];

interface RoutesType {
  path: Path;
  element: LazyExoticComponent<() => JSX.Element> | ((...args) => JSX.Element);
}

const ItemList = lazy(() => import('pages/ItemList'));
const ItemDetail = lazy(() => import('pages/ItemDetail'));
const Cart = lazy(() => import('pages/Cart'));
const Signup = lazy(() => import('pages/Signup'));
const Login = lazy(() => import('pages/Login'));
const UserEdit = lazy(() => import('pages/UserEdit'));
const UserWithDrawal = lazy(() => import('pages/UserWithDrawal'));
const NotFound = lazy(() => import('pages/NotFound'));

const ROUTES: RoutesType[] = [
  { path: PATH.main, element: ItemList },
  { path: PATH.itemDetail, element: ItemDetail },
  { path: PATH.notFound, element: NotFound },

  { path: PATH.signup, element: withNonLoginOnly(Signup) },
  { path: PATH.login, element: withNonLoginOnly(Login) },

  { path: PATH.cart, element: withLoginOnly(Cart) },
  { path: PATH.editUser, element: withLoginOnly(UserEdit) },
  { path: PATH.withdrawal, element: withLoginOnly(UserWithDrawal) },
];

const Routers = () => {
  return (
    <Routes>
      <Route path={PATH.home} element={<Navigate replace to='/main/1' />} />
      {ROUTES.map(({ element: Element, ...route }) => (
        <Route key={route.path} element={<Element />} {...route} />
      ))}
    </Routes>
  );
};

export default Routers;
