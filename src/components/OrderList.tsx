import { styled } from "styled-components";
import { OrderItem } from "./OrderItem";
import { useRouter } from "../hooks/useRouter";
import { ROUTER_PATH } from "../router";
import { OrderItemList } from "../types/domain";

type OrderListProps = {
  detail?: boolean;
  id: number;
  orderListItems: OrderItemList["products"];
};

export const OrderList = ({ detail, id, orderListItems }: OrderListProps) => {
  const { goPage } = useRouter();

  return (
    <Wrapper>
      <OrderListHeader>
        <p>주문번호 : {id}</p>
        {detail && (
          <OrderDetail onClick={goPage(ROUTER_PATH.OrderDetail)}>
            상세보기 &gt;
          </OrderDetail>
        )}
      </OrderListHeader>
      {orderListItems.map((item) => (
        <OrderItem key={item.id} orderItem={item}/>
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  align-self: center;
  width: 100%;
  margin-top: 40px;
`;

const OrderListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 92px;
  padding: 20px;
  background-color: #f6f6f6;
  border: 1px solid #aaaaaa;
`;

const OrderDetail = styled.p`
  cursor: pointer;
`;
