import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import routes from './routes';

import { useSelector } from 'react-redux';
import { RootState } from './redux/store';

import { SnackBar } from './components/@shared';
import { NavBar } from './components';
import {
  Cart,
  Login,
  NotFound,
  OrderList,
  ProductDetail,
  ProductList,
  Signup,
  UserInfo,
} from './pages';

function App() {
  const { isShowSnackBar, message } = useSelector((state: RootState) => state.snackBar);

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <NavBar />
      <Routes>
        <Route path={routes.home} element={<ProductList />} />
        <Route path={routes.productDetail()} element={<ProductDetail />} />
        <Route path={routes.cart} element={<Cart />} />
        <Route path={routes.orderList} element={<OrderList />} />
        <Route path={routes.login} element={<Login />} />
        <Route path={routes.signup} element={<Signup />} />
        <Route path={routes.userInfo} element={<UserInfo />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
      {isShowSnackBar && <SnackBar key={Date.now()} message={message} />}
    </Router>
  );
}

export default App;
