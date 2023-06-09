import AsyncBoundary from '../../components/AsyncBoundary/AsyncBoundary';
import Loading from '../../components/common/Loading/Loading';
import OrderList from '../../components/OrderPage/OrderList/OrderList';

const OrderPage = () => {
  return (
    <AsyncBoundary loadingFallback={<Loading />}>
      <OrderList />
    </AsyncBoundary>
  );
};

export default OrderPage;
