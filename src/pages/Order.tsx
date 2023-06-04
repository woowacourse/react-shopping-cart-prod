import { styled } from "styled-components";
import { Header, Page, OrderList, Button } from "../components";
import { useOrderList } from "../hooks/useOrderList";
import { useRouter } from "../hooks/useRouter";
import { ROUTER_PATH } from "../router";

export const Order = () => {
  const { orderList } = useOrderList();
  const { goPage } = useRouter();

  return (
    <>
      <Header />
      <Page>
        <TitleBox>주문 목록</TitleBox>
        {orderList.length === 0 ? (
          <EmptyContainer>
            <span>🛒</span>
            <p>주문 목록이 텅 비었어요</p>
            <Button onClick={goPage(ROUTER_PATH.Main)}>
              주문할 상품 담으러 가기
            </Button>
          </EmptyContainer>
        ) : (
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
        )}
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

const EmptyContainer = styled.section`
  display: flex;
  flex-direction: column;
  width: 400px;
  align-items: center;
  align-self: center;

  text-align: center;
  padding: 10% 0;

  & > span {
    font-size: 60px;
    margin-bottom: 25px;
  }
  & > p {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 25px;
  }
`;

export default Order;
