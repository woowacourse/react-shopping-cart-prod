import * as S from './style';

function OrderAmount({ price }: { price: number }) {
  const displayPrice = `${price.toLocaleString()} 원`;

  return (
    <S.Container>
      <S.Layout>
        <S.OrderAmountTitle>결제금액 정보</S.OrderAmountTitle>
        <S.OrderAmount>
          <div>총 결제금액</div>
          <div>{displayPrice}</div>
        </S.OrderAmount>
      </S.Layout>
    </S.Container>
  );
}

export default OrderAmount;
