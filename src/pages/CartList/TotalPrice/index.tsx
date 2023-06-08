import * as S from './style';

interface TotalPriceProps {
  price: number;
  priceDiscount: number;
  couponDiscount: number;
}

const TotalPrice = ({ price, priceDiscount, couponDiscount }: TotalPriceProps) => {
  const priceText = `${price.toLocaleString()} 원`;
  const priceDiscountText = `${priceDiscount.toLocaleString()} 원`;
  const couponDiscointText = `${couponDiscount.toLocaleString()} 원`;

  return (
    <S.AmountContainer>
      <S.AmountWrapper aria-label="총 상품가격">
        <S.AmountCategory>총 상품가격</S.AmountCategory>
        <S.Amount>{priceText}</S.Amount>
      </S.AmountWrapper>
      {priceDiscount !== 0 && (
        <S.DiscountWrapper aria-label="상품 할인">
          <S.DiscountCategory>상품 할인</S.DiscountCategory>
          <S.Discount>{`-${priceDiscountText}`}</S.Discount>
        </S.DiscountWrapper>
      )}
      {couponDiscount !== 0 && (
        <S.DiscountWrapper aria-label="쿠폰 할인">
          <S.DiscountCategory>쿠폰 할인</S.DiscountCategory>
          <S.Discount>{`-${couponDiscointText}`}</S.Discount>
        </S.DiscountWrapper>
      )}
    </S.AmountContainer>
  );
};

export default TotalPrice;
