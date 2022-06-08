import { Route, Routes, Navigate } from 'react-router-dom';
import ItemDetail from 'pages/ItemDetailPage';
import NotFound from 'pages/NotFoundPage';
import ItemListPage from 'pages/ItemListPage';
import CartPage from 'pages/CartPage';
import SignInPage from 'pages/SignInPage';
import SignUpPage from 'pages/SignUpPage';
import EditPasswordPage from 'pages/EditPasswordPage';
import ResignPage from 'pages/ResignPage';

export const PATH = {
  notFound: '*',
  default: '/',
  main: '/main',
  itemList: '/main/:id',
  itemDetail: '/item_detail/:id',
  cart: '/cart',
  signIn: '/signIn',
  signUp: '/signUp',
  editPassword: '/editPassword',
  resign: '/resign',
};

const Router = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigate replace to='/main/1' />} />
      <Route path={PATH.main} element={<Navigate replace to='/main/1' />} />
      <Route path={PATH.itemList} element={<ItemListPage />} />
      <Route path={PATH.itemDetail} element={<ItemDetail />} />
      <Route path={PATH.cart} element={<CartPage />} />
      <Route path={PATH.signIn} element={<SignInPage />} />
      <Route path={PATH.signUp} element={<SignUpPage />} />
      <Route path={PATH.editPassword} element={<EditPasswordPage />} />
      <Route path={PATH.resign} element={<ResignPage />} />
      <Route path={PATH.notFound} element={<NotFound />} />
    </Routes>
  );
};

export default Router;
