import { styled } from 'styled-components';
import Image from '../../common/Image/Image';
import { formatPrice } from '../../../utils/formatPrice';
import colors from '../../../colors';
import type { OrderItem } from '../../../types/order';

interface OrderProductItemProps {
  item: OrderItem;
}

const OrderCartItem = ({ item }: OrderProductItemProps) => {
  const { quantity, name, price, imageUrl } = item;
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
  height: 220px;
  column-gap: 33px;
  padding: 0 26px;
  background-color: ${colors.pureBlack};
`;

const Inner = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  height: 145px;
`;

const Title = styled.span`
  font-size: 20px;
  line-height: 24px;
  letter-spacing: 0.5px;
  color: ${colors.lightGold};
`;

const Detail = styled.span`
  font-size: 16px;
  line-height: 20px;
  letter-spacing: 0.5px;
  color: ${colors.pureWhite};
`;

export default OrderCartItem;
