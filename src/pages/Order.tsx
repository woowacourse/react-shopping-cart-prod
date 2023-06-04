import { styled } from "styled-components";
import { Header, Page, OrderList } from "../components";
import { useOrderList } from "../hooks/useOrderList";

export const Order = () => {
  const { orderList } = useOrderList();

  return (
    <>
      <Header />
      <Page>
        <TitleBox>주문 목록</TitleBox>
        <OrderListWrapper>
          {orderList.map((orderListItem) => (
            <OrderList
              key={orderListItem.id}
              id={orderListItem.id}
              orderListItems={orderListItem.products}
              detail
            />
          ))}
        </OrderListWrapper>
      </Page>
    </>
  );
};

const TitleBox = styled.div`
  align-self: center;
  width: 85%;
  height: 40px;

  font-weight: 700;
  font-size: 25px;
  text-align: center;
  border-bottom: 4px solid var(--dark-gray);
`;

const OrderListWrapper = styled.div`
  width: 85%;
  align-self: center;
`;

export default Order;
