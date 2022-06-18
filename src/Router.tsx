import { Route, Routes, Navigate, useRoutes } from 'react-router-dom';
import ItemDetail from 'pages/ItemDetailPage';
import NotFound from 'pages/NotFoundPage';
import CartPage from 'pages/CartPage';
import SignInPage from 'pages/SignInPage';
import SignUpPage from 'pages/SignUpPage';
import EditPasswordPage from 'pages/EditPasswordPage';
import ResignPage from 'pages/ResignPage';
import PrivateLayout from 'components/PrivateLayout';
import { lazy } from 'react';

export const PATH = {
  notFound: '*',
  default: '/',
  main: '/main/:id',
  itemDetail: '/item_detail/:id',
  cart: '/cart',
  signIn: '/signIn',
  signUp: '/signUp',
  editPassword: '/editPassword',
  resign: '/resign',
};

const ItemListPage = lazy(() => import('pages/ItemListPage'));

const Router = () => {
  return useRoutes([
    { path: '/', element: <Navigate replace to='/main/1' /> },
    { path: PATH.main, element: <ItemListPage /> },
    { path: PATH.itemDetail, element: <ItemDetail /> },
    { path: PATH.signIn, element: <SignInPage /> },
    { path: PATH.signUp, element: <SignUpPage /> },
    {
      element: <PrivateLayout />,
      children: [
        { path: PATH.cart, element: <CartPage /> },
        { path: PATH.editPassword, element: <EditPasswordPage /> },
        { path: PATH.resign, element: <ResignPage /> },
      ],
    },
    { path: PATH.notFound, element: <NotFound /> },
  ]);
};

export default Router;
