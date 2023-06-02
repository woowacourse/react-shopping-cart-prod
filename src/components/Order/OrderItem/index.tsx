import { OrderProduct } from 'types';
import { formatPrice } from 'utils';
import * as S from './OrderItem.styles';

const OrderItem = ({ item }: { item: OrderProduct }) => {
  return (
    <S.OrderItemWrapper>
      <S.OrderItemImage src={item.imageUrl} alt={item.name} />
      <S.OrderInfoWrapper>
        <S.OrderProductName>{item.name}</S.OrderProductName>
        <S.PriceQuantityWrapper>
          <S.OrderPrice>{formatPrice(item.totalPrice)}원</S.OrderPrice>
          <S.OrderPrice>&nbsp; / &nbsp;</S.OrderPrice>
          <S.OrderQuantity>{item.quantity}개</S.OrderQuantity>
        </S.PriceQuantityWrapper>
      </S.OrderInfoWrapper>
    </S.OrderItemWrapper>
  );
};

export default OrderItem;
