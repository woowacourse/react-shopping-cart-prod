import OrderList from 'src/components/OrderList';
import ContentLayout from 'src/components/Common/ContentLayout';

function Order() {
  return (
    <ContentLayout title="주문 목록">
      <OrderList />
    </ContentLayout>
  );
}

export default Order;
