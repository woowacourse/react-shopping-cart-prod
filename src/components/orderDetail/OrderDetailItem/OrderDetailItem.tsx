import type { OrderedItemData } from '../../../types/order';
import { priceFormatter } from '../../../utils/formatter';
import { Text } from '../../common/Text/Text.styles';
import * as S from './OrderDetailItem.styles';

type OrderDetailItemProps = OrderedItemData;

const OrderDetailItem = ({ ...information }: OrderDetailItemProps) => {
  return (
    <S.ItemContainer>
      <S.ItemImage src={information.imageUrl} alt={information.name} />
      <S.ItemContent>
        <Text className="semi-bold">{information.name}</Text>
        <div>
          <Text className="semi-bold" as="span">
            {priceFormatter(information.discountedPrice)}원
          </Text>
          {information.discountRate > 0 && (
            <Text css={S.originalPriceStyle}>{priceFormatter(information.price)}원</Text>
          )}
          <S.VerticalLine />
          <Text css={S.quantityStyle}>{information.quantity}개</Text>
        </div>
      </S.ItemContent>
    </S.ItemContainer>
  );
};

export default OrderDetailItem;
