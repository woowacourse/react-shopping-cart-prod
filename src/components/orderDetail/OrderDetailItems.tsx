import { styled } from 'styled-components';
import { OrderItemDetails } from '../../types';
import OrderDetailItem from './OrderDetailItem';

interface Props {
  items: OrderItemDetails;
}

const OrderDetailItems = ({ items }: Props) => {
  return (
    <S.Wrapper>
      <S.OrderInfoWrapper>
        <S.OrderNumber>주문번호: {items.orderId}</S.OrderNumber>
      </S.OrderInfoWrapper>
      {items.orderProducts.map((item) => (
        <OrderDetailItem key={item.productId} item={item} />
      ))}
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div`
    border: solid 1px var(--gray-color);
    border-bottom: none;
    width: 80%;
  `,

  OrderInfoWrapper: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 25px 20px;
    background-color: var(--gray-color-300);
    border-bottom: solid var(--black-color) 0.5px;
  `,

  OrderNumber: styled.h4``,
};

export default OrderDetailItems;
