import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import OrderItem from '@Pages/OrderList/PurchasedItem';

import { CartItemType } from '@Types/index';

import TotalPrice from './TotalPrice.tsx';
import * as S from './style';

function OrderDetail() {
  const navigate = useNavigate();
  const location = useLocation();

  const cartItems = location.state.cartItems as CartItemType[];
  const orderId = location.state.orderId as number;
  const totalPrice = location.state.price as number;

  return (
    <S.Wrapper>
      <S.Title>상세 주문 목록</S.Title>

      <S.Container>
        <S.OrderTitle>
          <S.OrderID>주문번호 : {orderId}</S.OrderID>
          <S.ShowDetailButton onClick={() => navigate('/order-list')}>전체목록 {'>'}</S.ShowDetailButton>
        </S.OrderTitle>
        <S.OrderItemsContainer>
          {cartItems.map((item) => (
            <OrderItem key={item.product.id} product={item.product} quantity={item.quantity} />
          ))}
        </S.OrderItemsContainer>
        <TotalPrice totalPrice={totalPrice} />
      </S.Container>
    </S.Wrapper>
  );
}
export default OrderDetail;
