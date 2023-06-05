import { useNavigate, useParams } from "react-router-dom";
import {
  GoToOrderListButton,
  OrderListDivider,
  OrderListTitle,
  OrderListWrapper,
} from "../../components/OrderList/OrderList.style.ts";
import OrderItem from "../../components/OrderItem/OrderItem.tsx";
import { OrderedGroup } from "../../types/types.ts";
import PaidBox from "../../components/PaidBox";
import styled from "styled-components";
import { useEffect, useState } from "react";

const PaidBoxWrapper = styled.div`
  @media screen and (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: flex;
    justify-content: end;
  }
`;

function OrderDetail() {
  const navigate = useNavigate();
  const params = useParams();

  const [orderedItem, setOrderedItem] = useState<OrderedGroup>({
    createAt: "",
    orderId: -1,
    orderItems: [],
    paymentPrice: 0,
    usedCoupons: [],
    usedPoint: 0,
  });

  const loadOrderedItem = async () => {
    const response = await fetch(`/orders/${params.orderId}`);
    const data: OrderedGroup = await response.json();
    setOrderedItem(data);
  };

  useEffect(() => {
    loadOrderedItem();
  }, [params]);

  return (
    <OrderListWrapper>
      <OrderListTitle>주문 내역 상세</OrderListTitle>
      <OrderListDivider />
      <OrderItem orderItem={orderedItem} />
      <PaidBoxWrapper>
        <PaidBox paymentPrice={orderedItem.paymentPrice} />
      </PaidBoxWrapper>
      <GoToOrderListButton onClick={() => navigate("/order")}>
        {`<`} 주문 목록으로 돌아가기
      </GoToOrderListButton>
    </OrderListWrapper>
  );
}

export default OrderDetail;
