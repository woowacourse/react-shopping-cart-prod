import withPrivateRoute from 'components/hoc/withPrivateRoute';
import withPublicRoute from 'components/hoc/withPublicRoute';
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
  Element: LazyExoticComponent<() => JSX.Element> | ((...args) => JSX.Element);
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
  { path: PATH.main, Element: ItemList },
  { path: PATH.itemDetail, Element: ItemDetail },
  { path: PATH.notFound, Element: NotFound },

  { path: PATH.signup, Element: withPublicRoute(Signup) },
  { path: PATH.login, Element: withPublicRoute(Login) },

  { path: PATH.cart, Element: withPrivateRoute(Cart) },
  { path: PATH.editUser, Element: withPrivateRoute(UserEdit) },
  { path: PATH.withdrawal, Element: withPrivateRoute(UserWithDrawal) },
];

const Routers = () => {
  return (
    <Routes>
      <Route path={PATH.home} element={<Navigate replace to='/main/1' />} />
      {ROUTES.map(({ Element, ...route }) => (
        <Route key={route.path} element={<Element />} {...route} />
      ))}
    </Routes>
  );
};

export default Routers;
