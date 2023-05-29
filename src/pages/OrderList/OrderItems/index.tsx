import { useNavigate } from 'react-router-dom';

import { CartItemType } from '@Types/index';

import * as S from './style';
import OrderItem from '../OrderItem';
type OrderItemsProps = {
  orderId: number;
  cartItems: CartItemType[];
  price: number;
  date: Date;
  width?: string;
};

function OrderItems({ orderId, date, cartItems, price, width = '100%' }: OrderItemsProps) {
  const navigate = useNavigate();

  return (
    <S.Container>
      <S.OrderTitle>
        <S.OrderID>주문번호 : {orderId}</S.OrderID>
        <S.ShowDetailButton onClick={() => navigate('/order-detail', { state: { cartItems, orderId, price } })}>
          상세보기 {'>'}
        </S.ShowDetailButton>
      </S.OrderTitle>
      <S.OrderItemsContainer>
        {cartItems.map((item) => {
          const { id, name, imageUrl, price } = item.product;
          return <OrderItem key={id} price={price} name={name} imageUrl={imageUrl} quantity={item.quantity} />;
        })}
      </S.OrderItemsContainer>
    </S.Container>
  );
}
export default OrderItems;
