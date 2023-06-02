import { OrderItem as OrderItemInfo } from '../../../types/order';
import * as S from './OrderItem.styles';

const OrderItem: React.FC<OrderItemInfo> = (props) => {
  const { name, imageUrl, orderedPrice, quantity } = props;
  return (
    <S.Item>
      <S.Thumbnail src={imageUrl} />
      <S.Info dir="column">
        <S.Name>{name}</S.Name>
        <S.SubInfo>
          {orderedPrice.toLocaleString()}원 / 수량: {quantity}개
        </S.SubInfo>
      </S.Info>
    </S.Item>
  );
};

export default OrderItem;
