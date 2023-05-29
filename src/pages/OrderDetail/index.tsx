import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import OrderItem from '@Pages/OrderList/OrderItem';

import { CartItemType } from '@Types/index';

import * as S from './style';

function OrderDetail() {
  const navigate = useNavigate();
  const location = useLocation();

  const cartItems = location.state.cartItems as CartItemType[];
  const orderId = location.state.orderId as number;
  const totalPrice = location.state.price as number;

  return (
    <div>
      <S.Title>상세 주문 목록</S.Title>
      <C>
        <S.Container>
          <S.OrderTitle>
            <S.OrderID>주문번호 : {orderId}</S.OrderID>
            <S.ShowDetailButton onClick={() => navigate('/order-list')}>전체목록 {'>'}</S.ShowDetailButton>
          </S.OrderTitle>
          <S.OrderItemsContainer>
            {cartItems.map((item) => {
              const { id, name, imageUrl, price } = item.product;
              return <OrderItem key={id} price={price} name={name} imageUrl={imageUrl} quantity={item.quantity} />;
            })}
          </S.OrderItemsContainer>
        </S.Container>
        <S.PriceContainer>
          <S.PriceTitle>결제금액정보</S.PriceTitle>
          <S.AmountWrapper>
            <S.AmountCategory>총 결제금액</S.AmountCategory>
            <S.Amount>{totalPrice.toString()}원</S.Amount>
          </S.AmountWrapper>
        </S.PriceContainer>
      </C>
    </div>
  );
}

const C = styled.div`
  display: flex;
  flex-direction: column;
  align-items: end;

  row-gap: 30px;
`;
export default OrderDetail;
