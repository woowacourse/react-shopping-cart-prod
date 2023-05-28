import { OrderedItemData } from '../../../types';
import { priceFormatter } from '../../../utils/formatter';
import * as S from './OrderDetailItem.styles';

type OrderDetailItemProps = OrderedItemData;

const OrderDetailItem = ({ quantity, product }: OrderDetailItemProps) => {
  return (
    <>
      <S.OrderDetailItemContainer>
        <S.OrderDetailItemImage src={product.imageUrl} alt={product.name} />
        <S.OrderDetailItemInformation>
          <S.OrderDetailItemName>{product.name}</S.OrderDetailItemName>
          <S.OrderDetailItemPriceContainer>
            <S.OrderDetailItemConsumerPrice as="span">
              {product.discountRate > 0
                ? priceFormatter(product.discountedPrice)
                : priceFormatter(product.price)}
              원
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
        <S.AddToCartButton variant="secondary" size="small">
          장바구니 담기
        </S.AddToCartButton>
      </S.OrderDetailItemContainer>
    </>
  );
};

export default OrderDetailItem;
