import type { ProductItemPriceData } from '../../../../types/product';
import { priceFormatter } from '../../../../utils/formatter';
import { Text } from '../../../common/Text/Text.styles';
import * as S from './Price.styles';

type PriceProps = ProductItemPriceData;

const Price = ({ price, discountRate, discountedPrice }: PriceProps) => {
  return (
    <S.PriceContainer>
      {discountRate > 0 && (
        <Text css={S.discountRateStyle} size="large" as="span">
          {discountRate}%
        </Text>
      )}
      <Text css={S.discountedPriceStyle} size="large" as="span">
        {priceFormatter(discountedPrice)}원
      </Text>
      {discountRate > 0 && (
        <Text css={S.priceStyle} size="small" as="span">
          {priceFormatter(price)}원
        </Text>
      )}
    </S.PriceContainer>
  );
};

export default Price;
