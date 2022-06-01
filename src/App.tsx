import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from './redux/store';

import SnackBar from './components/@shared/SnackBar';
import NavBar from './components/NavBar';

import { Cart, Login, NotFound, OrderList, ProductDetail, ProductList } from './pages';
import routes from './routes';

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
        <Route path="/*" element={<NotFound />} />
      </Routes>
      {isShowSnackBar && <SnackBar key={Date.now()} message={message} />}
    </Router>
  );
}

export default App;
