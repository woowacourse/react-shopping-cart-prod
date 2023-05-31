import { Order } from "api/orders";
import styled from "styled-components";
import OrderItem from "./OrderItem";

interface OrderItemProps {
  orderId: number;
  items: Order[];
}

const OrderDetail = ({ orderId, items }: OrderItemProps) => {
  return (
    <Wrapper>
      <TitleContainer>
        <Title>주문 번호: {orderId}</Title>
        <ButtonBox>{"상세보기 >"}</ButtonBox>
      </TitleContainer>
      <ListBox>
        {items.map((item) => (
          <OrderItem {...item} />
        ))}
      </ListBox>
    </Wrapper>
  );
};

const Wrapper = styled.ul`
  display: flex;
  flex-direction: column;

  height: fit-content;

  margin-bottom: 30px;

  border: 1px solid rgba(170, 170, 170, 1);
`;

const ButtonBox = styled.button`
  background: none;

  cursor: pointer;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 60px;
  padding: 15px;

  background: rgba(246, 246, 246, 1);
  font-size: 16px;
`;

const Title = styled.h2``;

const ListBox = styled.li`
  list-style: none;
  row-gap: 10px;
`;

export default OrderDetail;
