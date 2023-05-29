import { useLocation } from 'react-router-dom';
import ContentLayout from 'src/components/Common/ContentLayout';
import OrderItem from 'src/components/OrderItem';
import { orderList } from 'src/data/mockData';
import { Order } from 'src/types';

function OrderDetail() {
  const location = useLocation();
  const orderId = location.pathname.split('/').at(-1);

  const data = orderList.find(item => item.id === Number(orderId)) as Order;

  return (
    <ContentLayout title="주문 내역 상세">
      <div>
        <OrderItem order={data} />
      </div>
      <div>여기는 계산서 입니다.</div>
    </ContentLayout>
  );
}

export default OrderDetail;
