import AsyncBoundary from '../../components/AsyncBoundary/AsyncBoundary';
import OrderList from '../../components/OrderPage/OrderList';
import Loading from '../../components/common/Loading/Loading';
import ErrorPage from '../ErrorPage/ErrorPage';

const OrderPage = () => {
  return (
    <main>
      <AsyncBoundary
        loadingFallback={<Loading />}
        errorFallback={<ErrorPage />}
      >
        <OrderList />
      </AsyncBoundary>
    </main>
  );
};

export default OrderPage;
