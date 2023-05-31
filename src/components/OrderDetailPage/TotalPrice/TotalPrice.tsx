import * as S from './TotalPrice.styles';

const TotalPrice = () => {
  return (
    <S.Root>
      <S.Info justify="space-between" align="center">
        <span>결제금액 정보</span>
      </S.Info>
      <S.Price justify="space-between" align="center">
        <span>총 결제금액</span>
        <span>20000원</span>
      </S.Price>
    </S.Root>
  );
};

export default TotalPrice;
