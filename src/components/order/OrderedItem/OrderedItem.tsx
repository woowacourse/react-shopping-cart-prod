import { generatePath, useNavigate } from 'react-router-dom';

import { PATH } from '../../../constants/path';
import { OrderData } from '../../../types';
import { priceFormatter } from '../../../utils/formatter';
import * as S from './OrderedItem.styles';

type OrderedItemProps = OrderData;

export const OrderedItem = ({ ...information }: OrderedItemProps) => {
  const { id, orderedItems } = information;
  const navigate = useNavigate();

  return (
    <S.Container>
      <S.OrderIdWrapper>
        <S.OrderId>주문번호 {id}</S.OrderId>
        <S.ShowDetail
          onClick={() => navigate(generatePath(PATH.ORDERS_OrderId, { orderId: String(id) }))}
        >
          상세보기 {'>'}
        </S.ShowDetail>
      </S.OrderIdWrapper>
      <S.OrderContainer>
        {orderedItems.map((orderedItem) => (
          <S.OrderedItemContainer>
            <S.ImageAndInformationContainer>
              <S.OrderedItemImageWrapper>
                <S.OrderedItemImage src={orderedItem.product.imageUrl} />
              </S.OrderedItemImageWrapper>
              <S.OrderedItemInformationContainer>
                <S.OrderedItemName>{orderedItem.product.name}</S.OrderedItemName>
                <S.PriceAndQuantityContainer>
                  <S.OrderedItemPrice>
                    {priceFormatter(orderedItem.product.discountedPrice)}
                  </S.OrderedItemPrice>
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
