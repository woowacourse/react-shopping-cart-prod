import { Suspense } from 'react';
import { useParams } from 'react-router-dom';
import OrderDetail from './OrderDetail';

const OrderDetailPage = () => {
  const { orderId } = useParams();
  if (!orderId) {
    return <div>잘못된 접근입니다.</div>;
  }
  return (
    <div>
      <Suspense>
        <OrderDetail orderId={+orderId} />
      </Suspense>
    </div>
  );
};

export default OrderDetailPage;
