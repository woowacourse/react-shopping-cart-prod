import { useLocation } from 'react-router-dom';
import ContentLayout from 'src/components/Common/ContentLayout';
import OrderItem from 'src/components/OrderItem';
import PaymentsView from 'src/components/PaymentsView';
import { orderDetail } from 'src/data/mockData';

function OrderDetail() {
  const location = useLocation();
  const orderId = location.pathname.split('/').at(-1);
  console.log(orderId);
  const data = orderDetail;

  return (
    <ContentLayout title="주문 내역 상세">
      <div>
        <OrderItem order={{ id: data.id, orderTime: data.orderTime, productList: data.productList }} />
      </div>
      <div>
        <PaymentsView paymentAmount={data.paymentAmount} puschaseOption={false} />
      </div>
    </ContentLayout>
  );
}

export default OrderDetail;
