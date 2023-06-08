import * as S from './style';

type DiscountPriceProps = {
  discountAmount: string | null;
  couponDiscountAmount: string | null;
};

function DiscountPrice({ discountAmount, couponDiscountAmount }: DiscountPriceProps) {
  if (!discountAmount && !couponDiscountAmount) {
    return <S.DiscountPriceText>할인이 적용되지 않았습니다.</S.DiscountPriceText>;
  }

  return (
    <S.DiscountPriceLayout>
      {discountAmount && (
        <S.DiscountPriceWrapper>
          <S.DiscountPriceText>ㄴ 할인 이벤트</S.DiscountPriceText>
          <S.DiscountPriceText>{discountAmount}</S.DiscountPriceText>
        </S.DiscountPriceWrapper>
      )}
      {couponDiscountAmount && (
        <S.DiscountPriceWrapper>
          <S.DiscountPriceText>ㄴ 쿠폰 적용</S.DiscountPriceText>
          <S.DiscountPriceText>{couponDiscountAmount}</S.DiscountPriceText>
        </S.DiscountPriceWrapper>
      )}
    </S.DiscountPriceLayout>
  );
}

export default DiscountPrice;
