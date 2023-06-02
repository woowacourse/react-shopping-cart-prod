import * as S from './style';

type TotalPriceProps = {
  totalPrice: number;
};

const TotalPrice = ({ totalPrice }: TotalPriceProps) => {
  return (
    <S.PriceWrapper>
      <S.PriceContainer>
        <S.PriceTitle>결제금액정보</S.PriceTitle>
        <S.AmountWrapper>
          <S.AmountCategory>총 결제금액</S.AmountCategory>
          <S.Amount>{totalPrice}원</S.Amount>
        </S.AmountWrapper>
      </S.PriceContainer>
    </S.PriceWrapper>
  );
};

export default TotalPrice;
