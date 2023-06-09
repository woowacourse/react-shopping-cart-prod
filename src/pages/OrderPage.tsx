import Nothing from '../components/common/Nothing';
import Spinner from '../components/common/Spinner';
import Title from '../components/common/Title';
import OrderItemList from '../components/orderList/OrderItemList';
import MainLayout from '../components/PageMainLayout';
import { IMAGE_PATH } from '../constants';
import { useGetOrderList } from '../hooks/useGetOrderList';

const OrderPage = () => {
  const { orderList, isLoading } = useGetOrderList();

  if (isLoading) return <Spinner />;

  return (
    <MainLayout>
      <>
        <Title value='주문 목록' />
        {orderList.length ? (
          <ul>
            {orderList.map((list) => (
              <OrderItemList key={list.orderId} orderList={list} />
            ))}
          </ul>
        ) : (
          <Nothing
            src={IMAGE_PATH.EMPTY_ORDER_LIST}
            alt='주문 목록이 없습니다'
            description='주문 목록이 없습니다'
          />
        )}
      </>
    </MainLayout>
  );
};

export default OrderPage;
