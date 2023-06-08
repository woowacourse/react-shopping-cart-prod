import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { checkedItemsAtom, couponIdAtom } from 'recoil/cartList';
import { postPayments } from 'api/requests';
import { useMutate } from 'hooks/useMutate';
import { useCalculatePrice } from '../hooks/useCalculatePrice';
import { formatPrice } from 'utils';
import { ROUTES } from 'constants/index';
import * as S from './PaymentDetail.styles';

const PaymentDetail = () => {
  const couponIds = useRecoilValue(couponIdAtom);
  const checkedItems = useRecoilValue(checkedItemsAtom);
  const { request } = useMutate();
  const navigate = useNavigate();

  const {
    calculateDeliveryPrice,
    calculateOriginalPrice,
    calculateTotalDiscountPrice,
    calculateOrderPrice,
  } = useCalculatePrice();

  const onOrderButtonClick = () => {
    navigate(ROUTES.ORDER_LIST);
    const payload = {
      cartItemIds: checkedItems,
      isDeliveryFree: calculateDeliveryPrice() === 0,
      totalPaymentPrice: calculateOrderPrice(),
      couponIds: couponIds,
    };
    request(postPayments(payload));
  };

  return (
    <S.Container>
      <S.Title>결제 예상 금액</S.Title>
      <S.Wrapper>
        <S.Text>총 상품 가격</S.Text>
        <S.Text>{formatPrice(calculateOriginalPrice())}원</S.Text>
      </S.Wrapper>
      <S.Wrapper>
        <S.Text>총 배송비</S.Text>
        <S.Text>{formatPrice(calculateDeliveryPrice())}원</S.Text>
      </S.Wrapper>
      <S.Wrapper>
        <S.Text>총 할인 금액</S.Text>
        <S.Text>-{formatPrice(calculateTotalDiscountPrice())}원</S.Text>
      </S.Wrapper>
      <S.Wrapper>
        <S.Text>총 주문 금액</S.Text>
        <S.Text>{formatPrice(calculateOrderPrice())}원</S.Text>
      </S.Wrapper>
      <S.OrderButton onClick={onOrderButtonClick}>주문하기</S.OrderButton>
    </S.Container>
  );
};

export default PaymentDetail;
