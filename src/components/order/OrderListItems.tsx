import { useNavigate } from 'react-router-dom';
import { OrderItem } from '../../types';
import OrderListItem from './OrderListItem';
import { styled } from 'styled-components';

interface Props {
  items: OrderItem;
}

const OrderListItems = ({ items }: Props) => {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate(`/order-list/${items.orderId}`);
  };

  return (
    <S.Wrapper>
      <S.OrderInfoWrapper>
        <S.OrderNumber>주문번호: {items.orderId}</S.OrderNumber>

        <S.OrderInfoDetail onClick={handleClick}>상세보기 {'>'}</S.OrderInfoDetail>
      </S.OrderInfoWrapper>
      {items.orderProducts.map((item) => (
        <OrderListItem key={item.productId} item={item} />
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

  OrderInfoDetail: styled.button`
    background-color: transparent;
    cursor: pointer;
  `,

  OrderNumber: styled.h4``,
};

export default OrderListItems;
