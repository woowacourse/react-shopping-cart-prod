import { useCallback } from 'react';

import { useOrder } from '../../../hooks/useOrder';
import { OrderedItemData } from '../../../types/order';
import { priceFormatter } from '../../../utils/formatter';
import Toast from '../../common/Toast/Toast';
import * as S from './OrderDetailItem.styles';

type OrderDetailItemProps = OrderedItemData;

const OrderDetailItem = ({ quantity, product }: OrderDetailItemProps) => {
  const { isAdded, addItemToCart } = useOrder();

  const handleItemAddition = useCallback(() => {
    addItemToCart(product);
  }, [addItemToCart, product]);

  return (
    <>
      <S.OrderDetailItemContainer>
        <S.OrderDetailItemImage src={product.imageUrl} alt={product.name} />
        <S.OrderDetailItemInformation>
          <S.OrderDetailItemName>{product.name}</S.OrderDetailItemName>
          <S.OrderDetailItemPriceContainer>
            <S.OrderDetailItemConsumerPrice as="span">
              {priceFormatter(product.discountedPrice)}원
            </S.OrderDetailItemConsumerPrice>
            {product.discountRate > 0 && (
              <S.OrderDetailItemOriginalPrice>
                {priceFormatter(product.price)}원
              </S.OrderDetailItemOriginalPrice>
            )}
            <S.VerticalLine />
            <S.OrderDetailItemQuantity>{quantity}개</S.OrderDetailItemQuantity>
          </S.OrderDetailItemPriceContainer>
        </S.OrderDetailItemInformation>
        <S.AddToCartButton variant="secondary" size="small" onClick={handleItemAddition}>
          장바구니 담기
        </S.AddToCartButton>
      </S.OrderDetailItemContainer>
      {isAdded && <Toast>장바구니에 상품을 추가했습니다.</Toast>}
    </>
  );
};

export default OrderDetailItem;
