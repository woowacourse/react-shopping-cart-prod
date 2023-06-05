import styled from "styled-components";
import type { OrderType } from "../types/domain";
import { OrderHistory } from "./OrderHistory";

export const OrderHistoryList = ({ orders }: { orders: OrderType[] }) => {
  return (
    <Wrapper>
      {orders.map((order) => (
        <OrderHistory key={order.id} {...order} />
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-self: center;
  width: 85%;
  max-width: 1000px;

  max-height: 800px;
  overflow: scroll;
`;
