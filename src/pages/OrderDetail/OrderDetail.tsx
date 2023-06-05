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
import { useRecoilValue } from "recoil";
import { serverState } from "../../app/recoil/serverAtom.ts";
import { fetchOrderedItem } from "../../app/api/api.ts";

const PaidBoxWrapper = styled.div`
  @media screen and (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: flex;
    justify-content: end;
  }
`;

function OrderDetail() {
  const navigate = useNavigate();
  const params = useParams();
  const server = useRecoilValue(serverState);

  const [orderedItem, setOrderedItem] = useState<OrderedGroup>({
    createAt: "",
    orderId: -1,
    orderItems: [],
    paymentPrice: 0,
    usedCoupons: [],
    usedPoint: 0,
  });

  const loadOrderedItem = async () => {
    const orderId = params.orderId as string;
    const data = await fetchOrderedItem(server, orderId);
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
