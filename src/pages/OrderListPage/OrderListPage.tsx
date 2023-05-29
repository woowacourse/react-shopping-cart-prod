import useGetOrderList from '../../hooks/requests/useGetOrderList.ts';
import OrderList from '../../components/@common/OrderList/OrderList.tsx';

const OrderListPage = () => {
  const { data: orderListData } = useGetOrderList();

  return (
    <>
      {orderListData &&
        orderListData.orders.map((orderData) => {
          return <OrderList key={orderData.orderId} orderData={orderData} hasDetailNavigateButton />;
        })}
    </>
  );
};

export default OrderListPage;
