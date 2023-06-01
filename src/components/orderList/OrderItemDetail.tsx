import { styled } from "styled-components";
import { useParams } from "react-router-dom";
import { orderSelector } from "recoil/order";
import { useRecoilValue } from "recoil";
import OrderProduct from "./OrderProduct";

const OrderItemDetail = () => {
  const { id } = useParams();
  const orderItems = useRecoilValue(orderSelector(Number(id)));

  const totalPrice = orderItems?.reduce((sum, item) => sum + item.total, 0);

  return (
    <Wrapper>
      <Title>주문 내역 상세</Title>
      <ListBox>
        {orderItems?.map((orderItem) => (
          <OrderProduct order={orderItem}>
            <PriceBox>개당 가격: {orderItem.product.price.toLocaleString()}원</PriceBox>
            <PriceBox>수량: {orderItem.quantity}</PriceBox>
            {orderItem.coupons.length ? (
              <PriceBox>적용 쿠폰: {orderItem.coupons[0].name}</PriceBox>
            ) : null}
            <PriceBox>실 결제 금액: {orderItem.total.toLocaleString()}원</PriceBox>
          </OrderProduct>
        ))}
      </ListBox>
      <ResultBox>총 결제 금액: {totalPrice?.toLocaleString()}원</ResultBox>
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

const PriceBox = styled.div`
  margin-bottom: 4%;
`;

const ResultBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  height: 100px;
  border: 1px solid rgba(170, 170, 170, 1);
  background: rgba(246, 246, 246, 1);
  text-align: center;
  font-size: 18px;
  font-weight: 600;
`;

export default OrderItemDetail;
