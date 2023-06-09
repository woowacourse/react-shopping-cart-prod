import { PriceCounter } from '../../components/Payment/PriceCounter';
import { PaymentList } from '../../components/Payment/PaymentList';
import { FatBorder, PageTitle } from '../../style/style';
import * as S from './Payment.style';
import { useRecoilValue } from 'recoil';
import { memberPublicInformation } from '../../recoil/userAtoms';
import { orderState } from '../../recoil/orderAtom';
import { useNavigate } from 'react-router-dom';
import { PAGE_PATH } from '../../constants';

function Payment() {
  const order = useRecoilValue(orderState);
  const consumer = useRecoilValue(memberPublicInformation);
  const navigate = useNavigate();

  return (
    <>
      <PageTitle>주문/결제</PageTitle>
      <FatBorder />
      {order ? (
        <S.PaymentWrapper>
          <S.PaymentInfoWrapper>
            <S.PaymentInfo>
              <S.InfoTitle>주문자</S.InfoTitle>
              <S.InfoContent>
                <S.ContentItem>
                  <S.ItemTitle>이름</S.ItemTitle>
                  <div>{consumer.name}</div>
                </S.ContentItem>
                <S.ContentItem>
                  <S.ItemTitle>이메일</S.ItemTitle>
                  <div>{consumer.email}</div>
                </S.ContentItem>
              </S.InfoContent>
            </S.PaymentInfo>
            <S.PaymentInfo>
              <S.InfoTitle>주문상품</S.InfoTitle>
              <S.InfoContent>
                <PaymentList order={order} />
              </S.InfoContent>
            </S.PaymentInfo>
          </S.PaymentInfoWrapper>
          <S.PurchaseBoxWrapper>
            <S.Sticky>
              <PriceCounter />
            </S.Sticky>
          </S.PurchaseBoxWrapper>
        </S.PaymentWrapper>
      ) : (
        <S.InvalidWrapper>
          유효하지 않은 주문입니다
          <S.CartButton onClick={() => navigate(PAGE_PATH.CART)}>장바구니로 돌아가기</S.CartButton>
        </S.InvalidWrapper>
      )}
    </>
  );
}

export default Payment;
