import { styled } from "styled-components";
import OrderItem from "./OrderDetail";
import { useRecoilValue } from "recoil";
import { orderListState } from "recoil/order";

const OrderDetailList = () => {
  const orderList = useRecoilValue(orderListState);

  return (
    <Wrapper>
      <Title>주문 목록</Title>
      <ListBox>
        {orderList.map((item) => (
          <OrderItem key={item.orderId} orderId={item.orderId} items={item.orderItems} />
        ))}
      </ListBox>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 15px;

  width: 100%;
`;

const Title = styled.h2`
  border-bottom: 3px solid rgba(170, 170, 170, 1);

  padding-bottom: 2%;

  text-align: center;
  font-size: 22px;
  font-weight: 700;
`;

const ListBox = styled.li`
  list-style: none;
`;

export default OrderDetailList;
