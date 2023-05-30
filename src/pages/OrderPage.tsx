import Title from '../components/common/Title';
import OrderItemList from '../components/orderList/OrderItemList';
import MainLayout from '../components/PageMainLayout';

const OrderPage = () => {
  return (
    <MainLayout>
      <Title title='주문 목록' />
      <OrderItemList />
    </MainLayout>
  );
};

export default OrderPage;
