import AsyncBoundary from '../../components/AsyncBoundary/AsyncBoundary';
import Loading from '../../components/common/Loading/Loading';
import OrderDetail from '../../components/OrderDetailPage/OrderDetail/OrderDetail';

const OrderDetailPage = () => {
  return (
    <AsyncBoundary loadingFallback={<Loading />}>
      <OrderDetail />
    </AsyncBoundary>
  );
};

export default OrderDetailPage;
