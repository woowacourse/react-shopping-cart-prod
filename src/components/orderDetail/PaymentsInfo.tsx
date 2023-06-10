import { useRecoilValue } from 'recoil';
import { styled } from 'styled-components';
import { orderDetailState } from '../../store/OrderDetailState';

const PaymentsInfo = () => {
  const orderDetailList = useRecoilValue(orderDetailState);

  return (
    <S.Wrapper>
      <S.TitleWrapper>
        <S.Title>결제금액 정보</S.Title>
      </S.TitleWrapper>
      <S.DeliveryFeeWrapper>
        <S.Title>배송비</S.Title>
        <S.DeliveryFee>3,000원</S.DeliveryFee>
      </S.DeliveryFeeWrapper>
      <S.PointInfoWrapper>
        <S.Title>사용된 포인트</S.Title>
        <S.PointInfo>
          {orderDetailList?.usedPoint === 0 ? 0 : `-${orderDetailList?.usedPoint}`} 포인트
        </S.PointInfo>
      </S.PointInfoWrapper>
      <S.TotalPaymentAmountWrapper>
        <S.Title>총 결제 금액</S.Title>
        <S.TotalPaymentAmount>
          {orderDetailList?.orderTotalPrice.toLocaleString()}원
        </S.TotalPaymentAmount>
      </S.TotalPaymentAmountWrapper>
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.article`
    border: solid 1px var(--gray-color);
    width: 80%;
  `,

  TitleWrapper: styled.section`
    display: flex;
    align-items: center;
    padding: 25px 20px;
    background-color: var(--gray-color-300);
    border-bottom: solid var(--black-color) 0.5px;
  `,

  Title: styled.h4``,

  PointInfoWrapper: styled.section`
    display: flex;
    justify-content: space-between;
    padding: 25px 20px;
    border-bottom: 1px dashed var(--gray-color-200);
  `,

  PointInfo: styled.h4``,

  TotalPaymentAmountWrapper: styled.span`
    display: flex;
    justify-content: space-between;
    padding: 25px 20px;
  `,

  TotalPaymentAmount: styled.span``,

  DeliveryFeeWrapper: styled.section`
    display: flex;
    justify-content: space-between;
    padding: 25px 20px 0 20px;
  `,

  DeliveryFee: styled.span``,
};

export default PaymentsInfo;
