import { ProductItemPriceData } from '../../../../types';
import { priceFormatter } from '../../../../utils/formatter';
import * as S from './ProductItemPrice.styles';

type ProductItemPriceProps = ProductItemPriceData;

const ProductItemPrice = ({ price, discountRate, discountedPrice }: ProductItemPriceProps) => {
  return (
    <>
      {discountRate > 0 && (
        <S.DiscountRate size="large" as="span">
          {discountRate}%
        </S.DiscountRate>
      )}
      <S.DiscountedPrice size="large" as="span">
        {discountRate > 0 ? priceFormatter(discountedPrice) : priceFormatter(price)}원
      </S.DiscountedPrice>
      {discountRate > 0 && (
        <S.ItemPrice size="small" as="span">
          {priceFormatter(price)}원
        </S.ItemPrice>
      )}
    </>
  );
};

export default ProductItemPrice;
