import Button from '@components/common/Button';
import Layout from '@components/layout/Layout';
import OrderHeader from '@components/orders/OrderHeader';
import { getFormattedNextDay } from '@utils/common';
import * as S from './OrderComplete.style';
interface OrderCompleteProps {
  userName: string;
  orderItemsCount: number;
  totalItemsPrice: number;
  deliveryFee: number;
  discountPrice: number;
}

function OrderComplete({
  userName,
  orderItemsCount,
  totalItemsPrice,
  deliveryFee,
  discountPrice,
}: OrderCompleteProps) {
  const totalPaymentAmount = totalItemsPrice + deliveryFee - discountPrice;

  return (
    <Layout>
      <OrderHeader text="주문완료" />
      <S.MessageWrapper>
        <S.BoldMessage>주문이 완료</S.BoldMessage>
        <S.NormalMessage>되었습니다. 감사합니다!</S.NormalMessage>
      </S.MessageWrapper>
      <S.ButtonWrapper>
        <Button text="홈으로" />
        <Button text="주문내역" />
      </S.ButtonWrapper>
      <S.Title>상품배송 정보</S.Title>
      <S.EstimatedDate>
        {getFormattedNextDay(new Date().getTime())} 도착 예정 (상품 {orderItemsCount}개){' '}
      </S.EstimatedDate>
      <S.OrderInformation>
        <S.InformationWrapper>
          <S.InformationTitle>받는 사람 정보</S.InformationTitle>
          <div>
            <S.InformationLeft>
              <span>받는사람</span>
              <span>{userName}</span>
            </S.InformationLeft>
          </div>
        </S.InformationWrapper>
        <S.InformationWrapper>
          <S.InformationTitle>결제 정보</S.InformationTitle>
          <S.InformationMain>
            <S.InformationRight>
              <span>상품가격</span>
              <span>{totalItemsPrice}원</span>
            </S.InformationRight>
            <S.InformationRight>
              <span>배송비</span>
              <span>{deliveryFee}원</span>
            </S.InformationRight>
            <S.InformationRight>
              <span>할인 금액</span>
              <span>-{discountPrice}원</span>
            </S.InformationRight>
            <S.TotalPrice>
              <span>총 결제금액</span>
              <span>{totalPaymentAmount}원</span>
            </S.TotalPrice>
          </S.InformationMain>
        </S.InformationWrapper>
      </S.OrderInformation>
    </Layout>
  );
}

export default OrderComplete;
