import { styled } from "styled-components";
import { useParams } from "react-router-dom";
import { orderItemsSelector, orderSelector } from "recoil/order";
import { useRecoilValue } from "recoil";
import OrderProduct from "./OrderProduct";

const OrderDetail = () => {
  const { id } = useParams();
  const orderItems = useRecoilValue(orderItemsSelector(Number(id)));
  const order = useRecoilValue(orderSelector(Number(id)));

  return (
    <Wrapper>
      <Title>주문 내역 상세</Title>
      <ListBox>
        {orderItems?.map((orderItem) => (
          <>
            <OrderProduct {...orderItem} />
            <Details>
              <PriceBox>개당 가격: {orderItem.product.price.toLocaleString()}원</PriceBox>
              <PriceBox>수량: {orderItem.quantity}</PriceBox>
              {orderItem.coupons.length ? (
                <PriceBox>할인: {orderItem.coupons[0].name}</PriceBox>
              ) : null}
              <PriceBox>실 결제 금액: {orderItem.total.toLocaleString()}원</PriceBox>
            </Details>
          </>
        ))}
      </ListBox>
      <ResultBox>
        <PriceBox>배송비: {order?.deliveryFee.toLocaleString()}원</PriceBox>
        <PriceBox>총 결제 금액: {order?.total?.toLocaleString()}원</PriceBox>
      </ResultBox>
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
  width: 80%;
  white-space: nowrap;
  word-break: break-all;
  text-overflow: ellipsis;

  @media screen and (max-width: 800px) {
    font-size: 15px;
  }
`;

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  margin: 1%;
  padding: 1%;
  border: 1px solid rgba(170, 170, 170, 1);
  border-radius: 4px;
  background: rgba(246, 246, 246, 1);
`;

const ResultBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;

  height: 100px;
  border: 2px solid rgba(170, 170, 170, 1);
  background: rgba(246, 246, 246, 1);
  font-size: 18px;
  font-weight: 600;

  & > div {
    text-align: center;
    width: 100%;
  }
`;

export default OrderDetail;
