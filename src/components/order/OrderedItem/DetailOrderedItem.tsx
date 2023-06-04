import { generatePath, useNavigate } from 'react-router-dom';

import { PATH } from '../../../constants/path';
import { OrderData } from '../../../types';
import { priceFormatter } from '../../../utils/formatter';
import { Divider } from '../../common/Divider/Divider.styles';
import * as S from './DetailOrderedItem.styles';

type OrderedItemProps = OrderData;

export const DetailOrderedItem = ({ ...information }: OrderedItemProps) => {
  const { id, orderedItems } = information;
  const navigate = useNavigate();

  return (
    <S.Container>
      <S.OrderIdWrapper>
        <S.OrderId>주문번호 {id}</S.OrderId>
      </S.OrderIdWrapper>
      <S.OrderContainer>
        {orderedItems.map((orderedItem) => (
          <S.OrderedItemContainer>
            <S.ImageAndInformationContainer>
              <S.OrderedItemImageWrapper>
                <S.OrderedItemImage src={orderedItem.imageUrl} />
              </S.OrderedItemImageWrapper>
              <S.OrderedItemInformationContainer>
                <S.OrderedItemName>{orderedItem.name}</S.OrderedItemName>
                <S.PriceAndQuantityContainer>
                  <S.OrderedItemPrice>
                    {priceFormatter(orderedItem.discountedPrice)}
                  </S.OrderedItemPrice>
                  {orderedItem.discountRate > 0 && (
                    <S.OrderedItemPriceBeforeDiscount>
                      {priceFormatter(orderedItem.price)}
                    </S.OrderedItemPriceBeforeDiscount>
                  )}
                  <S.OrderedItemQuantity>{orderedItem.quantity}개 구매</S.OrderedItemQuantity>
                </S.PriceAndQuantityContainer>
              </S.OrderedItemInformationContainer>
            </S.ImageAndInformationContainer>
            <S.AddItemToCartButton size="small" variant="secondary">
              장바구니 담기
            </S.AddItemToCartButton>
          </S.OrderedItemContainer>
        ))}
      </S.OrderContainer>
    </S.Container>
  );
};
