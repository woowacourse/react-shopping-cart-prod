import useGetOrderList from '../../hooks/requests/useGetOrderList.ts';
import OrderList from '../../components/@common/OrderList/OrderList.tsx';
import * as Styled from './OrderListPage.styles.tsx';
import EmptyCartComponent from '../../components/@common/EmptyComponent/EmptyCartComponent.tsx';
import { MainPageText, MainTextBorder } from '../../styles/CommonStyles.tsx';

const OrderListPage = () => {
  const { data: orderListData } = useGetOrderList();

  return (
    <Styled.OrderListPageWrapper>
      <Styled.OrderListPageContent>
        <MainPageText>주문목록</MainPageText>
        <MainTextBorder />
        {orderListData && orderListData.orders.length === 0 && <EmptyCartComponent />}

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
