import { useNavigate } from 'react-router-dom';

import { CartItemType } from '@Types/index';

import * as S from './style';
import OrderItem from '../PurchasedItem';

type OrderItemsProps = {
  orderId: number;
  cartItems: CartItemType[];
  price: number;
  date: string;
  width?: string;
};

function OrderItems({ orderId, date, cartItems, price, width = '100%' }: OrderItemsProps) {
  const navigate = useNavigate();
  const dateText = `${date.slice(0, 4)}. ${date.slice(5, 7)}. ${date.slice(8, 10)}`;
  return (
    <S.Container>
      <S.OrderTitle>
        <S.OrderDate>{dateText}</S.OrderDate>
        <S.ShowDetailButton onClick={() => navigate('/order-detail', { state: { cartItems, orderId, price } })}>
          상세보기 {'>'}
        </S.ShowDetailButton>
      </S.OrderTitle>
      <S.OrderItemsContainer>
        {cartItems
          .map((item) => {
            const { id, name, imageUrl, price } = item.product;
            return <OrderItem key={id} price={price} name={name} imageUrl={imageUrl} quantity={item.quantity} />;
          })
          .slice(0, 2)}
      </S.OrderItemsContainer>
    </S.Container>
  );
}
export default OrderItems;
