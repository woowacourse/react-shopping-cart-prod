import { lazy, ReactElement } from 'react';
import { Navigate, Route, Routes, Outlet } from 'react-router-dom';

import Login from 'pages/Login';
import Signup from 'pages/Signup';
import UserEdit from 'pages/UserEdit';
import UserWithDrawal from 'pages/UserWithDrawal';

import { useAppSelector } from 'hooks/useAppSelector';

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
  element: ReactElement;
}

const ItemList = lazy(() => import('pages/ItemList'));
const ItemDetail = lazy(() => import('pages/ItemDetail'));
const Cart = lazy(() => import('pages/Cart'));
const NotFound = lazy(() => import('pages/NotFound'));

const PrivateWrapper = ({ isAuthenticated }) => {
  return isAuthenticated ? <Outlet /> : <Navigate to='/' />;
};

const PublicWrapper = ({ isAuthenticated, restricted }) => {
  return isAuthenticated && restricted ? <Navigate to='/' /> : <Outlet />;
};

const ROUTES: RoutesType[] = [
  { path: PATH.home, element: <Navigate replace to='/main/1' /> },
  { path: PATH.main, element: <ItemList /> },
  { path: PATH.itemDetail, element: <ItemDetail /> },
  { path: PATH.notFound, element: <NotFound /> },
];

const Routers = () => {
  const isLogin = useAppSelector(state => !!state.user.data);

  return (
    <Routes>
      <Route element={<PrivateWrapper isAuthenticated={isLogin} />}>
        <Route path={PATH.cart} element={<Cart />} />
        <Route path={PATH.editUser} element={<UserEdit />} />
        <Route path={PATH.withdrawal} element={<UserWithDrawal />} />
      </Route>
      <Route element={<PublicWrapper isAuthenticated={isLogin} restricted={true} />}>
        <Route path={PATH.login} element={<Login />} />
        <Route path={PATH.signup} element={<Signup />} />
      </Route>
      {ROUTES.map((ROUTE, idx) => (
        <Route {...ROUTE} key={idx} />
      ))}
    </Routes>
  );
};

export default Routers;
