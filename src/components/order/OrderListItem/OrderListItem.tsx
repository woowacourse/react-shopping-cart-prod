import { styled } from 'styled-components';
import Image from '../../common/Image/Image';
import { formatPrice } from '../../../utils/formatPrice';
import type { OrderItem } from '../../../types/order';

interface OrderListItemProps {
  orderItem: OrderItem;
}

const OrderListItem = ({ orderItem }: OrderListItemProps) => {
  const { quantity, price, name, imageUrl } = orderItem;
  const totalPrice = price * quantity;

  return (
    <Container>
      <Image src={imageUrl} loading="lazy" alt={name} />
      <Inner>
        <Title>{name}</Title>
        <Detail>
          {formatPrice(totalPrice)} / 수량 : {quantity}개
        </Detail>
      </Inner>
    </Container>
  );
};

const Container = styled.li`
  display: flex;
  align-items: center;
  height: 200px;
  column-gap: 33px;
  padding: 0 26px;
`;

const Inner = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  height: 145px;
`;

const Title = styled.span`
  font-family: 'Noto Sans KR';
  font-size: ${(props) => props.theme.fontSize.X_LARGE};
  line-height: 24px;
  letter-spacing: 0.5px;
  color: #333;
`;

const Detail = styled.span`
  font-family: 'Noto Sans KR';
  font-size: ${(props) => props.theme.fontSize.MEDIUM};
  line-height: 20px;
  letter-spacing: 0.5px;
  color: #888;
`;

export default OrderListItem;
