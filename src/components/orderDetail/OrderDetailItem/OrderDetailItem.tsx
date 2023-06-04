import { OrderedItemData } from '../../../types/order';
import { priceFormatter } from '../../../utils/formatter';
import * as S from './OrderDetailItem.styles';

type OrderDetailItemProps = OrderedItemData;

const OrderDetailItem = ({ ...information }: OrderDetailItemProps) => {
  return (
    <>
      <S.OrderDetailItemContainer>
        <S.OrderDetailItemImage src={information.imageUrl} alt={information.name} />
        <S.OrderDetailItemInformation>
          <S.OrderDetailItemName>{information.name}</S.OrderDetailItemName>
          <S.OrderDetailItemPriceContainer>
            <S.OrderDetailItemConsumerPrice as="span">
              {priceFormatter(information.discountedPrice)}원
            </S.OrderDetailItemConsumerPrice>
            {information.discountRate > 0 && (
              <S.OrderDetailItemOriginalPrice>
                {priceFormatter(information.price)}원
              </S.OrderDetailItemOriginalPrice>
            )}
            <S.VerticalLine />
            <S.OrderDetailItemQuantity>{information.quantity}개</S.OrderDetailItemQuantity>
          </S.OrderDetailItemPriceContainer>
        </S.OrderDetailItemInformation>
      </S.OrderDetailItemContainer>
    </>
  );
};

export default OrderDetailItem;
