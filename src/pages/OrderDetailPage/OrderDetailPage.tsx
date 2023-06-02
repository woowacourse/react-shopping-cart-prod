import { OrderDetail } from '@views/Payment/components/OrderDetail';
import { Suspense } from 'react';
import { useParams } from 'react-router-dom';

function OrderDetailPage() {
  const { orderId } = useParams();

  return (
    <main>
      <Suspense fallback={<h1>하잇</h1>}>
        <OrderDetail orderId={Number(orderId)} />
      </Suspense>
    </main>
  );
}

export default OrderDetailPage;
