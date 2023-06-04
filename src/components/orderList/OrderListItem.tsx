import { OrderItem } from "api/orders";
import styled from "styled-components";
import OrderProduct from "./OrderProduct";
import { useNavigate } from "react-router-dom";
import { ROUTER_PATH } from "router";

interface OrderListItemProps {
  orderId: number;
  items: OrderItem[];
}

const OrderListItem = ({ orderId, items }: OrderListItemProps) => {
  const navigate = useNavigate();

  const goToOrderDetail = () => {
    navigate(ROUTER_PATH.OrderDetail.replace(":id", orderId.toString()));
  };

  return (
    <Wrapper>
      <TitleContainer>
        <Title>주문 번호: {orderId}</Title>
        <ButtonBox onClick={goToOrderDetail}>{"상세보기 >"}</ButtonBox>
      </TitleContainer>
      <ListBox>
        {items.map((item) => (
          <OrderProduct key={item.product.id} {...item} />
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

export default OrderListItem;
