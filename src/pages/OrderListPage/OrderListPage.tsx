import useGetOrderList from '../../hooks/requests/useGetOrderList.ts';
import OrderList from '../../components/@common/OrderList/OrderList.tsx';
import * as Styled from './OrderListPage.styles.tsx';
import EmptyComponent from '../../components/@common/EmptyComponent/EmptyComponent.tsx';

const OrderListPage = () => {
  const { data: orderListData } = useGetOrderList();

  return (
    <Styled.OrderListPageWrapper>
      <Styled.OrderListPageContent>
        <Styled.OrderListPageTitle>주문목록</Styled.OrderListPageTitle>
        <Styled.OrderListPageTitleBorder />
        {orderListData && orderListData.orders.length === 0 && <EmptyComponent />}

        {orderListData &&
          orderListData.orders.length > 0 &&
          orderListData.orders.map((orderData) => {
            return <OrderList key={orderData.orderId} orderData={orderData} hasDetailNavigateButton />;
          })}
      </Styled.OrderListPageContent>
    </Styled.OrderListPageWrapper>
  );
};

export default OrderListPage;
