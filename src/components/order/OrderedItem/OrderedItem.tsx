import { generatePath, useNavigate } from 'react-router-dom';

import { PATH } from '../../../constants/path';
import { OrderData } from '../../../types';
import { HHMMFormatter, YYYYMMDDFormatter, priceFormatter } from '../../../utils/formatter';
import * as S from './OrderedItem.styles';

type OrderedItemProps = OrderData;

export const OrderedItem = ({ ...information }: OrderedItemProps) => {
  const { id, orderedItems, orderedAt, totalPrice } = information;
  const navigate = useNavigate();
  const orderedItem = orderedItems[0];

  return (
    <S.Container>
      <S.OrderIdWrapper>
        <S.OrderId>
          {YYYYMMDDFormatter(orderedAt)} ({HHMMFormatter(orderedAt)})
        </S.OrderId>
        <S.ShowDetail
          onClick={() => navigate(generatePath(PATH.ORDERS_OrderId, { orderId: String(id) }))}
        >
          상세보기 {'>'}
        </S.ShowDetail>
      </S.OrderIdWrapper>
      <S.OrderContainer>
        <S.OrderedItemContainer>
          <S.ImageAndInformationContainer>
            <S.OrderedItemImageWrapper>
              <S.OrderedItemImage src={orderedItem.imageUrl} />
            </S.OrderedItemImageWrapper>
            <S.OrderedItemInformationContainer>
              <S.OrderedItemKeyValueContainer>
                <S.OrderedItemKeyText>상품명</S.OrderedItemKeyText>
                <S.OrderedItemName>
                  {orderedItem.name}
                  {orderedItems.length > 1 && ` 외 ${orderedItems.length}건`}
                </S.OrderedItemName>
              </S.OrderedItemKeyValueContainer>
              <S.OrderedItemKeyValueContainer>
                <S.OrderedItemKeyText>주문번호</S.OrderedItemKeyText>
                <S.OrderedItemName>{id}</S.OrderedItemName>
              </S.OrderedItemKeyValueContainer>
              <S.OrderedItemKeyValueContainer>
                <S.OrderedItemKeyText>결제금액</S.OrderedItemKeyText>
                <S.OrderedItemName>{priceFormatter(totalPrice)}</S.OrderedItemName>
              </S.OrderedItemKeyValueContainer>
            </S.OrderedItemInformationContainer>
          </S.ImageAndInformationContainer>
        </S.OrderedItemContainer>
      </S.OrderContainer>
    </S.Container>
  );
};
